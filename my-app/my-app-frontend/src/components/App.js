import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar'
import MeetPeople from './MeetPeople'
import '../styles/App.css'
import {Switch, Route, BrowserRouter} from 'react-router-dom'


function App() {
  return (
    <div className='app-container'>
    <NavBar />
    <div className='container d-flex mx-auto'>
      
      <Switch>
      

        <Route path='/users/:id'>
          <Home />
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
