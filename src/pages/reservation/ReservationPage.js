import React, { useState, useEffect } from "react";
import classes from "./reservation.module.css";
import EventList from "../../generic components/Event List/EventList";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import PinDropIcon from '@mui/icons-material/PinDrop';

import Loader from "../../layouts/loader/Loader";
import matchesDetailsData from "../../assets/data/matchDetailsData";
import Seats from "./reservationGrid/Seats";
import CreditCard from "./creditCard/CreditCard";

const ReservationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const [teams, setTeams] = useState([matchesDetailsData.team1, matchesDetailsData.team2]);
  const [images, setImages] = useState([matchesDetailsData.image1, matchesDetailsData.image2]);
  const [seatArrangement, setSeatArrangement] = useState(matchesDetailsData.seatsArray);
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState("");

  async function getPrograms() {
    try {
      setIsLoading(false);
      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getPrograms();
  }, []);
  const handleSeatClick = (row, col, sentValue) => {
    // Toggle seat reservation status
    const newSeatArray = [...seatArrangement];
    newSeatArray[row][col] = newSeatArray[row][col] === 0 ? 1 : 0;
    setSeatArrangement(newSeatArray);
    console.log("newSeatArray", seatArrangement);
  };

  function handleReserveClick(){
    console.log("reserve clicked");
    setModalOpen(true);
  }
  function handleSubmitSelectedSeats(){
    for(var i=0; i<seatArrangement.length; i++){
      for(var j=0; j<seatArrangement[i].length; j++){
        if(seatArrangement[i][j]===2){
          seatArrangement[i][j]=1;
        }
      }
    }
    console.log("newSeatArray", seatArrangement);
    //send seatArrangement to backend

    setSuccess("Your seats have been reserved successfully");
  }

  return (
    <div className={classes.container}>
      {
        <>
          <h1 className={classes.pageHeader}>Buy Tickets</h1>
          
          <h2 className={classes.sectionTitle}>
            <div className={classes.teamsNames}>
              <img src={images[0]} alt="team1 logo" />
              <p>{teams[0]}</p>
              <p>VS</p>
              <p>{teams[1]}</p>
              <img src={images[1]} alt="team2 logo" />
            </div>
          </h2>

        

          <div className={classes.details}>
            <div className={classes.location}>
                <PinDropIcon/>
                <p>Location</p>
                <p>{matchesDetailsData.location}</p>
            </div>
            <div className={classes.time}>
                <p>Date</p>
                <p>{matchesDetailsData.date}</p>
                <p>{matchesDetailsData.time}</p>
            </div>
            <div className={classes.referees}>
                <p>Main Referee: {matchesDetailsData.mainReferee}</p>
                <p>First Lineman: {matchesDetailsData.firstLinesman}</p>
                <p>Second Lineman: {matchesDetailsData.secondLinesman}</p>
            </div>
            
            <Seats seatArrangement={seatArrangement} setSeatArrangement={setSeatArrangement } setSelectedSeatsCount={setSelectedSeatsCount} selectedSeatsCount={selectedSeatsCount} onSeatClick={handleSeatClick} />
            <div className={classes.price}>
                <p>Total Price: {selectedSeatsCount*matchesDetailsData.price} EGP</p>
            </div>
            <button className={classes.reserveBtn} onClick={handleReserveClick}>Reserve</button>
          </div>
          <CreditCard open={modalOpen} setOpen={setModalOpen} selectedSeatsCount={selectedSeatsCount} price={selectedSeatsCount*matchesDetailsData.price} handleSubmitSelectedSeats={handleSubmitSelectedSeats} success={success}/>
        </>
      }
    </div>
  );
};

export default ReservationPage;