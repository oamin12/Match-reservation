import React from "react";
import { useState, useEffect } from "react";
import EventCard from "../event card/EventCard";
import classes from "./eventList.module.css";
// import axios from "../../requests/axios";
// import routes from "../../requests/routes";
// import moment from "moment";
// import eventsData from "../../assets/data/eventsData";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import notFound from "../../assets/imgs/notFound/programs.png";


const EventList = (props) => {
  // const [Eventcards, SetEventcards] = useState([0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  const Eventcards = props.events;
  const Matchcards = props.events;

  return (
    <div>
      <div className={classes.secheader}>
        {props.title && <h3>Matches</h3>}

      </div>
      <div className={classes.list}>
        {Eventcards?.length === 0 ? (
          <div className={classes.noevents}>
            <img src={notFound} />
            <p>No Matches Available</p>
          </div>
        ) : (
          <AliceCarousel
            className={classes.carousel}
            mouseTracking items={Eventcards?.map((card) => (
              <EventCard
                id={card.id}
                key={card.id}
                img={card.image}
                image1={card.image1}
                image2={card.image2}
                team1={card.team1}
                team2={card.team2}
                date={card.date}
                duration={card.duration}
                location={card.location}
                type={card.type}
              />
            ))}
            responsive={{
              0: {
                items: 1,
                itemsFit: 'fill'
              },
              1024: {
                items: 3,
                itemsFit: 'fill',
              }
            }}
            renderDotsItem={(e) => { return <div className={e.isActive ? classes.carouselIndexBtnActive : classes.carouselIndexBtn}></div> }}
            renderPrevButton={(e) => { return <ArrowBackIosNewIcon style={{ fontSize: "20" }} className={e.isDisabled ? classes.carouseLBtnDis : classes.carouseLBtn} /> }}
            renderNextButton={(e) => { return <ArrowForwardIosIcon style={{ fontSize: "20" }} className={e.isDisabled ? classes.carouselRtnDis : classes.carouselRBtn} /> }}
          />
        )}
      </div>
      {!loading && Eventcards.length != 0 && (
        <div className={classes.moreBtn}>
          <button type="button">See more</button>
        </div>
      )}
    </div>
  );
};

export default EventList;
