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
import Connections from './Connections';


function App() {
  const [user, setUser] = useState({})

  const history = useHistory();
  //const [loading, setLoading] = useState(true)
  //const [userDOB, setUserDOB] = useState('')

  // useEffect(() => {
  //   if (user.id){
  //     fetch(`http://localhost:9292/users/${user.id}`)
  //         .then(resp => resp.json())
  //         .then(data => {
  //             setUser(data)
  //             setLoading(false)
  //             // console.log(data.date_of_birth)
  //             setUserDOB(new Date(data.date_of_birth).toISOString().slice(0, 10));
  //             console.log(userDOB)
  //             // console.log(date)
  //         })
  // }}, [user])
  

  // useEffect(() => {
  //     fetch(`http://localhost:9292/users/1`)
  //         .then(resp => resp.json())
  //         .then(data => {
  //             setUser(data)
  //             setLoading(false)
  //             // console.log(data.date_of_birth)
  //             //setUserDOB(new Date(data.date_of_birth).toISOString().slice(0, 10));
  //             //console.log(userDOB)
  //             // console.log(date)
  //         })
  // }, [setUser])

  // if (loading) {
  //     return <p>Loading...</p>
  // }

  
  // const setDateOfBirth = (user) => {
  //   setUserDOB(new Date(user.date_of_birth).toISOString().slice(0, 10));
    
  // }
  // console.log(userDOB)

  const handleLogin = (user) => {
    setUser(user);
    history.push(`/users/${user.id}`)
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
          <EditUserDetails user={user} />
        </Route>

  
        <Route path='/users/:id'>
          <Home user={user}/>
        </Route>
 
        <Route path='/signup'>
          <SignUpForm />
        </Route>

        <Route path='/connections'>
          <Connections />
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