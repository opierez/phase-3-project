import React, { useEffect, useState } from "react";

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

    const [occupations, setOccupations] = useState([]);
    const [interests, setInterests] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:9292/occupations`)
          .then(resp => resp.json())
          .then(occupations => setOccupations(occupations.map(occupation => occupation.job_title)))
    }, [])

    useEffect(() => {
      fetch(`http://localhost:9292/interests`)
      .then(resp => resp.json())
      .then(interests => setInterests(interests.map(interest => interest.interest)))
    }, [])

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

    const handleSignUpSubmit = (e) => {
      e.preventDefault();

      console.log(e.target.username);
    }

    return (
      <div className="container">
        <h3>Sign Up</h3>
        <form name="sign-up" onSubmit={handleSignUpSubmit}>
          <div>
            <label>Username: </label>
            <input
              name="username"
              value={userInfo.username}
              type="text"
              placeholder="Enter username"
              onChange={handleUserInfoChange}
            />
            </div>
            
            <div>
            <label>Password: </label>
            <input
              name="password"
              value={userInfo.password}
              type="password"
              placeholder="Enter password"
              onChange={handleUserInfoChange}
            />
            </div>
            
            <div>
            <label>Confirm Password: </label>
            <input
              name="password_confirm"
              value={userInfo.password_confirm}
              type="password"
              placeholder="Confirm password"
              onChange={handleUserInfoChange}
            />
            </div>
            
            <div>
            <label>First Name: </label>
            <input
              name="first_name"
              value={userInfo.first_name}
              type="text"
              placeholder="Enter first name"
              onChange={handleUserInfoChange}
            />
            </div>

            <div>
            <label>Last name: </label>
            <input
              name="last_name"
              value={userInfo.last_name}
              type="text"
              placeholder="Enter last name"
              onChange={handleUserInfoChange}
            />
            </div>
            
            <div>
            <label>Date of Birth: </label>
            <input
              name="date_of_birth"
              value={userInfo.date_of_birth}
              type="date"
              max={getMinDateOfBirth()}
              onChange={handleUserInfoChange}
            />
            </div>
            
            <div>
            <label>City: </label>
            <input
              name="city"
              value={userInfo.city}
              type="text"
              placeholder="Enter city"
              onChange={handleUserInfoChange}
            />
            </div>
            
            <div>
            <label>Postal code: </label>
            <input
              name="postal_code"
              value={userInfo.postal_code}
              type="text"
              placeholder="Enter postal code"
              onChange={handleUserInfoChange}
            />
            </div>

            <div>
            <label>Occupation: </label>
            <select name="occupation">
                {occupations.map(occupation => 
                  <option value={occupation}>{occupation}</option>
                )}
            </select>
            </div>

            <div>
            <label>Interests: </label>
            {interests.map(interest => 
            <>
            <input value={interest} type="checkbox" />
            <label>{interest}</label>
            <br />
            </>
            )}
            </div>

            <div>
              <input type="submit" value="Sign Up" />
            </div>

        </form>

      </div>
        
    )
};

export default SignUpForm