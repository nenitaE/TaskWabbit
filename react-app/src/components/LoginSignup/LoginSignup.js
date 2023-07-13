import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";




function LoginSignup() {
    const { taskTypeId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    if (sessionUser) return <Redirect to={`/tasks/new/${taskTypeId}`} />;

    return (
        <div className="Login_Signup_container">
            <div>taskwabbit</div>
            <div>
                <OpenModalButton
                    buttonText="Signup"
                    modalComponent={<SignupFormModal />}
                    onModalClose={<Redirect to={`/tasks/new/${taskTypeId}`} />}
                />
            </div>
            <div>
                <OpenModalButton
                    buttonText="Login"
                    modalComponent={<LoginFormModal />}
                    onModalClose={<Redirect to={`/tasks/new/${taskTypeId}`} />}
                />
            </div>
            <div>
                By signing up you agree to our Terms of Use and Privacy Policy.
            </div>

        </div>
    )
}

export default LoginSignup;
