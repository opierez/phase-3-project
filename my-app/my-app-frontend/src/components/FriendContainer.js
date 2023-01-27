import React from "react";
import Friend from "./Friend";

function FriendContainer({ friends, connections }) {

    console.log(friends)




   return(
    <main className="main-connection">
        {friends.map(friend => <Friend key={friend.id} friend={friend} connections={connections}/>)}
    </main>
   )
}

export default FriendContainer