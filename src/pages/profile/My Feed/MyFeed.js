import React, { useState, useEffect} from 'react'
import classes from '../profile.module.css'
import ReservedTickets from './reservedTickets'
import axios from '../../../requests/axios'
import routes from '../../../requests/routes'
import { useSelector } from "react-redux";
import notFound from "../../../assets/imgs/notFound/programs.png";
import Confirm from './ConfirmCard/Confirm'

const MyFeed = (props) => {
  const [tickets, setTickets] = useState([])
  const myUser = useSelector((state) => state.user);
  const id = myUser.id;
  const [matchDate, setMatchDate] = useState()
  const [stadiumName, setStadiumName] = useState("")
  const [matchesDetailsData, setMatchesDetailsData] = useState({});



  useEffect(() => {
    

    async function getTickets() {
      try {
        const response = await axios.get(routes.getUserReservations+id);
        console.log("TICKETS",response.data)
        setTickets(response.data)
        console.log("tickets", tickets);
        //print match id
        console.log("tickets", tickets[0]._id);
      } catch (err) {
        return;
      }
    }
    getTickets();

    


  }, [])


  return (
    <div>
    {tickets?.length!==0 ?
      <section>
        <h2 className={classes.sectionTitle}>Reserved Tickets</h2>
        <div className={classes.ticketsList}>
          {tickets?.map((ticket) => (
            <ReservedTickets reservationID={ticket._id} id={ticket.match} key={ticket._id}  price={ticket.totalPrice} numberOfSeats={ticket.numberOfSeats} date={matchDate} location = {stadiumName} />
          ))}
        </div>
      </section>
      :
      <div className={classes.noevents}>
        <img src={notFound} alt="no feed" />
        <p>You have no reserved tickets yet</p>
      </div>
    }

    </div>
  )
}

export default MyFeed