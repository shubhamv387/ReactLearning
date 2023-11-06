import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films');
    const data = await response.json();

    const transformedMovies = data.results.map((movie) => ({
      id: movie.episode_id,
      title: movie.title,
      releaseDate: movie.release_date,
      openingText: movie.opening_crawl,
    }));

    setMovies(transformedMovies);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? (
          <p>Loading Movies...</p>
        ) : movies.length > 0 ? (
          <MoviesList movies={movies} />
        ) : (
          <p>No Movies Found!</p>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
