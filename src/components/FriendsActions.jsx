import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5005";

const FriendsActions = ({ userId }) => {
    const [actions, setActions] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/${userId}/friendsactions`)
            .then(response => {
                console.log(response.data)
                setActions(response.data);
            })
            .catch(error => {
                setErrorMessage("Failed to fetch friends' actions");
                console.error("Failed to fetch friends' actions", error);
            });
    }, [userId]);

    return (
        <div>
            <h2>Friends' Recent Actions</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <ul>
                {actions.map(action => (
                    <li key={action._id}>
                        <p><strong>{action.user.name}</strong> made a new <strong>{action.anime.name}</strong></p>
                        {action.comment && <p>Comment: {action.comment.content}</p>}
                        {action.rating && <p>Rating: {action.rating.score}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsActions;
