import classes from './Header.module.css';

import HeaderCartBtn from './HeaderCartBtn';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeds</h1>
        <HeaderCartBtn onShowCart={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img
          src='https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='medicines'
        />
      </div>
    </>
  );
};

export default Header;
