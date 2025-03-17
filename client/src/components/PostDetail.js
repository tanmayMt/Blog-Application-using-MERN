// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./PostDetail.css"; // Import the CSS file

// const PostDetail = () => {
//     const { id } = useParams();
//     const [post, setPost] = useState(null);

//     useEffect(() => {
//         axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${id}`)
//             .then(response => setPost(response.data))
//             .catch(error => console.error("Error fetching post:", error));
//     }, [id]);

//     return post ? (
//         <div className="post-detail">
//             <h2>{post.title}</h2>
//             <p>{post.content}</p>
//         </div>
//     ) : <p>Loading...</p>;
// };

// export default PostDetail;



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css"; // Import the CSS file

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

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

    // Function to delete a comment
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/${commentId}`);
            setComments(comments.filter(comment => comment._id !== commentId)); // Update state
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return post ? (
        <div className="post-detail">
            <h2>{post.title}</h2>
            <p>{post.content}</p>

            {/* Comments Section */}
            <div className="comments-section">
                <h3>Comments</h3>
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
