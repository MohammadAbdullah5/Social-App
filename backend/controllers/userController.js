const User = require("../models/userModel");
const extend = require("lodash/extend");
const { getErrorMessage } = require("../middleware/dbErrorHandler");

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec(); // This line is finding a user by id and populating the following and followers fields with the _id and name fields of the users they are following and who are following them, respectively. The exec method is used to execute the query.
    if (!user)
      return res.status(400).json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};

const read = async (req, res) => {
  try {
    let user = await User.findById(req.profile._id); // Ensure this is awaited if it's asynchronous
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(400).json({ error: "User not found" });
  }
};
const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let userId = req.params.userId

    let deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const getFilename = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await
    User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user.profilePicture);
  }
  catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

const updateProfilePicture = async (req, res) => {
  try {
    const { userId } = req.params;
    const orgPath = req.file.path;
    const profilePicture = orgPath.replace("\\", "/");

    const user = await User.findByIdAndUpdate(
      userId,
    { profilePicture },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const addFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, { $push: { following: req.body.followId}});
    next();
  }

  catch (error) {
    return res.status(400).json({ error });
  }
}

const addFollower = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId }}, 
      { new: true } // Return the updated user object 
      .populate('following', '_id name') // Populate the following field with the _id and name fields of the users they are following for the updated user object
      .populate('followers', '_id name') // Populate the followers field with the _id and name fields of the users who are following them for the updated user object
      .exec()
    );
  result.hashed_password = undefined;
  result.salt = undefined;
  res.json(result);
  }

  catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
}

const removeFollowing = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.body.userId, { $pull: { following: req.body.unfollowId}});
    next();
  }

  catch (error) {
    return res.status(400).json({ error });
  }
}

const removeFollower = async (req, res) => {
  try {
    let result = await User.findByIdAndUpdate(req.body.unfollowId, { $pull: { followers: req.body.userId }}, 
      { new: true } // Return the updated user object 
      .populate('following', '_id name') // Populate the following field with the _id and name fields of the users they are following for the updated user object
      .populate('followers', '_id name') // Populate the followers field with the _id and name fields of the users who are following them for the updated user object
      .exec()
    );
  result.hashed_password = undefined;
  result.salt = undefined;
  res.json(result);
  }

  catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
}

module.exports = { create, userByID, read, list, remove, update, updateProfilePicture, getFilename, 
  addFollowing, addFollower, removeFollowing, removeFollower
 };
