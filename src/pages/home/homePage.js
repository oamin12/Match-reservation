import React, { useState, useEffect } from "react";
import classes from "./home.module.css";
import EventList from "../../generic components/Event List/EventList";
import Anchor from "./anchor/anchor";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import Loader from "../../generic components/Loader/Loader";
import matchesData from "../../assets/data/matchesData";
import teamNameImage from "../../assets/data/teamsNameImage";


const HomePage = () => {
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);


  async function getHome() {
    try {
      const response = await axios.get(routes.getHome);
      setHomeData(response.data);
      setLoading(false);
    } catch (err) { }
  }
  useEffect(() => {
    getHome();
    var teamImage;
    // matchesData.forEach(element => {
    //   teamImage = teamNameImage.filter(function (item) {
    //     return item.team === element.team1;
    //   });
      matchesData.forEach(element => {
        console.log("element", teamNameImage[element.team1]);
        element.image1 = teamNameImage[element.team1];
        element.image2 = teamNameImage[element.team2];
      });

  }, []);
  const empty = [];

  return (
    <>
      <div className={classes.container}>
        {matchesData?.length > 0? 
          <EventList title={true} events={matchesData} />
          :
        <Loader/>
        }
        <Anchor />
      </div>
    </>
  );
};

export default HomePage;
