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
  // const [users, setUsers] = useState([])
  const [friends, setFriends] = useState([])
  const [connections, setConnections] = useState([])

  const history = useHistory();
  //const [loading, setLoading] = useState(true)
  //const [userDOB, setUserDOB] = useState('')

  useEffect(() => {
    fetch(`http://localhost:9292/connections`)
        .then(resp => resp.json())
        .then(connections_data => setConnections(connections_data))
  }, [])


  const handleLogin = (user) => {
    setUser(user);
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

  


  return (
    <div className='app-container'>
    <NavBar />
    <div className='container d-flex mx-auto'>
      
      <Switch>

        <Route path='/login'>
          <LoginForm handleLogin={handleLogin}/>
        </Route>

        <Route path='/users/connections'>
          <ConnectionContainer loggedInUser={user} handleFriends={handleFriends}/>
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