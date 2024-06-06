import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";


function AddFriend({ userId, setUser }) {
    const [friendId, setFriendId] = useState("");

    const handleAddFriend = () => {
        axios.put(`${API_URL}/api/${userId}/friend/${friendId}`)
            .then(response => {
                setUser(response.data.user);
            })
            .catch(error => {
                console.error("Failed to add friend");
            });
    };

    return (
        <div>
            <h2>Add Friend</h2>
            <input
                type="text"
                value={friendId}
                onChange={(e) => setFriendId(e.target.value)}
                placeholder="Friend ID"
            />
            <button onClick={handleAddFriend}>Add Friend</button>
        </div>
    );
}

export default AddFriend;
