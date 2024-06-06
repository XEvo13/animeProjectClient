import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

function AnimeList() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    axios.get('https://anime.adaptable.app/api/animes')
      .then(response => {
        console.log(response.data)
        setAnimes(response.data);
      })
      .catch(error => {
        console.error('Error fetching animes:', error);
      });
  }, []);

  return (
    <div>
      <h1>Anime List</h1>
      <ul className="grid grid-cols-4">
  {animes.map(anime => {
    if (anime.picture) {
      return (
        <li key={anime._id}>
          <h2 className="mr-4">{anime.title}</h2>
          <Link to={`/anime/${anime._id}`}>
            <img src={anime.picture} alt={anime.title} width="200" />
          </Link>
        </li>
      );
    }
    return null; 
  })}
</ul>
    </div>
  );
}

export default AnimeList;