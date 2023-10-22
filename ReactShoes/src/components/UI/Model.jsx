import React from "react";
import classes from "./Model.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  const closeModelHandler = () => {
    props.onHideCart();
  };

  return <div className={classes.backdrop} onClick={closeModelHandler}></div>;
};

const ModelOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Model = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onHideCart={props.onHideCart} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModelOverlay>{props.children}</ModelOverlay>,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Model;
