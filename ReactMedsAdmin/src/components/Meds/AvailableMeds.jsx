import { useContext } from 'react';
import classes from './AvailableMeds.module.css';
import Card from '../UI/Card';
import MedItem from './MedItem/MedItem';
import MedContext from '../../context/med-context';

const AvailableMeds = () => {
  const medCtx = useContext(MedContext);

  // console.log(medCtx);

  const MedsList = medCtx.meds.map((med) => (
    <MedItem
      key={med.id}
      id={med.id}
      name={med.name}
      price={med.price}
      description={med.description}
    />
  ));

  return (
    <section className={classes.Meds}>
      <Card>
        <ul>{MedsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeds;
