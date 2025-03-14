const Post = require("../models/Post");

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ message: "Server error. Unable to fetch posts." });
    }
};

// Get a single post
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        console.error("Error fetching post:", error.message);
        res.status(500).json({ message: "Server error. Unable to fetch post." });
    }
};

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json({
            success:true,
            message:"New Post is Created successfully",
            data:{newPost}
        });
    } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ message: "Server error. Unable to create post." });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({
            success:true,
            message:"Post is Updated successfully",
            data: {post}
        });
    } catch (error) {
        console.error("Error updating post:", error.message);
        res.status(500).json({ message: "Server error. Unable to update post." });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({
            message: "Post deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting post:", error.message);
        res.status(500).json({ message: "Server error. Unable to delete post." });
    }
};
