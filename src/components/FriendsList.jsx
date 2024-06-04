import React from 'react';

const FriendsList = ({ friends }) => {
    return (
        <div>
            <h2>Friends List</h2>
            <ul>
                {friends.map(friend => (
                    <li key={friend._id}>{friend.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;
