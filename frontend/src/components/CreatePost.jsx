import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchUser } from '../app/user/userSlice'

function CreatePost() {
	const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
	const [newPost, setNewPost] = useState({
		title: "",
		content: "",
		file: null,
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewPost({ ...newPost, [name]: value });
	};

	const handleFileChange = (event) => {
		setNewPost({ ...newPost, file: event.target.files[0] });
	};

	const handlePostSubmit = () => {
        dispatch(fetchUser({userId: user.user._id}))

		const formData = new FormData();
		formData.append("title", newPost.title);
		formData.append("content", newPost.content);
		formData.append("file", newPost.file);
        formData.append("_id", user.user._id);
		axios
			.post("http://localhost:5000/api/posts", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"Authorization": `Bearer ${user.token}`
				},
			})
			.then(() => {
				setNewPost({ title: "", content: "", file: null });
			})
			.catch((error) => console.error("Error creating post:", error));
	};

	return (
		<div className="create-post max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4 text-center">Create a Post</h2>
    <input
        type="text"
        name="title"
        placeholder="Title"
        value={newPost.title}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
    <textarea
        name="content"
        placeholder="Content"
        value={newPost.content}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 border rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
    ></textarea>
    <input
        type="file"
        name="file"
        onChange={handleFileChange}
        className="mb-4"
    />
    <button
        onClick={handlePostSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
    >
        Post
    </button>
</div>

	);
}

export default CreatePost;
