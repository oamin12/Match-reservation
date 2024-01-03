import React, { useState, useEffect} from 'react'
import classes from './usercard.module.css'
import PinDropIcon from '@mui/icons-material/PinDrop';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Confirm from './ConfirmCard/Confirm';
import axios from '../../../../requests/axios'
import routes from '../../../../requests/routes'
import { useNavigate } from 'react-router-dom'

const UserCard = (props) => {

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
          const response = await axios.delete(routes.deleteUser+props.id, );
          window.location.reload();

      } catch (err) {
          setSuccess("Error deleting user");
        return;
      }
  }
  deleteData();

    setSuccess("User deleted successfully");
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
            <button className={classes.btn} onClick={handleDelete}>Delete User</button>
        </div>
        <Confirm open={modalOpen} setOpen={setModalOpen} handleSubmit={handleSubmit} success={success}/>

    </div>
  )
}

export default UserCard