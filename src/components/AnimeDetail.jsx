import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from './CommentForm';

function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/api/animes/${id}`)
      .then(response => {
        setAnime(response.data);
      })
      .catch(error => {
        console.error('Error fetching anime details:', error);
      });

    axios.get(`/api/${id}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  if (!anime) return <p>Loading...</p>;

  return (
    <div>
      <h1>{anime.title}</h1>
      <img src={anime.picture} alt={anime.title} width="200" />
      <p>Episodes: {anime.episodes}</p>

      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <small>By: {comment.user.name}</small>
          </li>
        ))}
      </ul>

      <CommentForm animeId={id} onAddComment={handleAddComment} />
    </div>
  );
}

export default AnimeDetail;