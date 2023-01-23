import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Login() {
    const [isSelected, setIsSelected] = useState(false)
    return (
        <div>
            <LoginForm />
            <SignUpForm />
            {/* <button>Sign Up</button> */}
            {/* { isSelected ? <SignUpForm /> : null } */}
        </div>
    )
};

export default Login;