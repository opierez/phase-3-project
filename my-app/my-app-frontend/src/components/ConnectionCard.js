import React from "react";
import '../styles/ConnectionCard.css'

function ConnectionCard({ user }) {

    const {id, first_name, last_name, occupations, interests} = user

    console.log(interests)
    console.log(occupations)
    return (
        <ul className="user_cards">
            <li className="user_card">
                <h2 className="user_name">{first_name} {last_name}</h2>
                <h3 className="occupations">
                    {occupations.length > 0 ? occupations[0].job_title : ""}
                </h3>
                <ul className="user_interests">
                    {interests.length > 0 ? <li><strong>Interests:</strong></li> : null}
                    {interests.length > 0 ? interests.map(interest => <li key={interest.id}>{interest.interest}</li>) : ""}
                </ul>
                <button className="btn mx-auto">Connect!</button>
            </li>
        </ul>
    )
}

export default ConnectionCard