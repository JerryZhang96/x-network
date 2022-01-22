import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const { auth, profile, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }

    return () => setFollowed(false);
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    if (loading) return;
    setFollowed(true);
    setLoading(true);
    await dispatch(follow({ users: profile.users, user, auth, socket }));
    setLoading(false);
  };

  const handleUnfollow = async () => {
    if (loading) return;

    setFollowed(false);
    setLoading(true);
    await dispatch(unfollow({ users: profile.users, user, auth, socket }));
    setLoading(false);
  };

  return (
    <>
      {followed ? (
        <button className="btn btn-outline-danger" onClick={handleUnfollow}>
          Unfollow
        </button>
      ) : (
        <button className="btn btn-outline-info" onClick={handleFollow}>
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
