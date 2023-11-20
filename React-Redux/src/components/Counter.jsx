import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={() => dispatch({ type: 'increment' })} type='button'>
          INCREMENT
        </button>
        <button onClick={() => dispatch({ type: 'decrement' })} type='button'>
          DECREMENT
        </button>
        <button
          onClick={() => dispatch({ type: 'incrementBy2' })}
          type='button'
        >
          INCREMENT BY 2
        </button>
        <button
          onClick={() => dispatch({ type: 'decrementBy2' })}
          type='button'
        >
          DECREMENT BY 2
        </button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
