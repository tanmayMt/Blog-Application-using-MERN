const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 }, // New field for likes
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post",PostSchema);