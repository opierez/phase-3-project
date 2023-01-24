import React, { useState } from "react";

function LoginForm() {
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    });

    const handleUserInfoChange = (e) => {
        // let name = e.target.name;
        // let value = e.target.value;

        // setUserInfo({...userInfo, [name]: value});
    };

    const onLoginSubmit = (e) => {
        

    };

    return (
        <form onSubmit={onLoginSubmit}>
            <label>Username: </label>
            <input 
              name="login-username" 
              value={userInfo.username} 
              type="text" 
              placeholder="Enter username" 
              onChange={handleUserInfoChange} 
            />

            <label>Password: </label>
            <input 
              name="login-password" 
              value={userInfo.password} 
              type="password"
              placeholder="Enter password"
              onChange={handleUserInfoChange} 
            />

            <input type="submit" value="Log In" />
        </form>
    );
};

export default LoginForm