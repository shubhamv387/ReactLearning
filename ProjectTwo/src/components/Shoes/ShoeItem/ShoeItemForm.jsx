import React, { useRef, useState } from "react";
import classes from "./ShoeItemForm.module.css";
import Input from "../../UI/Input";

const ShoeItemForm = (props) => {
  const amountInputRef = useRef();

  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    amountInputRef.current.value = "1";
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          type: "number",
          id: "amount",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1 - 5)</p>}
    </form>
  );
};

export default ShoeItemForm;
