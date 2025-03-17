import { useState } from "react";
import axios from "axios";
import "./CreatePost.css"; // Import the CSS file
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/posts`,
                { title, content },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                    className: "custom-toast", // Apply custom CSS
                }
            );
            setTitle("");
            setContent("");
            toast.success("Post is added successfully!", {
                style: { backgroundColor: "yellowgreen", color: "black",fontWeight: "bold"},
                onClose: () => navigate("/"), // Redirect to home after toast closes
            });

            // Alternatively, redirect after a short delay
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Failed to create post.");
        }
    };

    return (
      <div>
        <ToastContainer
          position="top-center"
          autoClose={470} 
          hideProgressBar={false} 
          closeOnClick 
          draggable 
          pauseOnHover
        /> {/* Toast container */}
        <form 
            className="create-post-form"
            onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
            <button type="submit">Create Post</button>
        </form>
      </div>
    );
};

export default CreatePost;