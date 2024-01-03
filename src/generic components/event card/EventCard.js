import classes from "./eventCard.module.css";
import React, { useEffect, useState } from "react";
import PinDropIcon from '@mui/icons-material/PinDrop';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Link } from "react-router-dom";
import { Skeleton } from 'antd';
import axios from "../../requests/axios";
import routes from "../../requests/routes";


const EventCard = (props) => {
  const [wishList, setWishlist] = useState(props.wishlist)
  const [newCard, setNewCard] = useState(props.location==="Zanzibar")
  const [review, setReview] = useState(props.review)
  const [open, setOpen] = React.useState(false);
  const [stadium, setStadium] = useState("");
  

  function parseDate(date) {
    if (!date)
      return ""
    return new Date(date).toLocaleString().split(",")[0].replaceAll("/", "-")
  }
  useEffect(() => {
    console.log("IM HERE")
    //get stadium name from id
    async function getStadium() {
      try {

        const response = await axios.get(routes.getStadiums + props.location);
        //get stadium name only
        let stadiumNames = response.data.name
        setStadium(stadiumNames);
      } catch (err) {}
    }
    getStadium();
  }
  , []);

  async function addToWishlistFun() {
    try {
      await axios.patch(routes.addToWishlist,{"progId":props.id})
    } catch (err) {}
  }
  async function removeFromWishlistFun() {
    try {
      await axios.delete(routes.removeFromWishlist,{data:{'progId':props.id}})
      window.location.reload()
    } catch (err) {}
  }

  const addToWishlist = () => {
    if(!wishList){
      addToWishlistFun()
    }
    else{
      removeFromWishlistFun()
    }
    setWishlist(!wishList)
  }

  return (
    <div className={classes.card}>
      {props.load ?
        <div className={classes.imgSkeleton}>
          <Skeleton.Avatar shape={"square"} size={100} active />;
        </div> :
        <div className={classes.cardImageTeams}>
          
          <img src={props.image1} alt="team1 logo" />
          <p className={classes.teamVs}> VS </p>
          <img src={props.image2} alt="team2 logo" />

        </div>}
      {props.load ?
        <div className={classes.txtSkeleton}>
          <Skeleton active />
        </div> :
        <ul className={classes.cardContent}>
          <div className={classes.teamsNames}>
            <p >{props.team1}</p>
            <p>{props.team2}</p>
          </div>
          <div className={classes.location}>
            <PinDropIcon /> {stadium}
          </div>
          <div className={classes.time}>
            <DateRangeIcon />
            {parseDate(props.date)}
          </div>

          <div className={classes.location}><b>{props.type}</b></div>

          <Link to={`/reserve/${props.id}`}>
            <button className={classes.btn}>{"Buy Tickets"}</button>
          </Link>
        </ul>
      }
    </div>
  );
};

export default EventCard;


