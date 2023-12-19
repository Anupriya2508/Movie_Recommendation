// Movies.js (Movies component)
import React, { useState, useEffect } from 'react';
import Movie from './Movie';

const Movies = ({ searchTerm, showNewMovies }) => {
  const [moviesData, setMoviesData] = useState([]);
  const [genres, setGenres] = useState({});
  const [languages, setLanguages] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'a0b56b4ad39a82fb7f92c8cd8da6713a';

        // Fetch movie genres
        const genresResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );

        if (!genresResponse.ok) {
          throw new Error('Failed to fetch movie genres');
        }

        const genresData = await genresResponse.json();
        const genresMap = genresData.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        setGenres(genresMap);

        // Fetch movie languages
        const languagesResponse = await fetch(
          `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`
        );

        if (!languagesResponse.ok) {
          throw new Error('Failed to fetch movie languages');
        }

        const languagesData = await languagesResponse.json();
        const languagesMap = languagesData.reduce((acc, lang) => {
          acc[lang.iso_639_1] = lang.english_name;
          return acc;
        }, {});

        setLanguages(languagesMap);

        // Fetch movies based on the selected category
        const category = showNewMovies ? 'upcoming' : 'popular';
        const moviesResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!moviesResponse.ok) {
          throw new Error(`Failed to fetch ${category} movies`);
        }

        const moviesData = await moviesResponse.json();
        setMoviesData(moviesData.results);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchMovies();
  }, [showNewMovies]);

  const filteredMovies = moviesData.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      genres[movie.genre_ids[0]].toLowerCase().includes(searchTerm.toLowerCase()) ||
      languages[movie.original_language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.release_date.includes(searchTerm)
  );

  return (
    <div className="movies-container">
      {filteredMovies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          genre={genres[movie.genre_ids[0]]}
          language={languages[movie.original_language]}
          description={movie.overview}
          imageUrl={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          year={new Date(movie.release_date).getFullYear()}
        />
      ))}
    </div>
  );
};

export default Movies;
