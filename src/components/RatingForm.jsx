import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context"; 

function RatingForm({ animeId, onAddRating }) {
    const [score, setScore] = useState(0);
    const [existingRatingId, setExistingRatingId] = useState(null);
    const { user } = useContext(AuthContext); 

    useEffect(() => {
        const userId = user._id; 

        axios
            .get(`https://anime.adaptable.app/api/ratings/${animeId}/${userId}`)
            .then((response) => {
                if (response.data) {
                    setScore(response.data.score);
                    setExistingRatingId(response.data._id);
                }
            })
            .catch((error) => {
                console.error("Error fetching existing rating:", error);
            });
    }, [animeId, user._id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = user._id; // Get the logged-in user's ID from context

        if (existingRatingId) {
            axios
                .put(`https://anime.adaptable.app/api/ratings/${existingRatingId}`, {
                    user: userId,
                    anime: animeId,
                    score,
                })
                .then((response) => {
                    if (onAddRating) {
                        onAddRating(response.data.rating); 
                    }
                })
                .catch((error) => {
                    console.error("Error updating rating:", error);
                });
        } else {
            axios
                .post("https://anime.adaptable.app/api/ratings", {
                    user: userId,
                    anime: animeId,
                    score,
                })
                .then((response) => {
                    setScore(0);
                    setExistingRatingId(response.data.rating._id);
                    if (onAddRating) {
                        onAddRating(response.data.rating);
                    }
                })
                .catch((error) => {
                    console.error("Error adding rating:", error);
                });
        }
    };

    const handleDelete = () => {
        if (existingRatingId) {
            axios
                .delete(`https://anime.adaptable.app/api/ratings/${existingRatingId}`)
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
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full p-4 bg-white rounded-lg shadow-md">
            <div className="flex space-x-2 mb-4">
                {[5, 4, 3, 2, 1].map((value) => (
                    <React.Fragment key={value}>
                        <input
                            type="radio"
                            id={`star${value}`}
                            name="rating"
                            value={value}
                            checked={score === value}
                            onChange={() => setScore(value)}
                            className="hidden"
                        />
                        <label htmlFor={`star${value}`} className={`cursor-pointer text-2xl text-gray-400 ${score >= value ? "text-yellow-500" : ""}`}>
                            ★
                        </label>
                    </React.Fragment>
                ))}
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                {existingRatingId ? "Update Rating" : "Submit Rating"}
            </button>
            {existingRatingId && (
                <button type="button" onClick={handleDelete} className="w-full py-2 px-4 mt-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Delete Rating
                </button>
            )}
        </form>
    );
}

export default RatingForm;