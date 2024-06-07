import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context'; 

function CommentForm({ animeId, onAddComment }) {
  const [content, setContent] = useState("");
  const [existingCommentId, setExistingCommentId] = useState(null);
  const [actionsId, setActionsId] = useState(null);
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    const userId = user._id; 

    axios.get(`https://anime.adaptable.app/api/comments/${animeId}/${userId}`)
      .then(response => {
        if (response.data && response.data.comment) {
          const { comment, actionsId } = response.data;
          setContent(comment.content);
          setExistingCommentId(comment._id);
          setActionsId(actionsId); 
        }
      })
      .catch(error => {
        console.error("Error fetching existing comment:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = user._id; 

    if (existingCommentId) {
      
      axios.put(`https://anime.adaptable.app/api/comments/${existingCommentId}`, { content, user: userId, actionsId })
        .then(response => {
          setContent("");
          // setContent(response.data.comment.content);
          if (onAddComment) {
            onAddComment(response.data.comment);
          }
        })
        .catch(error => {
          console.error("Error updating comment:", error);
        });
    } else {
      // Create new comment
      axios.post('https://anime.adaptable.app/api/comments', { user: userId, anime: animeId, content })
        .then(response => {
          console.log(response.data)
          setContent("");
          setExistingCommentId(response.data.comment._id);
          setActionsId(response.data.action._id); 
          if (onAddComment) {
            onAddComment(response.data.comment); 
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
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col w-full p-4 bg-white rounded-lg shadow-md">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-2 mb-4 border rounded"
        ></textarea>
        <button type="submit" className="w-full flex justify-center py-1.5 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
          {existingCommentId ? "Update Comment" : "Submit Comment"}
        </button>
        {existingCommentId && (
          <button type="button" onClick={handleDelete} className="w-full flex justify-center py-1.5 px-3 mt-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Delete Comment
          </button>
        )}
      </form>
    </div>
  );
}

export default CommentForm;
