import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { POST_TYPES } from "../../redux/actions/postAction";
import { getDataAPI } from "../../utils/fetchData";
import PostCard from "../PostCard";

const Posts = () => {
  const { homePosts, auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    setLoading(true);
    const res = await getDataAPI(
      `posts?limit=${homePosts.page * 9}`,
      auth.token
    );
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });
    setLoading(false);
  };

  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {loading && (
        <img src={LoadingIcon} alt="loading" className="d-block mx-auto" />
      )}

      <LoadMoreBtn
        result={homePosts.result}
        page={homePosts.page}
        load={loading}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
