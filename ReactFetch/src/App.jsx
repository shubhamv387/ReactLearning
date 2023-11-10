import React, { useEffect, useState, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setRetrying(false);
      const response = await fetch(
        'https://react-http-4c3ab-default-rtdb.firebaseio.com/movies.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      let loadedMovies = [];

      for (const [key, value] of Object.entries(data)) {
        loadedMovies.push({ id: key, ...value });
      }

      setMovies(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setRetrying(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  useEffect(() => {
    let timeoutId;

    if (retrying)
      timeoutId = setTimeout(() => {
        fetchMoviesHandler();
      }, 3000);

    return () => clearTimeout(timeoutId);
  }, [retrying]);

  async function addMovieHandler(movie) {
    try {
      const response = await fetch(
        'https://react-http-4c3ab-default-rtdb.firebaseio.com/movies.json',
        {
          method: 'POST',
          body: JSON.stringify(movie),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteMovieHandler(id) {
    try {
      const response = await fetch(
        `https://react-http-4c3ab-default-rtdb.firebaseio.com/movies/${id}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  let content = <p>No Movies Found!</p>;

  if (movies.length > 0)
    content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />;

  if (error)
    content = (
      <p>
        Something went wrong{' '}
        <span style={{ fontWeight: 'bold' }}>...Retrying</span>
      </p>
    );

  if (error && !retrying) content = <p>{error}</p>;

  if (isLoading) content = <p>Loading Movies...</p>;

  const stopFetchingHandler = () => setRetrying(false);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>

      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movie</button>
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
