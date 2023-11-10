import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button
        onClick={() => props.onDeleteMovie(props.id)}
        style={{ background: '#fff', color: '#000' }}
      >
        Delete
      </button>
    </li>
  );
};

export default Movie;
