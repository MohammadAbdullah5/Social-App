const Post = require("../models/postModel");
const { getErrorMessage } = require("../middleware/dbErrorHandler");

const create = async (req, res) => {
  try {
    const { title, content } = req.body;
    const file = req.file ? req.file.filename : undefined;
    const userId = req.body._id;

    if (!title || !content) {
      return res
        .status(400)
        .json({ error: "Title and content are required fields" });
    }

    const post = new Post({ title, content, file, postedBy: userId});
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        .populate('comments.postedBy', 'username profilePicture').populate('postedBy', 'username profilePicture').exec();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addLike = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
 
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
 
        post.likes += 1;
        await post.save();
 
        res.json(post);
    }

    catch (err) {
        console.error('Error liking post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getPostFile = async (req, res) => {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '..', 'posts', filename);
        
        res.sendFile(filePath, { headers: { "Cache-Control": 'no-store' }}, (err) => {
            if (err) {
                res.status(404).send('File not found');
            }
        });
    }

const addComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentedBy = req.body.commentedBy;
        const post = await Post.findById(postId);
 
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
 
        post.comments.push({ text: req.body.text, postedBy: commentedBy});
        await post.save();
 
        res.json(post);
    }

    catch (err) {
        console.error('Error commenting on post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const postById = async (req, res, next, id) => {
    try {
        const post = await Post.findById(id);
 
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
 
        req.post = post;
        next();
    }

    catch (err) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getFilename = async (req, res) => {
    try {
        const post = req.post;
        const filename = post.file;
 
        if (!filename) {
            return res.status(404).json({ error: 'File not found' });
        }
 
        res.json({ filename });
    }

    catch (err) {
        console.error('Error fetching post file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { create, getPosts, addLike, addComment, postById, getPostFile, getFilename };