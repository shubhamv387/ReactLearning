import React from "react";

const ShoesContext = React.createContext({
  shoes: [],
  addShoe: (shoe) => {},
});

export default ShoesContext;
