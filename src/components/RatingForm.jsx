import React, { useState } from "react";
import axios from "axios";

function RatingForm({ animeId, onAddRating }) {
    const [score, setScore] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace 'user' with the current logged in user's ID.
        const user = "currentUserId"; // Update this to get the actual logged in user's ID.

        axios.post('http://localhost:5005/api/ratings', { user, anime: animeId, score })
            .then(response => {
                onAddRating(response.data.rating);
                setScore(0);
            })
            .catch(error => {
                console.error("Error adding rating:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rating">
                {[5, 4, 3, 2, 1].map((value) => (
                    <React.Fragment key={value}>
                        <input
                            type="radio"
                            id={`star${value}`}
                            name="rating"
                            value={value}
                            checked={rating === value}
                            onChange={() => setRating(value)}
                            style={{ display: 'none' }}
                        />
                        <label
                            htmlFor={`star${value}`}
                            style={{
                                fontSize: '2em',
                                color: rating >= value ? '#FFD700' : '#DDDDDD',
                                cursor: 'pointer'
                            }}
                        >★</label>
                    </React.Fragment>
                ))}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default RatingForm;