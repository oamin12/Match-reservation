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
  let teamImage1;
  let teamImage2;

  async function getHome() {
    try {
      const response = await axios.get(routes.getHome);
      setLoading(false);
      console.log("response", response.data);
      setHomeData(response.data)
      console.log("homeData", homeData);
    } catch (err) { }
  }
  useEffect(() => {
    getHome();
    var teamImage;
    // matchesData.forEach(element => {
    //   teamImage = teamNameImage.filter(function (item) {
    //     return item.team === element.team1;
    //   });
   
  }, []);
  const empty = [];

  return (
    <>
      <div className={classes.container}>
        {homeData?.length > 0? 
          <EventList title={true} events={homeData} />
          :
        <Loader/>
        }
        <Anchor />
      </div>
    </>
  );
};

export default HomePage;
