import React from "react";
import {Link} from 'react-router-dom';
import '../styles/NavBar.css'
function NavBar({user, handleSignOut}) {
    return (
        <nav className="navbar navbar-expand-md navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Brand</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><Link className="nav-link" to="/users/:id">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/users/connections">Connect</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/users/friends">My Friends</Link></li>
                        {user.id ? <li className="sign-out"><Link className="nav-link" to="/login" onClick={handleSignOut}>Sign out</Link></li> : null}

                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default NavBar