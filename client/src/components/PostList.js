import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PostList.css"; // Import the CSS file

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

    const deletePost = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${id}`);
            setPosts(posts.filter(post => post._id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
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
            {posts.map(post => (
                <div className="post-card" key={post._id}>
                    <Link to={`/post/${post._id}`} className="post-title"><b>{post.title}</b></Link>
                    <p>{post.content}</p>
                    <div className="post-actions">
                        <Link to={`/post/${post._id}`} className="view-btn">View</Link>
                        <button className="delete-btn" onClick={() => deletePost(post._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
