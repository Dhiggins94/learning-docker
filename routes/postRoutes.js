const express = require("express");
const postController = require("../controllers/postController.js");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// localhost:3000/
// create and get post
router
  .route("/")
  .get(protect,postController.getAllPosts)
  .post(protect, postController.createPost);
// update,get one, and delete post
router
  .route("/:id")
  .get(protect,postController.getOnePost)
  .patch(protect,postController.updatePost)
  .delete(protect,postController.deletePost);

module.exports = router;
