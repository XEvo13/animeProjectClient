import React, { useEffect, useState } from 'react';

import axios from 'axios';

function AnimeList() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5005/api/animes')
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
      <ul>
        {animes.map(anime => (
          <li key={anime._id}>
          
              <h2>{anime.title}</h2>
              <img src={anime.picture} alt={anime.title} width="200" />
           
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimeList;