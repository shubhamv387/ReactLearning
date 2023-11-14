import { useEffect, useReducer } from 'react';
import MedContext from './med-context';
import { addNewMed, getMeds } from '../services/medServices';

const initialMedState = {
  meds: [],
  addMed: (med) => {},
};

const medReducer = (state, action) => {
  // console.log(action.meds);
  if (action.type === 'GET_MEDS') {
    return [...action.meds];
  }

  if (action.type === 'ADD_NEW_MED') {
    // console.log(state);
    const updatedMeds = state.concat(action.med);
    return updatedMeds;
  }

  return initialMedState;
};

const MedsProvider = (props) => {
  const [medState, dispatchMedAction] = useReducer(medReducer, initialMedState);

  const adMedHandler = async (med) => {
    const addedMed = await addNewMed(med);
    dispatchMedAction({ type: 'ADD_NEW_MED', med: addedMed });
  };

  useEffect(() => {
    getMeds()
      .then((data) => {
        // console.log(data);
        dispatchMedAction({ type: 'GET_MEDS', meds: data });
      })
      .catch((err) => console.log(err.message));
  }, []);

  const medContext = {
    meds: medState,
    addMed: adMedHandler,
  };

  return (
    <MedContext.Provider value={medContext}>
      {props.children}
    </MedContext.Provider>
  );
};

export default MedsProvider;
