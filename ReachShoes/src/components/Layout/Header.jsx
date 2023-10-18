import React from "react";
import classes from "./Header.module.css";

import ShoesImg from "../../assets/Shoes.jpg";
import HeaderCartBtn from "./HeaderCartBtn";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactShoes</h1>
        <HeaderCartBtn onShowCart={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={ShoesImg} alt="delicious food" />
      </div>
    </>
  );
};

export default Header;
