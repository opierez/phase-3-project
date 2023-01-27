import React from "react";

function Friend({ friend, connections }) {
    console.log(friend.interests);

    const { id, first_name, last_name, occupation, interests } = friend

    const { user1_id, user2_id } = connections


    let filteredConnections = connections.filter(connection => connection.id !== id)


    //console.log(interests)

    return (
        <ul className="user_cards">
            <li className="user_card">
                <h2 className="user_name">{first_name} {last_name}</h2>
                <h3 className="occupations">{occupation}</h3>
                <ul className="user_interests">
                    {interests ? (
                        <>
                            <li><strong>Interests:</strong></li>
                            {interests.map(interest => <li key={interest.id}>{interest.interest}</li>)}
                        </>
                    ) : null}
                </ul>
            </li>
        </ul>
    )
}
            
//             {/* <li className="user_card">
//                 <h2 className="user_name">{first_name} {last_name}</h2>
//                 <h3 className="occupations">
//                     {occupation}
//                 </h3>
//                 <ul className="user_interests">
//                     {interests.length > 0 ? <li><strong>Interests:</strong></li> : null}
//                     {interests.length > 0 ? interests.map(interest => <li key={interest.id}>{interest.interest}</li>) : ""}
//                 </ul>
//             </li> 
//         </ul>*/}
//     )
// }

export default Friend