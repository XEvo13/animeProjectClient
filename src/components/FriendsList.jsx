// FriendsList.jsx
import React from 'react';

const FriendsList = ({ friends, removeFriend }) => {
    return (
        <div>
            <h2>Friends List</h2>
            <ul>
                {friends.map(friend => (
                    <li
                        key={friend._id}
                        onClick={() => removeFriend(friend._id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {friend.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;
