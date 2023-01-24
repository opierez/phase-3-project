//import './App.css';
import React, { useState } from 'react';
import Login from './Login';

function App() {
  const [currentUser, setCurrentUser] = useState("");

  const handleLoginSubmit = () => {

  };

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
