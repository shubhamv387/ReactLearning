import React, { useContext, useRef } from "react";
import classes from "./AddNewShoe.module.css";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import ShoesContext from "../../../context/shoe-context";

const AddNewShoe = () => {
  const shoeCtx = useContext(ShoesContext);

  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const descInputRef = useRef();
  const largeQtyInputRef = useRef();
  const mediumQtyInputRef = useRef();
  const smallQtyInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const name = nameInputRef.current.value.trim();
    const price = priceInputRef.current.value.trim();
    const description = descInputRef.current.value.trim();
    const largeQty = largeQtyInputRef.current.value.trim();
    const mediumQty = mediumQtyInputRef.current.value.trim();
    const smallQty = smallQtyInputRef.current.value.trim();

    const shoeData = {
      id: Date.now(),
      name,
      price: +price,
      description,
      largeQty: +largeQty,
      mediumQty: +mediumQty,
      smallQty: +smallQty,
    };

    shoeCtx.addShoe(shoeData);

    nameInputRef.current.value = "";
    priceInputRef.current.value = "";
    descInputRef.current.value = "";
    largeQtyInputRef.current.value = "";
    mediumQtyInputRef.current.value = "";
    smallQtyInputRef.current.value = "";
  };
  return (
    <section className={classes["add-new-shoe"]} onSubmit={submitHandler}>
      <Card>
        <form className={classes.form}>
          <Input
            ref={nameInputRef}
            label="Shoe Name"
            input={{ id: "name", type: "text", required: true }}
          />
          <Input
            ref={descInputRef}
            label="Description"
            input={{ id: "desc", type: "text" }}
          />
          <Input
            ref={priceInputRef}
            label="Price"
            input={{ id: "price", type: "text", required: true }}
          />
          <h3>Quantity Available</h3>
          <Input
            ref={largeQtyInputRef}
            label="L"
            input={{ id: "large", type: "number", required: true, min: 0 }}
          />
          <Input
            ref={mediumQtyInputRef}
            label="M"
            input={{ id: "medium", type: "number", required: true, min: 0 }}
          />
          <Input
            ref={smallQtyInputRef}
            label="S"
            input={{ id: "small", type: "number", required: true, min: 0 }}
          />
          <button type="submit">Add Shoe</button>
        </form>
      </Card>
    </section>
  );
};

export default AddNewShoe;
