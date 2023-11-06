import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const fetchMoviesHandler = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setRetrying(false);
      const response = await fetch('https://swapi.dev/api/films');

      if (!response.ok) {
        setRetrying(true);
        throw new Error('Something went wrong! ....Retrying');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movie) => ({
        id: movie.episode_id,
        title: movie.title,
        releaseDate: movie.release_date,
        openingText: movie.opening_crawl,
      }));

      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId;

    if (retrying)
      timeoutId = setTimeout(() => {
        fetchMoviesHandler();
      }, 5000);

    return () => clearTimeout(timeoutId);
  }, [retrying]);

  let content = <p>No Movies Found!</p>;

  if (movies.length > 0) content = <MoviesList movies={movies} />;

  if (error)
    content = (
      <p>
        Something went wrong{' '}
        <span style={{ fontWeight: 'bold' }}>...Retrying</span>
      </p>
    );

  if (error && !retrying) content = <p>Something went wrong!</p>;

  if (isLoading) content = <p>Loading Movies...</p>;

  const stopFetchingHandler = () => setRetrying(false);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}

        {retrying && (
          <button onClick={stopFetchingHandler}>Stop Fetching</button>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
