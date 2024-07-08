const express = require("express");
const { create, getPosts, addLike, addComment, postById, getPostFile, getFilename } = require("../controllers/postController"); // Import postController module that will handle post requests.
const { requireSignin, hasAuthorization } = require("../controllers/authController");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'posts/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});
 
const upload = multer({ storage: storage });

const router = express.Router(); // Create a new router object.

router.param('postId', postById);
router.param('filename', getFilename);

router.get("/api/posts", getPosts); // Handle GET requests to /api/posts using postController.getPosts method.

router.post("/api/posts", upload.single('file'), create); // Handle POST requests to /api/posts using postController.create method.

router.put('/api/posts/like/:postId', addLike);

router.put('/api/posts/comment/:postId', addComment);

router.get('/posts/:filename', getPostFile);

module.exports = router; // Export the router object.