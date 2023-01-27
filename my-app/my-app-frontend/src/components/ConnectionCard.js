import React, {useState} from "react";
import '../styles/ConnectionCard.css'

function ConnectionCard({ user, loggedInUser, handleFriends }) {

    const {id, first_name, last_name, occupation, interests} = user
 
    const handleConnect = () => {
        console.log(id)
        console.log(loggedInUser)

        let users = {
            user1: loggedInUser.id,
            user2: id
        }

        fetch(`http://localhost:9292/connections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(users)
        })
        .then(resp => {
            if(resp.status === 204) {
                alert("Already connected with user")
                return;
            }
            return resp.json()
        })
        .then(connectedUser => handleFriends(connectedUser))
        .catch(error => console.log("Error Occured: ", error))

    }
    
    return (
        <ul className="user_cards">
            <li className="user_card">
                <h2 className="user_name">{first_name} {last_name}</h2>
                <h3 className="occupations">
                    {occupation}
                </h3>
                <ul className="user_interests">
                    {interests.length > 0 ? <li><strong>Interests:</strong></li> : null}
                    {interests.length > 0 ? interests.map(interest => <li key={interest.id}>{interest.interest}</li>) : ""}
                </ul>
                <button className="btn mx-auto" onClick={handleConnect}>Connect!</button>
            </li>
        </ul>
    )
}

export default ConnectionCard