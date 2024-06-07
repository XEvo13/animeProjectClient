import React from 'react';

const AllUsersList = ({ allUsers, userFriends, addFriend }) => {
    const friendsIds = userFriends.map(f => f._id);

    return (
        <div>
            {/* <h2>Add Friends</h2> */}
            <ul>
                {allUsers.filter(user => !friendsIds.includes(user._id)).map(user => (
                    <li key={user._id} onClick={() => addFriend(user._id)} style={{ cursor: 'pointer' }}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllUsersList;
