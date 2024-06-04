import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context'; // Adjust the import path as necessary

function RatingForm({ animeId }) {
    const [score, setScore] = useState(0);
    const { user } = useContext(AuthContext); // Access the user from the context

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = user._id; // Get the logged-in user's ID from context

        axios.post('http://localhost:5005/api/ratings', { user: userId, anime: animeId, score })
            .then(response => {
                /* onAddRating(response.data.rating); */
                setScore(0);
            })
            .catch(error => {
                console.error("Error adding rating:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {[5, 4, 3, 2, 1].map((value) => (
                    <React.Fragment key={value}>
                        <input
                            type="radio"
                            id={`star${value}`}
                            name="rating"
                            value={value}
                            checked={score === value}
                            onChange={() => setScore(value)}
                        />
                        <label htmlFor={`star${value}`}>{value}</label>
                    </React.Fragment>
                    //it allows grouping a list of children elements
                    //without adding extra nodes to the DOM
                ))}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default RatingForm;
