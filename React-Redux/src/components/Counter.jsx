import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/counterSlice';

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);
  const dispatch = useDispatch();

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button
          onClick={() => dispatch(counterActions.increment(1))}
          type='button'
        >
          INCREMENT
        </button>

        <button
          onClick={() => dispatch(counterActions.decrement(1))}
          type='button'
        >
          DECREMENT
        </button>

        <button
          onClick={() => dispatch(counterActions.increment(5))}
          type='button'
        >
          INCREMENT BY 5
        </button>

        <button
          onClick={() => dispatch(counterActions.decrement(5))}
          type='button'
        >
          DECREMENT BY 5
        </button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
