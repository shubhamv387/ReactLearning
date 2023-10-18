import React, { useReducer } from "react";
import ShoesContext from "./shoe-context";

const initialShoeState = { shoes: [] };

const shoeReducer = (state, action) => {
  if (action.type === "ADD_NEW_SHOE") {
    const updatedShoes = [...state.shoes, action.shoe];

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

  const shoeContext = {
    shoes: shoeState.shoes,
    addShoe: adShoeHandler,
  };

  return (
    <ShoesContext.Provider value={shoeContext}>
      {props.children}
    </ShoesContext.Provider>
  );
};

export default shoeProvider;
