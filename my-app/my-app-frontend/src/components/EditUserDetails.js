import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import '../styles/EditUserDetails.css'
import Select from 'react-select';





function EditUserDetails({ user, user_dob } ) {

    // console.log(user.occupations[0].job_title)
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [interestOptions, setInterestOptions] = useState([]);
    const [occupations, setOccupations] = useState([]);
    const [userDOB, setUserDOB] = useState('')



    useEffect(() => {
        fetch(`http://localhost:9292/occupations`)
            .then(resp => resp.json())
            .then(occupations => setOccupations(occupations.map(occupation => occupation.job_title)))
    }, [])

   
    // console.log(user_dob)

    useEffect(() => {
        fetch('http://localhost:9292/interests')
            .then(resp => resp.json())
            .then(interests => {
                setInterestOptions(interests.map(interest => interest.interest))
            })
    }, [])

    
    // const setDateOfBirth = (user) => {
    //     setUserDOB(new Date(user.date_of_birth).toISOString().slice(0, 10));
        
    // }

    const [userInfo, setUserInfo] = useState({
        username: user.username,
        password: user.password,
        password_confirm: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        date_of_birth: user_dob,
        city: user.city,
        country: user.country,
        postal_code: user.postal_code,
        occupation: user.occupations[0].job_title,
        interests: []
    });

    const handleUserInfoChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        if (name === 'date_of_birth') {
            console.log(value)
        }

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
    


    return(
        <form name="edit profile details">
            <h1>Edit Profile Details</h1>

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
            
            <div className="form-group">
                <label>Confirm Password: </label>
                <input
                name="password-confirm"
                value={userInfo.password_confirm}
                type="password"
                placeholder="Confirm password"
                onChange={handleUserInfoChange}
                />
            </div>
            
            <div className="form-group">
                <label>First Name: </label>
                <input
                name="first_name"
                value={userInfo.first_name}
                type="text"
                placeholder="Enter first name"
                onChange={handleUserInfoChange}
                />
            </div>
            
            <div className="form-group">
                <label>Last name: </label>
                <input
                name="last_name"
                value={userInfo.last_name}
                type="text"
                placeholder="Enter last name"
                onChange={handleUserInfoChange}
                />
            </div>
            
            <div className="form-group">
            <label>Date of Birth: </label>
            <input
              name="date_of_birth"
              value={user_dob}
              type="date"
              max={getMinDateOfBirth()}
              onChange={handleUserInfoChange}
            />
            </div>
            
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
                <label>Zip code: </label>
                <input
                name="last_name"
                value={userInfo.postal_code}
                type="text"
                placeholder="Enter zip code"
                onChange={handleUserInfoChange}
                />
            </div>

            <div className="form-group">
                <label>Occupation: </label>
                <select name="occupation">
                    {occupations.map(occupation =>
                    <option value={occupation}>{occupation}</option>
                    )}
                </select>
            </div>

            <div className="form-group">
                <label>Interests:</label>
                <Select 
                    options={interestOptions} 
                    value={selectedInterests} 
                    onChange={setSelectedInterests} 
                    isMulti 
                />
            </div>

            <select name="occupation">
                
            </select>

        </form>
      

    )
}

export default EditUserDetails