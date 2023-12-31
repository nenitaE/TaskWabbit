import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector, } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const { taskTypeId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      if (taskTypeId) {
        history.push(`/tasks/new/${taskTypeId}`)
      } else {
        history.push('/')
      }
    }
  };
  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setEmail('demo@aa.io');
    setPassword('password');
  };

  return (
    <div className="login-root">
      <div className="login-container">
        <div className="login-inner">
          <div className="taskwabbit-title-login">taskWabbit</div>
          <form onSubmit={handleSubmit}>
            {errors.length != 0 && (
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            )}
            <label className="label-container">
              Email Address
              <input
                className="text-field"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="label-container">
              Password
              <input
                className="text-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button 
              className="demoButton" 
              onClick={handleDemoLogin}>
                  Click here to fill demo user data
            </button>
            <button className="login-button2" type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;