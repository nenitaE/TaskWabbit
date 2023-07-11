import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function LoginSignup() {
    const sessionUser = useSelector((state) => state.session.user);
    if (sessionUser) return <Redirect to="/" />;

    return (
        <>
            <OpenModalButton
                buttonText="Signup"
                modalComponent={<SignupFormModal/>}
            />
            <OpenModalButton
                buttonText="Login"
                modalComponent={<LoginFormModal/>}
            />
        </>
    )
}

export default LoginSignup;
