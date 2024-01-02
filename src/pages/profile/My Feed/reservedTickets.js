import React, { useState, useEffect} from 'react'
import classes from './reservedticket.module.css'
import PinDropIcon from '@mui/icons-material/PinDrop';
import DateRangeIcon from '@mui/icons-material/DateRange';

const ReservedTickets = (props) => {

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
                <p >{props.team1}</p>
                <p>VS</p>
                <p>{props.team2}</p>
                </div>
                <div className={classes.location}>
                    <PinDropIcon /> {props.location}
                </div>
                <div className={classes.time}>
                    <DateRangeIcon />
                    {parseDate(props.date)}
                </div>

            </div>
            <div className={classes.ticketInfo}>
                <p className={classes.location}>Total Price: {props.price}</p>
                <p className={classes.location}>Number of Seats: {props.numberOfSeats}</p>
            </div>
        </div>
        <div className={classes.ticketButtons}>
            <button className={classes.btn}>Cancel Reservation</button>
        </div>
    </div>
  )
}

export default ReservedTickets