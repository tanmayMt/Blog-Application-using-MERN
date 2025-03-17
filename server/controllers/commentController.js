const Comment = require("../models/Comment");

// Get comments for a post
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error.message);
        res.status(500).json({ message: "Server error. Unable to fetch comments." });
    }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;  // Get text from the request body
        const { postId } = req.params; // Get postId from URL parameters

        if (!postId || !text) {
            return res.status(400).json({ message: "Post ID and text are required" });
        }

        const newComment = new Comment({ postId, text });
        await newComment.save();
        
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error adding comment:", error.message);
        res.status(500).json({ message: "Server error. Unable to add comment." });
    }
};


// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error.message);
        res.status(500).json({ message: "Server error. Unable to delete comment." });
    }
};
