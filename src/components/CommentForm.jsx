import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context'; // Adjust the import path as necessary

function CommentForm({ animeId, onAddComment }) {
  const [content, setContent] = useState("");
  const [existingCommentId, setExistingCommentId] = useState(null);
  const [actionsId, setActionsId] = useState(null);
  const { user } = useContext(AuthContext); // Access the user from the context

  useEffect(() => {
    const userId = user._id; // Get the logged-in user's ID from context

    axios.get(`http://localhost:5005/api/comments/${animeId}/${userId}`)
      .then(response => {
        if (response.data && response.data.comment) {
          const { comment, actionsId } = response.data;
          setContent(comment.content);
          setExistingCommentId(comment._id);
          setActionsId(actionsId); // Set the actionsId if available
        }
      })
      .catch(error => {
        console.error("Error fetching existing comment:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user._id; // Get the logged-in user's ID from context

    if (existingCommentId) {
      // Update existing comment
      axios.put(`http://localhost:5005/api/comments/${existingCommentId}`, { content, user: userId, actionsId })
        .then(response => {
          setContent(response.data.comment.content);
          if (onAddComment) {
            onAddComment(response.data.comment); // Pass updated comment to handler
          }
        })
        .catch(error => {
          console.error("Error updating comment:", error);
        });
    } else {
      // Create new comment
      axios.post('http://localhost:5005/api/comments', { user: userId, anime: animeId, content })
        .then(response => {
          console.log(response.data)
          setContent("");
          setExistingCommentId(response.data.comment._id);
          setActionsId(response.data.action._id); // Assuming action ID is part of the response
          if (onAddComment) {
            onAddComment(response.data.comment); // Pass new comment to handler
          }
        })
        .catch(error => {
          console.error("Error adding comment:", error);
        });
    }
  };

  const handleDelete = () => {
    if (existingCommentId && actionsId) {
      axios.delete(`http://localhost:5005/api/comments/${existingCommentId}/${actionsId}`)
        .then(response => {
          setContent("");
          setExistingCommentId(null);
          setActionsId(null);
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
