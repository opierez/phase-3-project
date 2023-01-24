import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar'
import MeetPeople from './MeetPeople'
import '../styles/App.css'
import {Switch, Route, BrowserRouter, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'


function App() {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
      fetch(`http://localhost:9292/users/${1}`)
          .then(resp => resp.json())
          .then(data => {
              setUser(data)
              setLoading(false)
          })
  }, [])

  if (loading) {
      return <p>Loading...</p>
  }


  return (
    <div className='app-container'>
    <NavBar />
    <div className='container d-flex mx-auto'>
      
      <Switch>

        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/users/:id'>
          <Home user={user}/>
        </Route>

        <Route>
          <MeetPeople path='users'/>
        </Route>
      </Switch>
  
    </div>
    </div>
  );
}

export default App;