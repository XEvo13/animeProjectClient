import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context'; // Adjust the import path as necessary

function CommentForm({ animeId }) {
    const [content, setContent] = useState("");
    const [existingCommentId, setExistingCommentId] = useState(null);
    const { user } = useContext(AuthContext); // Access the user from the context

    useEffect(() => {
        // Fetch the existing comment if available
        const userId = user._id; // Get the logged-in user's ID from context

        axios.get(`http://localhost:5005/api/comments/${animeId}/${userId}`)
            .then(response => {
                if (response.data) {
                    setContent(response.data.content);
                    setExistingCommentId(response.data._id);
                }
            })
            .catch(error => {
                console.error("Error fetching existing comment:", error);
            });
    }, [animeId, user._id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = user._id; // Get the logged-in user's ID from context

        if (existingCommentId) {
            // Update existing comment
            axios.put(`http://localhost:5005/api/comments/${existingCommentId}`, { content })
                .then(response => {
                    setContent(response.data.content);
                })
                .catch(error => {
                    console.error("Error updating comment:", error);
                });
        } else {
            // Create new comment
            axios.post('http://localhost:5005/api/comments', { user: userId, anime: animeId, content })
                .then(response => {
                    setContent("");
                    setExistingCommentId(response.data.comment._id);
                })
                .catch(error => {
                    console.error("Error adding comment:", error);
                });
        }
    };

    const handleDelete = () => {
        if (existingCommentId) {
            axios.delete(`http://localhost:5005/api/comments/${existingCommentId}`)
                .then(response => {
                    setContent("");
                    setExistingCommentId(null);
                })
                .catch(error => {
                    console.error("Error deleting comment:", error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment"
            ></textarea>
            <button type="submit">{existingCommentId ? "Update Comment" : "Submit Comment"}</button>
            {existingCommentId && <button type="button" onClick={handleDelete}>Delete Comment</button>}
        </form>
    );
}

export default CommentForm;
