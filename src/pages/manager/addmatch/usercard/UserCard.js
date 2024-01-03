import React, { useState, useEffect} from 'react'
import classes from './usercard.module.css'
import PinDropIcon from '@mui/icons-material/PinDrop';
import DateRangeIcon from '@mui/icons-material/DateRange';

const UserCard = (props) => {

    function parseDate(date) {
        if (!date)
          return ""
        return new Date(date).toLocaleString().split(",")[0].replaceAll("/", "-")
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
            <button className={classes.btn}>Accept User</button>
        </div>
    </div>
  )
}

export default UserCard