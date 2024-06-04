import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ animeId, onAddComment }) {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace 'user' with the current logged in user's ID.
        const user = "currentUserId"; // Update this to get the actual logged in user's ID.

        axios.post('http://localhost:5005/api/comments', { user, anime: animeId, content })
            .then(response => {
                onAddComment(response.data.comment);
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
