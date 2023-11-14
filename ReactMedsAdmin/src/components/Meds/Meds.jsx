import { useContext } from 'react';
import AvailableMeds from './AvailableMeds';
import AddNewMed from './MedItem/AddNewMed';
import MedContext from '../../context/med-context';

const Meds = () => {
  const medCtx = useContext(MedContext);
  // console.log(medCtx);

  return (
    <>
      <AddNewMed />
      {medCtx.meds.length > 0 ? <AvailableMeds /> : <></>}
    </>
  );
};

export default Meds;
