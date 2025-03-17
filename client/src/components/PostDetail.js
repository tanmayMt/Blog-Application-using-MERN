import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./PostDetail.css"; // Import the CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState(""); // State for new comment input
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch post details
        axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error("Error fetching post:", error));

        // Fetch comments for the post
        axios.get(`${process.env.REACT_APP_API_URL}/api/comments/${id}`)
            .then(response => setComments(response.data))
            .catch(error => console.error("Error fetching comments:", error));
    }, [id]);

    // Function to add a comment
    const handleAddComment = async (e) => {
        e.preventDefault(); // Prevent form reload
        if (!newComment.trim()) return; // Prevent empty comments

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/comments/post/${id}/comment`,
                { text: newComment },
                { headers: { "Content-Type": "application/json" } }
            );
            setComments([...comments, response.data]); // Update comments state
            setNewComment(""); // Clear input field
            toast.success("Comment added successfully!", {
                style: { backgroundColor: "yellowgreen", color: "black",fontWeight: "bold"}
            }); // 🎉 Success toast
        } catch (error) {
            console.error("Error adding comment:", error);
            toast.error("Failed to add comment."); // ❌ Error toast
        }
    };

    // Function to delete a comment
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/${commentId}`);
            setComments(comments.filter(comment => comment._id !== commentId)); // Update state
            toast.success("Comment deleted successfully!", {
                style: { backgroundColor: "red", color: "#FFD700",fontWeight: "bold" },
            }); // 🎉 Success toast
        } catch (error) {
            console.error("Error deleting comment:", error);
            toast.error("Failed to delete comment."); // ❌ Error toast
        }
    };
    // Function to like a post
    const handleLikePost = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/posts/${id}/like`);
            setPost(prevPost => ({ ...prevPost, likes: response.data.data.likes }));
            toast.success("Post liked!", { 
            position: "top-right", // Required for toast to render
            style: { 
                backgroundColor: "yellow", color: "#1a1a72",    
                fontWeight: "bold",

            } 
        });
        } catch (error) {
            console.error("Error liking post:", error);
            toast.error("Failed to like post.");
        }
    };
    // Function to delete a post
    const deletePost = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${id}`);
            setPosts(posts.filter(post => post._id !== id));
            toast.success("Post deleted successfully!", {
                position: "top-right",
                style: { backgroundColor: "red", color: "#FFD700", fontWeight: "bold"},
            });
            // Redirect to Home after a short delay
            setTimeout(() => {
                navigate("/");  // Navigate to home
                }, 800); // Delay for 1 second to show the toast
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Failed to delete post.");
        }
    };

    return post ? (
        <div className="post-detail">
            <ToastContainer position="bottom-center" autoClose={1500} /> {/* Toast container */}
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="deletebtn-section">
                <button className="delete-btn" onClick={() => deletePost(post._id)}><b>Delete Post  🗑</b></button>
                <Link to={`/edit/${post._id}`} className="edit-btn">Edit Post✏️</Link>
            </div>
            
            <div className="like-section">
                {/* Like Button */}
                <button className="like-btn" onClick={handleLikePost}>👍 {post.likes}</button>
            </div>
            {/* Comments Section */}
            <div className="comments-section">
                <h3>Comments💬👇</h3>

                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="add-comment-form">
                    💬<input 
                        type="text" 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        placeholder="Write a comment..." 
                        required 
                    />
                    <button type="submit">➕ Add Comment</button>
                </form>

                {/* Display Comments */}
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment._id} className="comment">
                            <p>{comment.text}</p>
                            <button onClick={() => handleDeleteComment(comment._id)}>🗑 Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    ) : <p>Loading...</p>;
};

export default PostDetail;
