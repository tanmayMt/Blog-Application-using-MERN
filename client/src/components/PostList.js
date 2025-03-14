import { useEffect, useState } from "react";
import axios from "axios";

import "./PostList.css"; // Import the CSS file

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/api/posts")
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching posts:", error));
    }, []);

    return (
        <div className="post-list">
            <h2>Blog Posts</h2>
            {posts.map(post => (
                <div className="post-card" key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;