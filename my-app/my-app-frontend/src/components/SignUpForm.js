import React, { useState } from "react";

function SignUpForm() {
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        password_confirm: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        city: "",
        country: "",
        postal_code: "",
        occupation: "",
        interests: []
    });

    const handleUserInfoChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserInfo({...userInfo, [name]: value});
    };

    const getMinDateOfBirth = () => {
        let currentDate = new Date();

        let year = currentDate.getFullYear() - 18;

        let month = currentDate.getMonth() + 1;
        month = month.toString().padStart(2, '0');

        let day = currentDate.getDate();
        day = day.toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

   

    console.log(getMinDateOfBirth());

    return (
        <form name="sign-up">
            <label>Username: </label>
            <input
              name="username"
              value={userInfo.username}
              type="text"
              placeholder="Enter username"
              onChange={handleUserInfoChange}
            />
            
            <label>Password: </label>
            <input
              name="password"
              value={userInfo.password}
              type="password"
              placeholder="Enter password"
              onChange={handleUserInfoChange}
            />
            
            <label>Confirm Password: </label>
            <input
              name="password-confirm"
              value={userInfo.password_confirm}
              type="password"
              placeholder="Confirm password"
              onChange={handleUserInfoChange}
            />
            
            <label>First Name: </label>
            <input
              name="first_name"
              value={userInfo.first_name}
              type="text"
              placeholder="Enter first name"
              onChange={handleUserInfoChange}
            />
            
            <label>Last name: </label>
            <input
              name="last_name"
              value={userInfo.last_name}
              type="text"
              placeholder="Enter last name"
              onChange={handleUserInfoChange}
            />
            
            <label>Date of Birth: </label>
            <input
              name="date_of_birth"
              value={userInfo.date_of_birth}
              type="date"
              max={getMinDateOfBirth()}
              onChange={handleUserInfoChange}
            />
            
            <label>City: </label>
            <input
              name="city"
              value={userInfo.city}
              type="text"
              placeholder="Enter city"
              onChange={handleUserInfoChange}
            />
            
            <label>Zip code: </label>
            <input
              name="last_name"
              value={userInfo.postal_code}
              type="text"
              placeholder="Enter zip code"
              onChange={handleUserInfoChange}
            />

            <select name="occupation">
                
            </select>

        </form>
    )
};

export default SignUpForm