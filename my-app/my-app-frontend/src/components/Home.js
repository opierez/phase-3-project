import React, { useEffect, useState } from "react";
import {useParams, Link} from 'react-router-dom'
import '../styles/Home.css'


function Home({ user, handleDeletedUser }) {
    
//    console.log(user);

    const handleDelete = () => {
        fetch(`http://localhost:9292/users/${user.id}`, {
            method: "DELETE",
        })
        .then(resp => resp.json())
        .then(deletedUser => handleDeletedUser(deletedUser))
    }

    return (
        
        <div className="main_container">
            <div className="row">
                <div className="col-12 text-center mt-3">
                    <img src='https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg' alt='flower' className="rounded-circle" style={{width: "200px", height:"200px"}} />
                </div>
            </div>
            <div className='row'>
                <div className="col-12 text-center">
                    <h1 className="my-3">{user.first_name} {user.last_name} • {user.occupations.length > 0 ? user.occupations[0].job_title : ""}</h1>
                    <h4 className='text-center'>Interests:</h4>
                    <ul className='text-center'>
                    {user.interests.length > 0 ? user.interests.map(interest => <li key={interest.id}>{interest.interest}</li>) : ""}
                    </ul>
                    <br/>
                    <Link to={`/users/${user.id}/edit`}>
                        <button className="btn mx-auto">Edit</button>
                    </Link>
                        <button className="btn mx-auto" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Home;