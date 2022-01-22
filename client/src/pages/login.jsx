import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/authAction";

const Login = (props) => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePassword, setTypePassword] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">X-Network</h3>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            name="email"
            value={email}
          />
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className="password">
            <input
              type={typePassword ? "text" : "password"}
              className="form-control"
              onChange={handleChangeInput}
              name="password"
              value={password}
            />
            <small onClick={() => setTypePassword(!typePassword)}>
              {typePassword ? "Hide" : "Show"}
            </small>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>

        <p className="my-2">
          Don't have an account?&nbsp;
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
