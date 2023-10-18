import React, { useContext } from "react";
import AvailableShoes from "./AvailableShoes";
import AddNewShoe from "./ShoeItem/AddNewShoe";
import ShoesContext from "../../context/shoe-context";

const Shoes = () => {
  const shoeCtx = useContext(ShoesContext);

  return (
    <>
      <AddNewShoe />
      {shoeCtx.shoes.length > 0 ? <AvailableShoes /> : <></>}
    </>
  );
};

export default Shoes;
