const express = require("express");
const router = express.Router();
const { getPosts, getPost, createPost, updatePost, deletePost,likePost} = require("../controllers/postController");


router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost); // Like route
module.exports = router;