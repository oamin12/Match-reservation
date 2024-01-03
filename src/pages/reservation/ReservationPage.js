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
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import teamNameImage from "../../assets/data/teamsNameImage";



const ReservationPage = () => {

  const myUser = useSelector((state) => state.user);
  const Userid = myUser.id;
  const logged = myUser.loggedIn;
  const [user, setUser] = useState({});
  //get match id from url
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  
  const [teams, setTeams] = useState([]);
  const [images, setImages] = useState([]);
  const [seatArrangement, setSeatArrangement] = useState();
  const [selectedSeatsCount, setSelectedSeatsCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [matchesDetailsData, setMatchesDetailsData] = useState({});
  const [stadiumName, setStadiumName] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [price, setPrice] = useState(0);
  const [matchLinesMen, setMatchLinesMen] = useState(["t", "t"]);

  async function getMatchDetails() {
    try {
      setIsLoading(true);
      const response = await axios.get(routes.getmatch + id);
      setMatchesDetailsData(response.data);
      console.log("matchesDetailsData", matchesDetailsData);
      setTeams([response.data.homeTeam, response.data.awayTeam]);
      setImages([teamNameImage[response.data.homeTeam], teamNameImage[response.data.awayTeam]]);

      //get stadium name
      const response2 = await axios.get(routes.getStadiums + response.data.matchVenue);
      //get stadium name only
      console.log("response2", response2.data);
      let stadiumNames = response2.data.name
      setStadiumName(stadiumNames);

      //get match date
      let matchDate = response.data.dateTime
      //convert data to dd-mm-yyyy format
      matchDate = new Date(matchDate).toLocaleString().split(",")[0].replaceAll("/", "-")
      setMatchDate(matchDate);
      //get time only
      let matchTime = response.data.dateTime
      matchTime = new Date(matchTime).toLocaleString().split(",")[1]
      setMatchTime(matchTime);

      //set seatArrangement
      let seatArrangement = response.data.layout
      console.log("seatArrangement", seatArrangement);
      setSeatArrangement(seatArrangement);
      
      //set price
      let price = response.data.price
      setPrice(price);

      //set linesmen
      let linesmen = response.data.linesmen
      setMatchLinesMen(linesmen);




      setIsLoading(false);
      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    console.log("MATCHID",id)

    getMatchDetails();
  }, []);
  const handleSeatClick = (row, col, sentValue) => {
    // Toggle seat reservation status
    const newSeatArray = [...seatArrangement];
    newSeatArray[row][col] = newSeatArray[row][col] === 0 ? 1 : 0;
    setSeatArrangement(newSeatArray);
    console.log("newSeatArray", seatArrangement);
  };

  function handleReserveClick(){

    //check on logged in
    if(!logged){
      alert("You must be logged in to reserve a ticket");
      return;
    }

    if(myUser.userType==="fan"){
      setModalOpen(true);
    }
    else{
      alert("You must be a fan to reserve a ticket");
    }
    console.log("reserve clicked");
    
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
    async function sendSeats() {
      try {
        const response = await axios.post(routes.addReservation, {
          "match": id,
          "paymentStatus": 1,
          "totalPrice": price,
          "layout": seatArrangement,
          "numberOfSeats": selectedSeatsCount,
        });
        console.log("response", response.data);
      } catch (err) { }
    }
    sendSeats();

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
                <p>{stadiumName}</p>
                <p>{matchesDetailsData.location}</p>
            </div>
            <div className={classes.time}>
                <p>Date</p>
                <p>{matchDate}</p>
                <p>{matchTime}</p>
            </div>
            <div className={classes.referees}>
                <p>Main Referee: {matchesDetailsData?.mainReferee}</p>
                <p>First Lineman: {matchLinesMen[0]}</p>
                <p>Second Lineman: {matchLinesMen[1]}</p>
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