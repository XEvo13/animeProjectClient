import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context'; // Adjust the import path as necessary

function CommentForm({ animeId }) {
    const [content, setContent] = useState("");
    const { user } = useContext(AuthContext); // Access the user from the context

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = user._id; // Get the logged-in user's ID from context

        axios.post('http://localhost:5005/api/comments', { user: userId, anime: animeId, content })
            .then(response => {
                // onAddComment(response.data.comment);
                setContent("");
            })
            .catch(error => {
                console.error("Error adding comment:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment"
            ></textarea>
            <button type="submit">Submit</button>
        </form>
    );
}

export default CommentForm;
