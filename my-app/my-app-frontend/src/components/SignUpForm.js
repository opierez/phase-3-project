import React, { useEffect, useState } from "react";
import Select from 'react-select';

function SignUpForm({handleLogin}) {
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
        occupation: "",
        interests: []
    });

    const [occupations, setOccupations] = useState([]);
    const [interests, setInterests] = useState([]);
    const [part, setPart] = useState(1);

    useEffect(() => {
      fetch(`http://localhost:9292/occupations`)
          .then(resp => resp.json())
          .then(occupations => {
            console.log(occupations.map(occupation => occupation.job_title))
            setOccupations(occupations.map(occupation => occupation.job_title))
          })
    }, [])

    useEffect(() => {
      fetch(`http://localhost:9292/interests`)
      .then(resp => resp.json())
      .then(interests => {
        console.log(interests.map(interest => interest.interest))
        setInterests(interests.map(interest => interest.interest))})
      //.then(interests => setInterests(interests.map(interest => interest.interest)))
    }, [])

    const handleUserInfoChange = (e) => {
      console.log(`name: ${e.target.name}`)
      console.log(`value: ${e.target.value}`)
        let name = e.target.name;
        let value = e.target.value;

        if (name === "interests") {
          value = [...userInfo.interests, value]
        }

        setUserInfo({...userInfo, [name]: value});
    };

    const handleInterestChange = (e) => {
      let interest_arr = e.map(object => object.value )
      console.log(interest_arr)
      setUserInfo({...userInfo, interests: interest_arr})
  }

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

      console.log(e.target.occupations.value);
      console.log(e.target.interests.value)

      fetch("http://localhost:9292/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo)
      })
      .then(resp => resp.json())
      .then(newUser => handleLogin(newUser))
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

            <button onClick={handleNext}>Next</button>
          </>

        ) : null}

        { part === 2 ? (
          <>
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

          <div className="form-group">
            <label>*City: </label>
            <input
              name="city"
              value={userInfo.city}
              type="text"
              placeholder="Enter city"
              onChange={handleUserInfoChange}
              required
            />
            </div>
            
            <div className="form-group">
            <label>*Postal code: </label>
            <input
              name="postal_code"
              value={userInfo.postal_code}
              type="text"
              placeholder="Enter postal code"
              onChange={handleUserInfoChange}
              required
            />
            </div>

            <div className="form-group">
              <label>*Country: </label>
              <select name="country" onChange={handleUserInfoChange} defaultValue="United States" required>
              <option value="Canada">Canada</option>
                <option value="China">China</option>
                <option value="England">England</option>
                <option value="India">India</option>
                <option value="Japan">Japan</option>
                <option value="United States">United States</option>
                
              </select>
            </div>

            
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </>
          ) : null
        }

        {part === 3 ? (
          <>
          <h2>Tell Us About Yourself</h2>
          <h3></h3>
          <div className="form-group">
            <label>Occupation: </label>
            <select name="occupations" onChange={handleUserInfoChange}>
                {occupations.map(occupation => 
                  <option key={occupation} value={occupation}>{occupation}</option>
                )}
            </select>
            </div>

            <div className="form-group">
            <select name="interests" onChange={handleUserInfoChange} multiple>
              {interests.map(interest =>
                <option key={interest} value={interest}>{interest}</option>)}
            </select>
            {/* <label>Interests: </label>
            {interests.map(interest => 
            <>
            <input key={interest}  name="interests" value={interest} type="checkbox" />
            <label>{interest}</label>
            <br />
            </>
            )} */}
            </div>
            <div className="form-group">
                <label>Interests:</label>
                <Select 
                    options={interests} 
                    value={userInfo.interests} 
                    onChange={handleInterestChange} 
                    isMulti 
                />
            </div>
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


