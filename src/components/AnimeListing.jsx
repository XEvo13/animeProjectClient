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
    <div className="min-h-screen bg-gray-100 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 mb-8">Anime List</h1>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {animes.map(anime => {
            if (anime.picture) {
              return (
                <li
                  key={anime._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                  <Link to={`/anime/${anime._id}`} className="block h-full">
                    <img src={anime.picture} alt={anime.title} className="w-full h-48 object-cover" />
                    <h2 className="p-4 text-center text-lg font-semibold text-gray-900 truncate">{anime.title}</h2>
                  </Link>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
}

export default AnimeList;