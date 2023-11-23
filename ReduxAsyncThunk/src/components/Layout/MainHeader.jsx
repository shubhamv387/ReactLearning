import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton
              setIsCartShown={props.setIsCartShown}
              isCartShown={props.isCartShown}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
