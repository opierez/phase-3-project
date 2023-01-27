import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar'
import '../styles/App.css'
import {Switch, Route, BrowserRouter, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import EditUserDetails from './EditUserDetails';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useHistory } from 'react-router-dom';
import ConnectionContainer from './ConnectionContainer';
import FriendContainer from './FriendContainer';


function App() {
  const [user, setUser] = useState({})
  const [users, setUsers] = useState([])
  const [friends, setFriends] = useState([])
  const [connections, setConnections] = useState([])

  const history = useHistory();
  //const [loading, setLoading] = useState(true)
  //const [userDOB, setUserDOB] = useState('')

  useEffect(() => {
    fetch(`http://localhost:9292/connections`)
    .then(resp => resp.json())
    .then(resp => setConnections(resp))
  }, [])

  useEffect(() => {
    fetch(`http://localhost:9292/users`)
        .then(resp => resp.json())
        .then(users_data => {
            setUsers(users_data)
        })
}, [])

  
  const handleLogin = (user) => {
    setUser(user);
    addExistingFriends(user)
    history.push(`/users/${user.id}`)
  }

  const handleDeletedUser = (user) => {
    setUser({})
    history.push('/login')
  }

  const handleFriends = (user) => {
    if(user) {
      setFriends([...friends, user])
    }
  }

  const addExistingFriends = (loggedInUser) => {
    let friendConnectionsIdArr = connections.filter(connection => {
      return connection.user2_id === loggedInUser.id
    }).map(friendConnection => friendConnection.user1_id)

    let preexistingFriends = users.filter(u => {
      return friendConnectionsIdArr.find(element => element === u.id)
    })

    setFriends(preexistingFriends)

  }

  const addNewFriend = () => {
   
    let friendConnectionsIdArr = connections.filter(connection => {
      return connection.user2_id === user.id
    }).map(friendConnection => friendConnection.user1_id)

    let preexistingFriends = users.filter(u => {
      return friendConnectionsIdArr.find(element => element === u.id)
    })
    setFriends([preexistingFriends, ...friends])
  }




  return (
    <div className='app-container'>
    <NavBar user={user}/>
    <div className='container d-flex mx-auto'>
      
      <Switch>

        <Route path='/login'>
          <LoginForm handleLogin={handleLogin}/>
        </Route>

        <Route path='/users/connections'>
          <ConnectionContainer loggedInUser={user} users={users} handleFriends={handleFriends} handlePrexistingFriends={addNewFriend}/>
        </Route>

        <Route path={`/users/:id/edit`}>
          <EditUserDetails user={user} handleLogin={handleLogin}/>
        </Route>

        <Route path={`/users/friends`}>
          <FriendContainer friends={friends} connections={connections}/>
        </Route>

  
        <Route path='/users/:id'>
          <Home user={user} handleDeletedUser={handleDeletedUser}/>
        </Route>
 
        <Route path='/signup'>
          <SignUpForm handleLogin={handleLogin}/>
        </Route>

        {/* <Route path='/test'>
          <Login />
        </Route> */}
        
      </Switch>
  
    </div>
    </div>
  );
}

export default App;