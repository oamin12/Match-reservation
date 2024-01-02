import {React, useState, useEffect} from 'react';
import classes from "./MainBlogsCard.module.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
const MainBlogCard = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/blogs/"+props.id)
  }
    
  return (
    <div onClick={handleClick} className={classes.card}>
      <div className={classes.cardImage}>
        <img src={props.image} alt={props.title} />
      </div>
      <div className={classes.cardContent}>
        <div className={classes.titleContainer}></div>
        <h2 className={classes.cardTitle}>{props.title}</h2>
        <p className={classes.cardText}>{props.content}</p>
        <p className={classes.cardpublishdate}>{props.date}</p>
        <div className={classes.cardBottom}>
          <p className={classes.cardAuthor}>By {props.author}</p>
          <div className={classes.cardButton}>
            <button className={classes.cardReadMore}>View More</button>
            <ArrowForwardIcon className={classes.cardButtonIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBlogCard;
