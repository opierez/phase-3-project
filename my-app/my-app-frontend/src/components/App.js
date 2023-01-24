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


function App() {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [userDOB, setUserDOB] = useState('')
  
 

  useEffect(() => {
      fetch(`http://localhost:9292/users/${1}`)
          .then(resp => resp.json())
          .then(data => {
              setUser(data)
              setLoading(false)
              // console.log(data.date_of_birth)
              setUserDOB(new Date(data.date_of_birth).toISOString().slice(0, 10));
              console.log(userDOB)
              // console.log(date)
          })
  }, [])

  if (loading) {
      return <p>Loading...</p>
  }

  const handleLogIn = (user) => {

  }


  return (
    <div className='app-container'>
    <NavBar />
    <div className='container d-flex mx-auto'>
      
      <Switch>

        <Route path='/login'>
          <LoginForm />
        </Route>

        <Route path={`/users/:id/edit`}>
          <EditUserDetails user={user} user_dob={userDOB}/>
        </Route>

        <Route path='/users/:id'>
          <Home user={user}/>
        </Route>
 
        <Route path='/signup'>
          <SignUpForm />
        </Route>
        
      </Switch>
  
    </div>
    </div>
  );
}

export default App;