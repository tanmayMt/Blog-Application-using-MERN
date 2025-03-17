import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditPost.css"; // Create a CSS file for styling

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: "", content: "" });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error("Error fetching post:", error));
    }, [id]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, post);
            toast.success("Post updated successfully!");
            setTimeout(() => navigate("/"), 2000); // Redirect after success
        } catch (error) {
            console.error("Error updating post:", error);
            toast.error("Failed to update post.");
        }
    };

    return (
        <div className="edit-post">
            <ToastContainer position="top-center" autoClose={1500} />
            <h2>Edit Post</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    placeholder="Content"
                    required
                />
                <button type="submit" className="update-btn">Update</button>
            </form>
        </div>
    );
};

export default EditPost;
