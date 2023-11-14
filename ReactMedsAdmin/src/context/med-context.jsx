import React from 'react';

const MedContext = React.createContext({
  meds: [],
  addMed: (med) => {},
});

export default MedContext;
