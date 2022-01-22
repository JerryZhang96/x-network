const router = require("express").Router();
const postCtrl = require("../controllers/postCtrl");
const auth = require("../middleware/auth");

router.post("/posts", auth, postCtrl.createPost);

router.get("/post/:id", auth, postCtrl.getPost);

router.get("/posts", auth, postCtrl.getPosts);

router.get("/posts_discover", auth, postCtrl.getPostsDiscover);

router.get("/user_posts/:id", auth, postCtrl.getUserPosts);

router.get("/saved_posts", auth, postCtrl.getSavedPosts);

router.patch("/post/:id", auth, postCtrl.updatePost);

router.patch("/post/:id/like", auth, postCtrl.likePost);

router.patch("/post/:id/unlike", auth, postCtrl.unlikePost);

router.delete("/post/:id", auth, postCtrl.deletePost);

router.patch("/post/:id/save", auth, postCtrl.savePost);

router.patch("/post/:id/unsave", auth, postCtrl.unsavePost);

module.exports = router;
