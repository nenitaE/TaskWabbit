import React, { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";

function LoginSignup() {

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

