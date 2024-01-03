import React, { useState, useEffect } from "react";
import classes from "./seats.module.css";
import Seat from "./Seat";
const Seats = (props) => {
    const [seatArrangement, setSeatArrangement] = useState(props.seatArrangement);

  
    const drawGrid = props.seatArrangement?.map((rows, rowIndex) => {
        return (
          <div className={classes.row} key={rowIndex}>
            {rows?.map((seat, colIndex) => {
              return (
                <Seat
                  key={colIndex}
                  row={rowIndex}
                  col={colIndex}  // Include the column index here
                  value={seat}
                  i={colIndex}
                  seats={props.seatArrangement}
                  onSeatClick={props.onSeatClick}
                  setSelectedSeatsCount={props.setSelectedSeatsCount}
                  selectedSeatsCount={props.selectedSeatsCount}
                />
              );
            })}
          </div>
        );
      });
  
  return (
    <div className={classes.container}>
        <h2 className={classes.sectionTitle}>Choose your seat</h2>
        <div className={classes.stadium}>{drawGrid}</div>

    </div>
  );
};

export default Seats;