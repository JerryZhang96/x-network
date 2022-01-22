import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../redux/actions/postAction";
import LoadingIcon from "../../images/loading.gif";
import PostCard from "../../components/PostCard";

const Post = () => {
  const [post, setPost] = useState([]);

  const { auth, detailPost } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }));
    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id);
      setPost(newArr);
    }
  }, [detailPost, dispatch, id, auth]);

  return (
    <div className="posts">
      {post.length === 0 && (
        <img src={LoadingIcon} alt="loading" className="d-block mx-auto my-4" />
      )}

      {post.map((item) => (
        <PostCard key={item._id} post={item} />
      ))}
    </div>
  );
};

export default Post;
