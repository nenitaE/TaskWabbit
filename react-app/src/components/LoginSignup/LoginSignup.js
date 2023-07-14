import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import "./LoginSignup.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom";



function LoginSignup() {
    const { taskTypeId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    if (sessionUser) return <Redirect to={`/tasks/new/${taskTypeId}`} />;
    console.log(taskTypeId, "tasktypeID ______________")

    return (
        <div className="login-signup-root">
            <div className="login-signup-container">
                <div className="login-signup-inner">
                    <div className="taskwabbit-title">taskWabbit</div>

                    <OpenModalButton
                        className="signup-button"
                        buttonText="Sign up"
                        modalComponent={<SignupFormModal />}
                        onModalClose={<Redirect to={`/tasks/new/${taskTypeId}`} />}
                    />


                    {/* <OpenModalButton
                        className="login-button"
                        buttonText="Log in"
                        modalComponent={<LoginFormModal />}
                        onModalClose={<Redirect to={`/tasks/new/${taskTypeId}`} />}
                    /> */}

                    <NavLink className='login-button' to={`/login/${taskTypeId ?? ''}`}>Log in</NavLink>

                    <div className="agreement-section">
                        By signing up you agree to our Terms of Use and Privacy Policy.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;
