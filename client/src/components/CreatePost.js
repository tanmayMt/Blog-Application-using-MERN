import { useState } from "react";
import axios from "axios";
import "./CreatePost.css"; // Import the CSS file

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(
            // "http://localhost:9000/api/posts",
            `${process.env.REACT_APP_API_URL}/api/posts`,
            { title, content },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        setTitle("");
        setContent("");
    };

    return (
        <form 
            className="create-post-form"
            onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;