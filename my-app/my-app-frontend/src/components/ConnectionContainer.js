import React, {useState, useEffect} from "react";
import ConnectionCard from "./ConnectionCard";
import '../styles/ConnectionContainer.css'
import { useParams } from 'react-router-dom'


function ConnectionContainer({ loggedInUser, handleFriends }) {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    // console.log(user.id)

    const filterUsers = (users_data) => {
        if (loggedInUser.id) {
            let newUserArray = users_data.filter((element) => {
                return element.id !== loggedInUser.id
            })
        setUsers(newUserArray)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:9292/users`)
            .then(resp => resp.json())
            .then(users_data => {
                // setUsers(users_data)
                filterUsers(users_data)
                setLoading(false)
            })
    }, [])

    if(loading) {
        return <div>Loading...</div>
    }

    // console.log(users)

    

    return (
        <main className="main-connection">
            {users.map(user => <ConnectionCard key={user.id} user={user} loggedInUser={loggedInUser} handleFriends={handleFriends}/>)}
        </main>
    );

};

export default ConnectionContainer