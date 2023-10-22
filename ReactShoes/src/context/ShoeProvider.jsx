import React, { useReducer } from "react";
import ShoesContext from "./shoe-context";

const initialShoeState = {
  shoes: [
    {
      id: 1,
      name: "Gucci",
      description: "Gucci shoes",
      price: 120,
      largeQty: 5,
      mediumQty: 3,
      smallQty: 2,
    },
    {
      id: 2,
      name: "Bata",
      description: "Bata shoes",
      price: 15,
      largeQty: 100,
      mediumQty: 250,
      smallQty: 50,
    },
  ],
};

const shoeReducer = (state, action) => {
  if (action.type === "ADD_NEW_SHOE") {
    const updatedShoes = [...state.shoes, action.shoe];

    return { shoes: updatedShoes };
  }

  if (action.type === "BUY_SHOE") {
    const existingShoeIndex = state.shoes.findIndex(
      (item) => item.id === action.shoe.id
    );

    const existingShoe = state.shoes[existingShoeIndex];

    let updatedShoe;

    if (action.shoe.qtyType === "largeQty") {
      updatedShoe = {
        ...existingShoe,
        largeQty: existingShoe.largeQty - 1,
      };
    }
    if (action.shoe.qtyType === "mediumQty") {
      updatedShoe = {
        ...existingShoe,
        mediumQty: existingShoe.mediumQty - 1,
      };
    }
    if (action.shoe.qtyType === "smallQty") {
      updatedShoe = {
        ...existingShoe,
        smallQty: existingShoe.smallQty - 1,
      };
    }

    const updatedShoes = [...state.shoes];
    updatedShoes[existingShoeIndex] = updatedShoe;

    return { shoes: updatedShoes };
  }

  return initialShoeState;
};

const shoeProvider = (props) => {
  const [shoeState, dispatchShoeAction] = useReducer(
    shoeReducer,
    initialShoeState
  );

  const adShoeHandler = (shoe) => {
    dispatchShoeAction({ type: "ADD_NEW_SHOE", shoe: shoe });
  };

  const buyShoeHandler = (qtyType, id) => {
    dispatchShoeAction({ type: "BUY_SHOE", shoe: { id, qtyType } });
  };

  const shoeContext = {
    shoes: shoeState.shoes,
    addShoe: adShoeHandler,
    buyShoe: buyShoeHandler,
  };

  return (
    <ShoesContext.Provider value={shoeContext}>
      {props.children}
    </ShoesContext.Provider>
  );
};

export default shoeProvider;
