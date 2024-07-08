
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	title: String,
	content: String,
    file: String,
	likes: { type: Number, default: 0 },
	likedBy: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
	comments: [{ text: String, created: { type: Date, default: Date.now }, 
				postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}}],
	postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
	createdOn: { type: Date, default: Date.now }

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
