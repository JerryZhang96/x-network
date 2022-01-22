import React, { useState, useEffect } from "react";
import LoadingIcon from "../../images/loading.gif";
import PostThumb from "../PostThumb";
import LoadMoreBtn from "../LoadMoreBtn";
import { PROFILE_TYPES } from "../../redux/actions/profileAction";
import { getDataAPI } from "../../utils/fetchData";

const Posts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [profile.posts, id]);

  const handleLoadMore = async () => {
    setLoading(true);
    const res = await getDataAPI(
      `user_posts/${id}?limit=${page * 9}`,
      auth.token
    );
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
    setLoading(false);
  };

  return (
    <div>
      <PostThumb posts={posts} result={result} />
      {loading && (
        <img src={LoadingIcon} alt="loading" className="d-block mx-auto" />
      )}
      <LoadMoreBtn
        result={result}
        page={page}
        load={loading}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
