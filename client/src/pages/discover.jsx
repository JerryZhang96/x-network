import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DISCOVER_TYPES,
  getDiscoverPosts,
} from "../redux/actions/discoverAction";
import LoadingIcon from "../images/loading.gif";
import PostThumb from "../components/PostThumb";
import LoadMoreBtn from "../components/LoadMoreBtn";
import { getDataAPI } from "../utils/fetchData";

const Discover = () => {
  const { auth, discover } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth.token, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoading(true);
    const res = await getDataAPI(
      `posts_discover?num=${discover.page * 9}`,
      auth.token
    );
    dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data });
    setLoading(false);
  };

  return (
    <div>
      {discover.loading ? (
        <img src={LoadingIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <PostThumb posts={discover.posts} result={discover.result} />
      )}

      {loading && (
        <img src={LoadingIcon} alt="loading" className="d-block mx-auto" />
      )}

      {!discover.loading && (
        <LoadMoreBtn
          result={discover.result}
          page={discover.page}
          load={discover.loading}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default Discover;
