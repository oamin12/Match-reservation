import React, { useState, useEffect} from 'react'
import classes from './usercard.module.css'
import PinDropIcon from '@mui/icons-material/PinDrop';
import DateRangeIcon from '@mui/icons-material/DateRange';
import axios from '../../../../requests/axios'
import routes from '../../../../requests/routes'

const UserCard = (props) => {

    function parseDate(date) {
        if (!date)
          return ""
        return new Date(date).toLocaleString().split(",")[0].replaceAll("/", "-")
      }
      function handleSubmit(){
        //send delete request to backend
        async function authorizeUser() {
          try {
              const response = await axios.patch(routes.authorizeUser+props.id, );
              window.location.reload();
    
          } catch (err) {
            return;
          }
      }
        authorizeUser();

    }

  return (
    <div className={classes.containerTicket}>
        <div className={classes.ticketDetails}>
            <div className={classes.eventDetails}>
                <h3>ID: {props.id}</h3>
                <div className={classes.teamsNames}>
                <p >{props.name}</p>
                </div>
            </div>
            <div className={classes.ticketInfo}>
                <p className={classes.location}>Email: {props.email}</p>
            </div>
        </div>
        <div className={classes.ticketButtons}>
            <button className={classes.btn} onClick={handleSubmit}>Accept User</button>
        </div>
    </div>
  )
}

export default UserCard