import React from 'react';

const Movie = ({ id, title, genre, language, description, imageUrl, year, genres }) => {
  return (
    <div className="movie-card">
      {imageUrl && <img src={imageUrl} alt={`${title} Poster`} className="movie-poster" />}
      <div className="movie-details">
        <h3>{title}</h3>

        <p>Genre: {genre}</p>
        <p>Language: {language}</p>
        <p>Description: {description}</p>
        <p>Year: {year}</p>
        <p>ID: {id}</p>
      </div>
    </div>
  );
};

export default Movie;
