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
    console.log("New comment to add/update:", newComment); // Debug logging
    setComments((prevComments) => {
      const existingCommentIndex = prevComments.findIndex(comment => comment._id === newComment._id);
      if (existingCommentIndex !== -1) {
        console.log("Updating existing comment:", newComment); // Debug logging
        const updatedComments = [...prevComments];
        updatedComments[existingCommentIndex] = newComment;
        return updatedComments;
      }
      console.log("Adding new comment:", newComment); // Debug logging
      return [...prevComments, newComment];
    });
  };

  const handleAddRating = (newRating) => {
    console.log("New rating to add/update:", newRating); // Debug logging
    setRatings((prevRatings) => {
      const existingRatingIndex = prevRatings.findIndex(rating => rating._id === newRating._id);
      if (existingRatingIndex !== -1) {
        console.log("Updating existing rating:", newRating); // Debug logging
        const updatedRatings = [...prevRatings];
        updatedRatings[existingRatingIndex] = newRating;
        return updatedRatings;
      }
      console.log("Adding new rating:", newRating); // Debug logging
      return [...prevRatings, newRating];
    });
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
            {/* <small>By: {rating.user.name}</small> */}
          </li>
        ))}
      </ul>
      <RatingForm animeId={id} onAddRating={handleAddRating} />
    </div>
  );
}

export default AnimeDetail;
