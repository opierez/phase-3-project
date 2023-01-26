import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar'
import MeetPeople from './MeetPeople'
import '../styles/App.css'
import {Switch, Route, BrowserRouter, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import EditUserDetails from './EditUserDetails';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useHistory } from 'react-router-dom';
import ConnectionContainer from './ConnectionContainer';


function App() {
  const [user, setUser] = useState({})

  const history = useHistory();
  //const [loading, setLoading] = useState(true)
  //const [userDOB, setUserDOB] = useState('')


  const handleLogin = (user) => {
    setUser(user);
    history.push(`/users/${user.id}`)
  }

  const handleDeletedUser = (user) => {
    setUser({})
    history.push('/login')
  }


  return (
    <div className='app-container'>
    <NavBar />
    <div className='container d-flex mx-auto'>
      
      <Switch>

        <Route path='/login'>
          <LoginForm handleLogin={handleLogin}/>
        </Route>

        <Route path={`/users/:id/edit`}>
          <EditUserDetails user={user} handleLogin={handleLogin}/>
        </Route>

  
        <Route path='/users/:id'>
          <Home user={user} handleDeletedUser={handleDeletedUser}/>
        </Route>
 
        <Route path='/signup'>
          <SignUpForm />
        </Route>

        <Route path='/connections'>
          <ConnectionContainer user={user}/>
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