import React, { useContext } from "react";
import classes from "./AvailableShoes.module.css";
import Card from "../UI/Card";
import ShoeItem from "./ShoeItem/ShoeItem";
import ShoesContext from "../../context/shoe-context";

const AvailableMeaks = () => {
  const shoeCtx = useContext(ShoesContext);

  const ShoesList = shoeCtx.shoes.map((Shoe) => (
    <ShoeItem
      key={Shoe.id}
      id={Shoe.id}
      name={Shoe.name}
      price={Shoe.price}
      description={Shoe.description}
      largeQty={Shoe.largeQty}
      mediumQty={Shoe.mediumQty}
      smallQty={Shoe.smallQty}
    />
  ));

  return (
    <section className={classes.Shoes}>
      <Card>
        <ul>{ShoesList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeaks;
