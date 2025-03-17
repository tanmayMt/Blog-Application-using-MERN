import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PostList.css"; // Import the CSS file
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/posts`)
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching posts:", error));
    };

    // Function to delete a post
    const deletePost = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${id}`);
            setPosts(posts.filter(post => post._id !== id));
            toast.success("Post deleted successfully!", {
                position: "top-right",
                style: { backgroundColor: "red", color: "#FFD700", fontWeight: "bold" },
            });
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Failed to delete post.");
        }
    };

    // Function to like a post
    const likePost = async (id) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/posts/${id}/like`);
            setPosts(posts.map(post => 
                post._id === id ? { ...post, likes: response.data.data.likes } : post
            ));
            toast.success("Post liked!", { 
                position: "top-right",
                style: { backgroundColor: "yellow", color: "#1a1a72", fontWeight: "bold" }
            });
        } catch (error) {
            console.error("Error liking post:", error);
            toast.error("Failed to like post.");
        }
    };

    return (
        <div className="post-list">
            <h1 style={{ 
                color: "green",  
                padding: "10px 20px", 
                textAlign: "center", 
                fontSize: "2rem", 
            }}>📜 Blog Posts</h1>
            <ToastContainer position="top-center" autoClose={800} /> {/* Toast container */}
            
            {posts.map(post => (
                <div className="post-card" key={post._id}>
                    <Link to={`/post/${post._id}`} className="post-title"><b>{post.title}</b></Link>
                    <Link to={`/post/${post._id}`} className="post-content"><p>{post.content}</p></Link>
                    
                    <div className="post-actions">
                        <Link to={`/edit/${post._id}`} className="edit-btn">Edit Post✏️</Link>
                        {/* <button className="delete-btn" onClick={() => deletePost(post._id)}>Delete</button> */}
                        <button className="like-btn" onClick={() => likePost(post._id)}>👍 {post.likes}</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
