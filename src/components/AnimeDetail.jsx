import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentForm from "./CommentForm";
import RatingForm from "./RatingForm";

function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);


  // const API_URL = "http://localhost:5005"
  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/anime/${id}`)
      .then((response) => {
        setAnime(response.data);
      })
      .catch((error) => {
        console.error("Error fetching anime details:", error);
      });
  }, [id]);

  const handleAddComment = (newComment) => {
    console.log("New comment to add/update:", newComment); // Debug logging
    setComments((prevComments) => {
      const existingCommentIndex = prevComments.findIndex(
        (comment) => comment._id === newComment._id
      );
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
      const existingRatingIndex = prevRatings.findIndex(
        (rating) => rating._id === newRating._id
      );
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

  if (!anime) return <p className="text-center text-gray-700">Loading...</p>;

  return (
    <div className="relative min-h-screen bg-gray-100 py-12 px-6 lg:px-8 flex flex-col items-center">
      <div className="fixed top-24 left-0 lg:left-8 h-70 lg:mr-8 mb-4 lg:mb-0 mt-12">
        <img src="/zenitsu.png" className="h-full object-cover" alt="Left Image" />
      </div>
      <div className="fixed top-24 right-0 lg:right-8 h-70 lg:ml-8 mb-4 lg:mb-0 mt-12">
        <img src="/naruto.png" className="h-full object-cover" alt="Right Image" />
      </div>
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg z-10">
        <h1 className="text-center text-3xl pb-8 font-bold leading-9 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-600 to-red-700 mb-4">{anime.title}</h1>
        <div className="flex justify-center mb-8 mt-6">
          <img className="w-80 h-80 object-cover rounded-lg shadow-lg" src={anime.picture} alt={anime.title} />
        </div>
        <p className="text-center text-gray-700 mb-8">Episodes: {anime.episodes}</p>

        <div className="mb-8">
          <h2 className="text-center text-3xl pb-8 font-bold leading-9 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-600 to-red-700 mb-4">Comments</h2>
          <ul className="space-y-4 mt-6">
            {comments.map((comment) => (
              <li key={comment._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-gray-700">{comment.content}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <CommentForm animeId={id} onAddComment={handleAddComment} />
          </div>
        </div>

        <div>
          <h2 className="text-center text-3xl pb-8 font-bold leading-9 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-600 to-red-700 mb-4">Ratings</h2>
          <ul className="space-y-4 mt-6">
            {ratings.map((rating) => (
              <li key={rating._id} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-gray-700">Score: {rating.score}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-center">
            <RatingForm animeId={id} onAddRating={handleAddRating} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetail;