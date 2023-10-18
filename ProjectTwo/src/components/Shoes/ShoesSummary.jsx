import React from "react";
import classes from "./ShoesSummary.module.css";

const ShoesSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite Shoe from our broad selection of available Shoes
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our Shoes are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default ShoesSummary;
