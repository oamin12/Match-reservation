import classes from "./bullet.module.css";
import React from "react";

const Bullet = (props) => {
  return (
    <div className={classes.container} style={{width:`${props.width}`}}>
        <h4 className={classes.msg}>
          {props.info}
        </h4>
    </div>
  );
};

export default Bullet;
