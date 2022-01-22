import React from "react";
import { useSelector } from "react-redux";

import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import RightSideBar from "../components/home/RightSidebar";

import LoadingIcon from "../images/loading.gif";

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />
        {homePosts.loading ? (
          <img className="d-block mx-auto" src={LoadingIcon} alt="loading" />
        ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
          <h2 className="text-center">No Post</h2>
        ) : (
          <Posts />
        )}
      </div>

      <div className="col-md-4">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
