import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSuggestions } from "../../redux/actions/suggestionsAction";

import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";

import LoadingIcon from "../../images/loading.gif";

const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="mt-3">
      <UserCard user={auth.user} />

      <div className="d-flex justify-content-between align-items-center my-2">
        <h5 className="text-danger">Suggestions for you</h5>
        {!suggestions.loading && (
          <i
            className="fas fa-redo"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        )}
      </div>

      {suggestions.loading ? (
        <img src={LoadingIcon} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <UserCard key={user._id} user={user}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}

      <div style={{ opacity: 0.5 }} className="my-2">
        <a
          href="https://github.com/JerryZhang96"
          target="_blank"
          rel="noreferrer"
          style={{ wordBreak: "break-all" }}
        >
          https://github.com/JerryZhang96
        </a>
        <small className="d-block">Welcome to our channel Nigma</small>

        <small>&copy; 2022 X-NETWORK FROM NIGMA</small>
      </div>
    </div>
  );
};

export default RightSideBar;
