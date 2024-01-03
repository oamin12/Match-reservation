import React, { useState, useEffect} from 'react'
import classes from './reservedticket.module.css'
import PinDropIcon from '@mui/icons-material/PinDrop';
import DateRangeIcon from '@mui/icons-material/DateRange';
import axios from '../../../requests/axios'
import routes from '../../../requests/routes'
import Confirm from './ConfirmCard/Confirm';


const ReservedTickets = (props) => {
    const [matchesDetailsData, setMatchesDetailsData] = useState([]);
    const [stadiumName, setStadiumName] = useState("");
    function parseDate(date) {
        if (!date)
          return ""
        return new Date(date).toLocaleString().split(",")[0].replaceAll("/", "-")
      }
      const [modalOpen, setModalOpen] = useState(false);
      const [success, setSuccess] = useState("");
    function handleDelete(){
      setModalOpen(true);
    }
    
    
    function handleSubmit(){
      //send delete request to backend
      async function deleteData() {
        try {
            const response = await axios.delete(routes.deleteReservation+props.reservationID, );
    
        } catch (err) {
            setSuccess("Error deleting user");
          return;
        }
    }
    deleteData();
    
      setSuccess("User deleted successfully");
    }
    useEffect(() => {
        //get match details
          //get stadium name
          async function getStadiumName() {
            try {
            const response = await axios.get(routes.getStadiums + matchesDetailsData.matchVenue);
            //get stadium name only
            console.log("response2", response.data);
            let stadiumNames = response.data.name
            setStadiumName(stadiumNames);
            }
            catch (err) {
            return;
            }
        }
        getStadiumName();
    }
    , [matchesDetailsData])
                

    useEffect(() => {
        //get match details
        async function getMatchDetails() {
            try {
      
              const response = await axios.get(routes.getmatch + props.id);
              console.log("response MAtch", response.data);
              setMatchesDetailsData(response.data);
              console.log("matchesDetailsData", matchesDetailsData);

            }
            catch (err) {
              return;
            }
          }
          getMatchDetails();

        
    }
    , [])

    function handleClick(){
        setModalOpen(true);
        }
    

  return (
    <div className={classes.containerTicket}>
        <div className={classes.ticketDetails}>
            <div className={classes.eventDetails}>
                <h3>ID: {props.id}</h3>
                <div className={classes.teamsNames}>
                <p >{matchesDetailsData.homeTeam}</p>
                <p>VS</p>
                <p>{matchesDetailsData.awayTeam}</p>
                </div>
                <div className={classes.location}>
                    <PinDropIcon /> {stadiumName}
                </div>
                <div className={classes.time}>
                    <DateRangeIcon />
                    {parseDate(matchesDetailsData.dateTime)}
                </div>

            </div>
            <div className={classes.ticketInfo}>
                <p className={classes.location}>Total Price: {props.price}</p>
                <p className={classes.location}>Number of Seats: {props.numberOfSeats}</p>
            </div>
        </div>
        <div className={classes.ticketButtons}>
            <button className={classes.btn} onClick={handleClick}>Cancel Reservation</button>
        </div>
        <Confirm open={modalOpen} setOpen={setModalOpen} handleSubmit={handleSubmit} success={success}/>

    </div>
  )
}

export default ReservedTickets