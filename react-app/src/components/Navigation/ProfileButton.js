import React, { useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { NavLink, Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'
import { getReviewForLoggedIn } from "../../store/reviews";
import ReviewByLoggedIn from "../CurrentReview";

function ProfileButton({ user }) {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const userLoggedIn = useSelector(state => state.session.user)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
    <div className="profileButtonContainer">
      <button id="navProfileBTTN" onClick={openMenu}>

        <i className="fas fa-user-circle fa-lg" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="welcome-profile">Welcome {user.username}.</li>
            {/* <li>{user.email}</li> */}
            <li className="link-home">
              <NavLink className='text-link' to="/tasks/current">My Tasks</NavLink>
            </li>
            {sessionUser?.isTasker && (
              <li className="link-home">
                <NavLink className='text-link' to="/taskerTaskTypes/current">Tasker Profile</NavLink>
              </li>
            )}
            <li className="link-home">
              <NavLink className='text-link' to="/reviews/currentUser"
              >My Reviews</NavLink>
            </li>
            <li className="link-home">
              <button className="logoutBTTN-profile" onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <Link to={`/login`}>
              <button className='logoutBTTN-profile'>Log in</button>
            </Link>
            <Link to={`/signup`}>
              <button className='logoutBTTN-profile'>Sign Up</button>
            </Link>


          </>
        )}
      </ul>
      </div>
    </>
  );
}

export default ProfileButton;
