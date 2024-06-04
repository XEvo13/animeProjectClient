import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from './CommentForm';
import RatingForm from './RatingForm';

function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5005/api/anime/${id}`)
      .then(response => {
        setAnime(response.data);
      })
      .catch(error => {
        console.error('Error fetching anime details:', error);
      });


      
    // axios.get(`http://localhost:5005/api/comments/${id}`)
    //   .then(response => {
    //     setComments(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching comments:', error);
    //   });

    // axios.get(`http://localhost:5005/api/ratings/${id}`)
    //   .then(response => {
    //     setRatings(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching ratings:', error);
    //   });
  }, [id]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleAddRating = (newRating) => {
    setRatings([...ratings, newRating]);
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
            {/* <small>By: {comment.user.name}</small> */}
          </li>
        ))}
      </ul>
      <CommentForm animeId={id} onAddComment={handleAddComment} />

      <h2>Ratings</h2>
      <ul>
        {ratings.map(rating => (
          <li key={rating._id}>
            <p>Score: {rating.score}</p>
            <small>By: {rating.user.name}</small>
          </li>
        ))}
      </ul>
      <RatingForm animeId={id} onAddRating={handleAddRating} />
    </div>
  );
}

export default AnimeDetail;
