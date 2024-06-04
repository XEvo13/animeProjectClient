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
        console.log(response.data); // Inspect the structure here
        setAnime(response.data);
      })
      .catch(error => {
        console.error('Error fetching anime details:', error);
      });

    axios.get(`http://localhost:5005/api/${id}/comments`)
      .then(response => {
        console.log(response.data); // Inspect the structure here
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });

    axios.get(`http://localhost:5005/api/${id}/ratings`)
      .then(response => {
        console.log(response.data); // Inspect the structure here
        setRatings(response.data);
      })
      .catch(error => {
        console.error('Error fetching ratings:', error);
      });
  }, [id]);

  /* const handleAddRating = (newRating) => {
    setRatings([...ratings, newRating]);
  }; */

  // const handleAddComment = (newComment) => {
  //   setComments([...comments, newComment]);
  // };

  if (!anime) return <p>Loading...</p>;

  return (
    <div>
      <h1>{anime.title}</h1>
      <img src={anime.picture} alt={anime.title} width="200" />
      <p>Episodes: {anime.episodes}</p>

      <h2>Comments</h2>
      {/* <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <p>{comment.content}</p>
            <small>By: {comment.user.name}</small>
          </li>
        ))}
      </ul> */}
      <CommentForm animeId={id} />
      <h2>Ratings</h2>
      <RatingForm animeId={id} />
    </div>
  );
}

export default AnimeDetail;