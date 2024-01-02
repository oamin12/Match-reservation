import React, { useState, useEffect} from 'react'
import classes from '../profile.module.css'
import ReservedTickets from './reservedTickets'

const MyFeed = (props) => {
  const [tickets, setTickets] = useState({})

  useEffect(() => {
    var ticket = {
      id: "1",
      team1: "Al Ahly",
      team2: "AL Mokawloon",
      location: "Cairo International Stadium",
      date: "2023-12-12",
      price: "400",
      numberOfSeats: "4"
    } 
    setTickets(ticket)
  }, [])


  return (
    <div>
    {props.tickets?.length!==0 &&
      <section>
        <h2 className={classes.sectionTitle}>Reserved Tickets</h2>
        <div className={classes.ticketsList}>
          <ReservedTickets id={tickets.id} team1={ tickets.team1} team2={ tickets.team2} location={ tickets.location} date={ tickets.date} price={ tickets.price} numberOfSeats={ tickets.numberOfSeats}/>
          <ReservedTickets id={tickets.id} team1={ tickets.team1} team2={ tickets.team2} location={ tickets.location} date={ tickets.date} price={ tickets.price} numberOfSeats={ tickets.numberOfSeats}/>

        </div>
      </section>
    }
    
    </div>
  )
}

export default MyFeed