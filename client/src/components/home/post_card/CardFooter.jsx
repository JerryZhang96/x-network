import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  unlikePost,
  savePost,
  unsavePost,
} from "../../../redux/actions/postAction";

import Send from "../../../images/send.svg";
import LikeBtn from "../../LikeBtn";
import ShareModal from "../../ShareModal";
import { BASE_URL } from "../../../utils/config";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const [saved, setSaved] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const { auth, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleLike = async () => {
    if (loadingLike) return;
    setLoadingLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadingLike(false);
  };

  const handleUnlike = async () => {
    if (loadingLike) return;
    setLoadingLike(true);
    await dispatch(unlikePost({ post, auth, socket }));
    setLoadingLike(false);
  };

  const handleSavePost = async () => {
    if (loadingSaved) return;
    setLoadingSaved(true);
    await dispatch(savePost({ post, auth }));
    setLoadingSaved(false);
  };

  const handleUnsavePost = async () => {
    if (loadingSaved) return;
    setLoadingSaved(true);
    await dispatch(unsavePost({ post, auth }));
    setLoadingSaved(false);
  };
  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeBtn
            isLike={isLike}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
          />

          <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment" />
          </Link>

          <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)} />
        </div>
        {saved ? (
          <i className="fas fa-bookmark text-info" onClick={handleUnsavePost} />
        ) : (
          <i className="far fa-bookmark" onClick={handleSavePost} />
        )}
      </div>

      <div className="d-flex justify-content-between">
        <h6 style={{ padding: "0 34px", cursor: "pointer" }}>
          {post.likes.length} likes
        </h6>
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.comments.length} comments
        </h6>
      </div>

      {isShare && (
        <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
      )}
    </div>
  );
};

export default CardFooter;
