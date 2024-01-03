import React, { useState, useEffect} from 'react'
import classes from './matchcard.module.css'
import PinDropIcon from '@mui/icons-material/PinDrop';
import DateRangeIcon from '@mui/icons-material/DateRange';

const MatchCard = (props) => {

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
                    <PinDropIcon /> {props.stadium}
                </div>
                <div className={classes.time}>
                    <DateRangeIcon />
                    {parseDate(props.date)}
                </div>

            </div>
        </div>
        <div className={classes.ticketButtons}>
            <button className={classes.btn}>Edit Match</button>
        </div>
    </div>
  )
}

export default MatchCard