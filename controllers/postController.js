const Post = require("../models/postModel.js")

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: 'succes',
      // however many post we retreive we return that as well as "results"
      results: posts.length,
      data: { posts, }
    })
   
  } catch (e) {
    res.status(404).json({
      status: 'fail',
    });
  }
};
// localhost:3000/posts/:id
exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: 'succes',
      
      data: { post,}
    })
   
  } catch (e) {
    res.status(404).json({
      status: 'fail',
    });
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({
      status: 'succes',
      
      data: { post,}
    })
   
  } catch (e) {
    res.status(404).json({
      status: 'fail',
    });
  }
}

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      // optional runvalidators ensure even on uodate it will check the models to make sure a title and a body are present
      // optional: return new created posts
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'succes',
      
      data: { post,}
    })
   
  } catch (e) {
    res.status(404).json({
      status: 'fail',
    });
  }
}

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'succes',
      
    })
   
  } catch (e) {
    res.status(404).json({
      status: 'fail',
    });
  }
}