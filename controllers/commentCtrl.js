const Comments = require("../models/commentModel");
const Posts = require("../models/postModel");

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { postId, content, tag, reply, postUserId } = req.body;

      const post = await Posts.findById(postId);

      if (!post)
        return res.status(404).json({ msg: "This post does not exist." });

      if (reply) {
        const comment = await Comments.findById(reply);

        if (!comment)
          return res.status(404).json({ msg: "This comment does not exist." });
      }

      const newComment = new Comments({
        user: req.user._id,
        content,
        tag,
        reply,
        postId,
        postUserId,
      });

      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );

      await newComment.save();

      return res.status(201).json({ msg: "Comment Created!", newComment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body;

      await Comments.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        {
          content,
        }
      );

      return res.status(200).json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likeComment: async (req, res) => {
    try {
      const comment = await Comments.find({
        _id: req.params.id,
        likes: req.user._id,
      });

      if (comment.length > 0)
        return res.status(400).json({ msg: "You already liked this comment!" });

      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      return res.status(200).json({ msg: "Liked Comment!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unlikeComment: async (req, res) => {
    try {
      await Comments.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      return res.status(200).json({ msg: "Unliked Comment!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await Comments.findOneAndDelete({
        _id: req.params.id,
        $or: [{ user: req.user._id }, { postUserId: req.user._id }],
      });

      await Posts.findOneAndUpdate(
        { _id: comment.postId },
        {
          $pull: { comments: req.params.id },
        }
      );
      return res.status(200).json({ msg: "Comment Deleted!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = commentCtrl;
