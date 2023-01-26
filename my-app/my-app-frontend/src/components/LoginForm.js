import React, { useState } from "react";



function LoginForm({ handleLogin }) {
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    });




    const handleUserInfoChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserInfo({ ...userInfo, [name]: value });
    };

    const onLoginSubmit = (e) => {
        e.preventDefault();

        let user = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        fetch("http://localhost:9292/login", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(user => {
            if (user) {
                handleLogin(user)
            }
            else {
                alert("Incorrect login credentials or need to sign up for an account")
            }
        })


    };

    return (
        <div className="container">
            <h3>Log In</h3>
            <form onSubmit={onLoginSubmit}>

                <div className="form-group">
                    <label>Username: </label>
                    <input
                        name="username"
                        value={userInfo.username}
                        type="text"
                        placeholder="Enter username"
                        onChange={handleUserInfoChange}
                    />
                </div>

                <div className="form-group">
                    <label>Password: </label>
                    <input
                        name="password"
                        value={userInfo.password}
                        type="password"
                        placeholder="Enter password"
                        onChange={handleUserInfoChange}
                    />
                </div>

                <input type="submit" value="Log In" />
            </form>
        </div>

    );
};

export default LoginForm