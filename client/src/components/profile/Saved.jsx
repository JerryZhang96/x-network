import React, { useState, useEffect } from "react";
import PostThumb from "../PostThumb";
import LoadingIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Saved = ({ auth, dispatch }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDataAPI("saved_posts", auth.token)
      .then((res) => {
        setSavedPosts(res.data.savedPosts);
        setResult(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      });

    return () => setSavedPosts([]);
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoading(true);
    const res = await getDataAPI(`saved_posts?limit=${page * 9}`, auth.token);
    setSavedPosts(res.data.savedPosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoading(false);
  };

  return (
    <div>
      <PostThumb posts={savedPosts} result={result} />

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

export default Saved;
