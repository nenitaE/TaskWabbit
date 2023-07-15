import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [location, setLocation] = useState("");
	const [isTasker, setIsTasker] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password, 
          firstName, lastName, phone, location, isTasker));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <div className="signup-root">
        <div className="signup-container">
            <div className="signup-inner">
                <div className="signup-taskwabbit-title">taskWabbit</div>
                    <form className="signupForm" onSubmit={handleSubmit}>
                      <span className="row-signup"> 
                          <label>
                            <input
                              type="text"
                              placeholder="First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                            />
                          </label>
                          <label>
                            <input
                              type="text"
                              placeholder="Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                            />
                          </label>
                      </span> 
                        <label>
                          <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </label>
                        <label>
                          <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </label>
                        <label>
                          <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                          />
                        </label>
                        <label>
                          <input
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            maxLength={10}
                            minLength={10}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </label>
                        <span className="row-signup">
                            <label className="column-signup">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    />
                            </label>
                            <label className="column-signup">
                                <input
                                  type="password"
                                  placeholder="Confirm Password"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  required
                                />
                            </label>
                        </span>
                            <span className="signup-isTasker">
                              <input
                                className="signup-isTaskerBox"
                                type="checkbox"
                                value={true}
                                onChange={(e) => setIsTasker(e.target.value)}
                              /> <span className="signupBox-text"> Sign me up as a Tasker</span>
                            </span>
                        {errors.length != 0 && (
                          <ul>
                            {errors.map((error, idx) => (
                              <li className="signup-errors" key={idx}>
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                {error}</li>
                            ))}
                          </ul>
                        )}
                        <p className="signup-agreement-text">By clicking below and creating an account, I agree to TaskWabbit’s <span className="signup-greenText">Terms of Service</span> and <span className="signup-greenText">Privacy Policy</span>.</p>
                        <button className="signup-bttn2" type="submit">Create Account</button>
                      </form>
                    </div>
                </div>
            </div>
  );
}

export default SignupFormPage;