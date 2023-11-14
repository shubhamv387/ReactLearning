import { useContext, useRef } from 'react';
import classes from './AddNewMed.module.css';
import Card from '../../UI/Card';
import Input from '../../UI/Input';
import MedsContext from '../../../context/med-context';

const AddNewMed = () => {
  const medCtx = useContext(MedsContext);

  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const descInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const name = nameInputRef.current.value.trim();
    const price = priceInputRef.current.value.trim();
    const description = descInputRef.current.value.trim();

    const medData = {
      id: Date.now().toString(),
      name,
      price: +price,
      description,
    };

    medCtx.addMed(medData);

    nameInputRef.current.value = '';
    priceInputRef.current.value = '';
    descInputRef.current.value = '';
  };
  return (
    <section className={classes['add-new-med']} onSubmit={submitHandler}>
      <Card>
        <form className={classes.form}>
          <Input
            ref={nameInputRef}
            label='Medicine Name'
            input={{ id: 'name', type: 'text', required: true }}
          />
          <Input
            ref={descInputRef}
            label='Description'
            input={{ id: 'desc', type: 'text' }}
          />
          <Input
            ref={priceInputRef}
            label='Price'
            input={{ id: 'price', type: 'text', required: true }}
          />
          <button type='submit'>Add Medicine</button>
        </form>
      </Card>
    </section>
  );
};

export default AddNewMed;
