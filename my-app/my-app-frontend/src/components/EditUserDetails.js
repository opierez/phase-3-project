import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import '../styles/EditUserDetails.css'
import '../styles/Home.css'
import Select from 'react-select';



function EditUserDetails({ user, handleLogin } ) {

    // console.log(user)

    let selectedOccupation = user.occupation;
   
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [interestOptions, setInterestOptions] = useState([]);
    const [occupations, setOccupations] = useState([]);
    const [userDOB, setUserDOB] = useState('')

    useEffect(() => {
        if (user && user.date_of_birth) {
            setUserDOB(new Date(user.date_of_birth).toISOString().slice(0, 10))
        }
    }, [user])

    useEffect(() => {
        fetch(`http://localhost:9292/occupations`)
            .then(resp => resp.json())
            .then(occupations => setOccupations(occupations))
      }, [])


    useEffect(() => {
    fetch(`http://localhost:9292/interests`)
    .then(resp => resp.json())
    .then(interests => {
        console.log(interests)
        setInterestOptions(interests)
    })
    //.then(interests => setInterests(interests.map(interest => interest.interest)))
    }, [])




    const [userInfo, setUserInfo] = useState({
        username: user.username,
        password: user.password,
        password_confirm: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        date_of_birth: user.date_of_birth,
        city: user.city,
        country: user.country,
        postal_code: user.postal_code,
        occupation: user.occupation,
        // interests: user.interests 
        interests: user.interests && user.interests.length > 0 ? user.interests : []
    });
 
    const handleUserInfoChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        // if (name === 'date_of_birth') {
        //     console.log(value)
        // }
        // console.log(name)
        // console.log(value)

        setUserInfo({...userInfo, [name]: value});
    };

    const handleDOBChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserInfo({...userInfo, [name]: value})
        setUserDOB(e.target.value)
    }

    const handleInterestChange = (e) => {
        let interest_arr = e.map(object => object.value )
        console.log(interest_arr)

        setUserInfo({...userInfo, interests: interest_arr})
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

    const onEditSubmit = (e) => {
        e.preventDefault();
        // console.log(user.id)

        fetch(`http://localhost:9292/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(resp => resp.json())
        .then(updatedUser => {
            // console.log(updatedUser)
            handleLogin(updatedUser)
        })
    }
    

    return(
        <div className="main_container">
        <form name="edit profile details" onSubmit={onEditSubmit}>
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
              value={userDOB}
              type="date"
              max={getMinDateOfBirth()}
              onChange={handleDOBChange}
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
                <select name="occupation" onChange={handleUserInfoChange}>
                    {occupations.map(occupation =>
                    <option key={occupation.id} value={occupation.job_title} selected={occupation.job_title === selectedOccupation}>{occupation.job_title}</option>
                    )}
                </select>
            </div>


            <div className="form-group">
                <label>Interests:</label>
                <Select 
                    options={interestOptions.map(option => ({label: option.interest, value: option.interest}))}                    
                    value={selectedInterests} 
                    // onChange={setSelectedInterests} 
                    onChange={(event) => {
                        // console.log(event)
                        handleInterestChange(event)
                        setSelectedInterests(event);
                    }}
                    isMulti 
                    styles={{
                        option: (base, state) => ({
                            ...base,
                            color: state.isSelected ? 'white' : 'black',
                            backgroundColor: state.isSelected ? 'blue' : 'white',
                        }),
                    }}
                />
            </div>


            <button type="submit">SUBMIT</button>
        </form>
    </div>

    )
}

export default EditUserDetails