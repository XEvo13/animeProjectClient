import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context"; // Adjust the import path as necessary

function RatingForm({ animeId }) {
    const [score, setScore] = useState(0);
    const [existingRatingId, setExistingRatingId] = useState(null);
    const { user } = useContext(AuthContext); // Access the user from the context

    useEffect(() => {
        // Fetch the existing rating if available
        const userId = user._id; // Get the logged-in user's ID from context

        axios
            .get(`http://localhost:5005/api/ratings/${animeId}/${userId}`)
            .then((response) => {
                if (response.data) {
                    setScore(response.data.score);
                    setExistingRatingId(response.data._id);
                }
            })
            .catch((error) => {
                console.error("Error fetching existing comment:", error);
            });
    }, [animeId, user._id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = user._id; // Get the logged-in user's ID from context

        if (existingRatingId) {
            axios
                .put("http://localhost:5005/api/ratings", {
                    user: userId,
                    anime: animeId,
                    score,
                })
                .then((response) => {
                    /* onAddRating(response.data.rating); */
                    setScore(0);
                })
                .catch((error) => {
                    console.error("Error adding rating:", error);
                });
        } else {
            // Create new rating
            axios
                .post("http://localhost:5005/api/ratings", {
                    user: userId,
                    anime: animeId,
                    score,
                })
                .then((response) => {
                    setScore(0);
                    setExistingRatingId(response.data.rating._id);
                })
                .catch((error) => {
                    console.error("Error adding a rating:", error);
                });
        }
    };

    const handleDelete = () => {
        if (existingRatingId) {
            axios
                .delete(`http://localhost:5005/api/ratings/${existingRatingId}`)
                .then((response) => {
                    setScore(0);
                    setExistingRatingId(null);
                })
                .catch((error) => {
                    console.error("Error deleting rating:", error);
                });
        }
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
            <button type="submit">
                {existingRatingId ? "Update Rating" : "Submit Rating"}
            </button>
            {existingRatingId && (
                <button type="button" onClick={handleDelete}>
                    Delete Rating
                </button>
            )}
        </form>
    );
}

export default RatingForm;
