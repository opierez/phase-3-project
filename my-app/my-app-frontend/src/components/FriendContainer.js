import React from "react";
import Friend from "./Friend";

function FriendContainer({ friends, connections }) {
    console.log("Friends:")
    console.log(friends)
    
    friends.map(friend => {
        console.log("Friend:")
        console.log(friend.id)})
   return(
    <main className="main-connection">
        {friends.map(friend => friend.id ? <Friend key={friend.id} friend={friend} connections={connections}/> : null)}
    </main>
   )
}

export default FriendContainer