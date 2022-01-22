import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const Register = (props) => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "male",
  };

  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, confirm_password } = userData;

  const [typePassword, setTypePassword] = useState(false);
  const [typeConfirmPassword, setTypeConfirmPassword] = useState(false);

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">X-Network</h3>
        <div className="form-group">
          <label htmlFor="fullname">Full name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
            name="fullname"
            value={fullname}
            style={{ backgroundColor: `${alert.fullname ? "#ffdddd" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.fullname ? alert.fullname : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
            name="username"
            value={username.toLowerCase().replace(/ /g, "")}
            style={{ backgroundColor: `${alert.username ? "#ffdddd" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.username ? alert.username : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={handleChangeInput}
            name="email"
            value={email}
            style={{ backgroundColor: `${alert.email ? "#ffdddd" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.email ? alert.email : ""}
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
              style={{ backgroundColor: `${alert.password ? "#ffdddd" : ""}` }}
            />
            <small onClick={() => setTypePassword(!typePassword)}>
              {typePassword ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.password ? alert.password : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <div className="password">
            <input
              type={typeConfirmPassword ? "text" : "password"}
              className="form-control"
              onChange={handleChangeInput}
              name="confirm_password"
              value={confirm_password}
              style={{
                backgroundColor: `${alert.confirm_password ? "#ffdddd" : ""}`,
              }}
            />
            <small onClick={() => setTypeConfirmPassword(!typeConfirmPassword)}>
              {typeConfirmPassword ? "Hide" : "Show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.confirm_password ? alert.confirm_password : ""}
          </small>
        </div>

        <div className="row justify-content-between mx-0 mb-1">
          <label htmlFor="male">
            Male:
            <input
              type="radio"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="male">
            Female:
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="other">
            Other:
            <input
              type="radio"
              name="gender"
              value="other"
              onChange={handleChangeInput}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Register
        </button>

        <p className="my-2">
          Already have an account?&nbsp;
          <Link to="/login" style={{ color: "crimson" }}>
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
