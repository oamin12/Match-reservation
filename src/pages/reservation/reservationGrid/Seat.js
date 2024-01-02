import React, {useState, useEffect} from 'react'
import classes from "./seats.module.css";

const Seat = (props) => {
  const [isSelected, setSelected] = useState(false);
  const selectSeat = () => {
    if(isSelected===false){
      props.seats[props.row][props.col]=2;
      props.setSelectedSeatsCount(props.selectedSeatsCount+1);
    }
    else{
      props.seats[props.row][props.col]=0;
      props.setSelectedSeatsCount(props.selectedSeatsCount-1);
    }
    setSelected(!isSelected);

    console.log("Seats",props.seats);
  };

  

  return (
    <div >
      {props.value===1? <><div className={classes.sold}></div></>:<><div className={isSelected? classes.selected:classes.seat} onClick={selectSeat}></div></>}
    </div>
  );
};

export default Seat;