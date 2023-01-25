import React, { useEffect, useState } from "react";
import Select from 'react-select';

function SignUpForm() {
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        password_confirm: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        city: "",
        country: "United States",
        postal_code: "",
        occupation: [],
        interests: []
    });

    const [occupations, setOccupations] = useState([]);
    const [interests, setInterests] = useState([]);
    const [part, setPart] = useState(1);

    useEffect(() => {
      fetch(`http://localhost:9292/occupations`)
          .then(resp => resp.json())
          .then(occupations => setOccupations(occupations))
    }, [])

    useEffect(() => {
      fetch(`http://localhost:9292/interests`)
      .then(resp => resp.json())
      .then(interests => setInterests(interests))
      //.then(interests => setInterests(interests.map(interest => interest.interest)))
    }, [])

    const handleUserInfoChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === interests) {
          console.log(interests)
        }

        setUserInfo({...userInfo, [name]: value});
    };

    const handleNext = () => {
      setPart(part => part + 1)
    }

    const handlePrevious = () => {
      setPart(part => part - 1)
    }

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
        { 
          part === 1 ? (
          <>
          <div className="form-group">
          <label>*Username: </label>
          <input
            name="username"
            value={userInfo.username}
            type="text"
            placeholder="Enter username"
            onChange={handleUserInfoChange}
            required
          />
          </div>

          <div className="form-group">
            <label>*Password: </label>
            <input
              name="password"
              value={userInfo.password}
              type="password"
              placeholder="Enter password"
              onChange={handleUserInfoChange}
              required
            />
            </div>

            <div className="form-group">
            <label>*Confirm Password: </label>
            <input
              name="password_confirm"
              value={userInfo.password_confirm}
              type="password"
              placeholder="Confirm password"
              onChange={handleUserInfoChange}
              required
            />
            </div>

            <div className="form-group">
            <label>*First Name: </label>
            <input
              name="first_name"
              value={userInfo.first_name}
              type="text"
              placeholder="Enter first name"
              onChange={handleUserInfoChange}
              required
            />
            </div>

            <div className="form-group">
            <label>*Last name: </label>
            <input
              name="last_name"
              value={userInfo.last_name}
              type="text"
              placeholder="Enter last name"
              onChange={handleUserInfoChange}
              required
            />
            </div>

            <div className="form-group">
            <label>*Date of Birth: </label>
            <input
              name="date_of_birth"
              value={userInfo.date_of_birth}
              type="date"
              max={getMinDateOfBirth()}
              onChange={handleUserInfoChange}
              required
            />
            </div>

            <button onClick={handleNext}>Next</button>
          </>

        ) : null}

        { part === 2 ? (
          <>
          <div className="form-group">
            <label>City: </label>
            <input
              name="city"
              value={userInfo.city}
              type="text"
              placeholder="Enter city"
              onChange={handleUserInfoChange}
            />
            </div>
            
            <div className="form-group">
            <label>Postal code: </label>
            <input
              name="postal_code"
              value={userInfo.postal_code}
              type="text"
              placeholder="Enter postal code"
              onChange={handleUserInfoChange}
            />
            </div>

            <div className="form-group">
              <label>Country: </label>
              <select name="country" onChange={handleUserInfoChange}>
              <option value="Canada">Canada</option>
                <option value="China">China</option>
                <option value="England">England</option>
                <option value="India">India</option>
                <option value="Japan">Japan</option>
                <option value="United States" selected>United States</option>
                
              </select>
            </div>

            <div className="form-group">
            <label>Occupation: </label>
            <select name="occupation" onChange={handleUserInfoChange}>
                {occupations.map(occupation => 
                  <option key={occupation.id} value={occupation}>{occupation.job_title}</option>
                )}
            </select>
            </div>

            <div className="form-group">
            <label>Interests: </label>
            {interests.map(interest => 
            <>
            <input key={interest.id}  name="interests" value={interest} type="checkbox" />
            <label>{interest.interest}</label>
            <br />
            </>
            )}
            </div>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </>
          ) : null
        }

        {part === 3 ? (
          <>
          <h2>Review Details</h2>
          <p>Username: {userInfo.username}</p>
          <p>Name: {`${userInfo.first_name} ${userInfo.last_name}`}</p>
          <p>Date of Birth: {`${userInfo.date_of_birth.slice(5,7)}/${userInfo.date_of_birth.slice(8,10)}/${userInfo.date_of_birth.slice(0,4)}`}</p>
          <p>Location: {`${userInfo.city}, ${userInfo.postal_code}, ${userInfo.country}`}</p>
          <p>Occupation: {userInfo.occupation}</p>
          <button onClick={handlePrevious}>Go Back</button>
          <div className="form-group">
              <input type="submit" value="Sign Up" />
            </div>
          </>
        ) : null}

            {/* <div className="form-group">
                <label>Interests:</label>
                <Select 
                    options={interests} 
                    value={userInfo.interests} 
                    onChange={handleSignUpSubmit} 
                    isMulti 
                />
            </div> */}

        </form>

      </div>
        
    )
};

export default SignUpForm


