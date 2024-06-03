import React, { useState } from 'react';
import axios from 'axios';

function CommentForm({ animeId, onAddComment }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = 'user-id'; // Replace with actual user ID

    axios.post('/api/comments', {
      user: userId,
      anime: animeId,
      content,
    })
    .then(response => {
      onAddComment(response.data.comment);
      setContent('');
    })
    .catch(error => {
      console.error('Error adding comment:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;