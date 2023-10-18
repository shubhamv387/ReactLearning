import React from "react";

const ShoesContext = React.createContext({
  shoes: [],
  addShoe: (shoe) => {},
  buyLarge: () => {},
  buyMedium: () => {},
  buySmall: () => {},
});

export default ShoesContext;
