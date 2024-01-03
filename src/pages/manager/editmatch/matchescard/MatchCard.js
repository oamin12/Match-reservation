import React, { useState, useEffect} from 'react'
import classes from './matchcard.module.css'
import PinDropIcon from '@mui/icons-material/PinDrop';
import DateRangeIcon from '@mui/icons-material/DateRange';
import axios from '../../../../requests/axios'
import routes from '../../../../requests/routes'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userActions } from '../../../../store/userSlice'
import { useSelector } from 'react-redux'
import Confirm from './ConfirmCard/Confirm';

const MatchCard = (props) => {

    // function parseDate(date) {
    //     if (!date)
    //       return ""
    //     return new Date(date).toLocaleString().split(",")[0].replaceAll("/", "-")
    //   }

      const [modalOpen, setModalOpen] = useState(false);
      const [success, setSuccess] = useState("");
      const [stadiumName, setStadiumName] = useState("");
    function handleEdit(){
      setModalOpen(true);
    }
    function parseDate(date) {
        if (!date)
          return ""
        //change to yyyy-mm-dd format
    
        let dato = new Date(date).toLocaleString().split(",")[0].replaceAll("/", "-")
        const parts = dato.split('-');
        const [day, month, year] = parts;
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
        
    
      }
  
    
    useEffect(() => {
        //get match details
          //get stadium name
          async function getStadiumName() {
            try {
            const response = await axios.get(routes.getStadiums + props.stadium);
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
    , [])

  return (
    <div className={classes.containerTicket}>
        <div className={classes.ticketDetails}>
            <div className={classes.eventDetails}>
                <h3>ID: {props.id}</h3>
                <div className={classes.teamsNames}>
                    <p >{props.team1}</p>
                    <p>VS</p>
                    <p>{props.team2}</p>
                </div>
                <div className={classes.location}>
                    <PinDropIcon /> {stadiumName}
                </div>
                <div className={classes.time}>
                    <DateRangeIcon />
                    {parseDate(props.date)}
                </div>

            </div>
        </div>
        <div className={classes.ticketButtons}>
            <button className={classes.btn} onClick={handleEdit}>Edit Match</button>
        </div>
        <Confirm open={modalOpen} setOpen={setModalOpen} success={success} setSuccess={setSuccess} id={props.id} team1={props.team1} team2={props.team2} stadium={props.stadium} date={parseDate(props.date)} mainreferee={props.mainreferee} firstlinesman={props.firstlinesman} secondlinesman={props.secondlinesman} />
    </div>
  )
}

export default MatchCard