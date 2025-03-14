import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:9000/api/posts/${id}`)
        // axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error("Error fetching post:", error));
    }, [id]);

    return post ? (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    ) : <p>Loading...</p>;
};

export default PostDetail;