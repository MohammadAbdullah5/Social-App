import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../app/user/userSlice";
import axios from "axios";

function NewFeed() {
  const [commentInput, setCommentInput] = useState("");
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser({ userId: user?.user?._id }));
  }, [dispatch, user?.user?._id]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleLike = (postId) => {
    axios
      .put(`http://localhost:5000/api/posts/like/${postId}`)
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("Error liking post:", error));
  };

  const handleAddComment = (postId, commentText) => {
    axios
      .put(`http://localhost:5000/api/posts/comment/${postId}`, {
        text: commentText,
        commentedBy: user.user._id,
      })
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  return (
    <div className="home p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
      {posts.map((post) => (
        <div
          key={post._id}
          className="post mb-6 bg-white rounded-lg shadow-lg p-4 border border-gray-200"
        >
          <div
            className="flex items-center p-2 bg-white rounded-lg shadow-md border border-gray-200 mb-2"
            id="post-header-container"
          >
            <img
              src={post.postedBy.profilePicture}
              className="h-8 w-8 rounded-full object-cover mr-3"
              id="post-img"
            />
            <h1 className="text-lg font-semibold">{post.postedBy.username}</h1>
          </div>
          <h3 className="text-xl font-medium mb-2">{post.title}</h3>
          <p className="mb-4 text-gray-700">{post.content}</p>
          {post.file && (
            <div className="mb-4">
              {post.file.includes(".mp4") ? (
                <video
                  width="320"
                  height="240"
                  controls
                  className="rounded-lg border border-gray-200"
                >
                  <source src={`/posts/${post.file}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={`/posts/${post.file}`}
                  alt="Post Media"
                  className="w-full rounded-lg border border-gray-200"
                />
              )}
            </div>
          )}
          <p className="mb-2 text-gray-600">Likes: {post.likes}</p>
          <button
            onClick={() => handleLike(post._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
          >
            Like
          </button>
          <p className="mb-2 text-gray-600">Comments: {post.comments.length}</p>
          <ul className="mb-4 space-y-2">
            {post.comments.map((comment, index) => (
              <li
                key={index}
                className="flex items-start space-x-3 p-2 bg-gray-100 rounded-lg shadow"
              >
                <img
                  src={`/${comment.postedBy.profilePicture}`}
                  alt={`${comment.postedBy.username}'s profile`}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <span className="font-semibold text-gray-800">
                    {comment.postedBy.username}:
                  </span>{" "}
                  <span className="text-gray-700">{comment.text}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center">
            <input
              type="text"
              placeholder="Add a comment"
              className="comment-input flex-grow p-2 border border-gray-300 rounded-l-lg mb-2"
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              onClick={() => handleAddComment(post._id, commentInput)}
              className="comment-button bg-green-500 text-white px-4 py-2 rounded-r-lg mb-2"
            >
              Add Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewFeed;
