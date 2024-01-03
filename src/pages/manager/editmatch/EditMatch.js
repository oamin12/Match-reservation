import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import classes from "./editmatch.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MatchCard from "./matchescard/MatchCard";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import { useNavigate } from "react-router-dom";

const EditMatch = () => {
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [stadiumName, setStadiumName] = useState("");
  const [linesMen, setLinesMen] = useState(["t","t"]);
  // team1: "Al Ahly",
  // team2: "Ismaily",
  // stadium: "Al Ahly Stadium",
  // date: "",
  // mainreferee: "",
  // firstlinesman: "",
  // secondlinesman: "",

  const matchesData = [
    {
      id: 1,
      team1: "Al Ahly",
      team2: "AL Mokawloon",
      stadium: "Cairo International Stadium",
      date: "2023-12-12",
      mainreferee: "Ahmed Mohamed",
      firstlinesman: "Mohamed Ahmed",
      secondlinesman: "Ali Ahmed",
    },
    {
      id: 2,
      team1: "Al Ahly",
      team2: "AL Mokawloon",
      stadium: "Cairo International Stadium",
      date: "2023-12-12",
      mainreferee: "Ahmed Mohamed",
      firstlinesman: "Mohamed Ahmed",
      secondlinesman: "Ali Ahmed",
    },
    {
      id: 3,
      team1: "Al Ahly",
      team2: "AL Mokawloon",
      stadium: "Cairo International Stadium",
      date: "2023-12-12",
      mainreferee: "Ahmed Mohamed",
      firstlinesman: "Mohamed Ahmed",
      secondlinesman: "Ali Ahmed",
    },
    {
      id: 4,
      team1: "Al Ahly",
      team2: "AL Mokawloon",
      stadium: "Cairo International Stadium",
      date: "2023-12-12",
      mainreferee: "Ahmed Mohamed",
      firstlinesman: "Mohamed Ahmed",
      secondlinesman: "Ali Ahmed",
    },
    {
      id: 5,
      team1: "Al Ahly",
      team2: "AL Mokawloon",
      stadium: "Cairo International Stadium",
      date: "2023-12-12",
      mainreferee: "Ahmed Mohamed",
      firstlinesman: "Mohamed Ahmed",
      secondlinesman: "Ali Ahmed",
    },
    {
      id: 6,
      team1: "Al Ahly",
      team2: "AL Mokawloon",
      stadium: "Cairo International Stadium",
      date: "2023-12-12",
      mainreferee: "Ahmed Mohamed",
      firstlinesman: "Mohamed Ahmed",
      secondlinesman: "Ali Ahmed",
    },

    
    
  ];

  
  useEffect(() => {
    //get all matches
    async function getMatches() {
      try {
        const response = await axios.get(routes.getAllMatches);
        console.log("response", response.data);
        setMatches(response.data);
      } catch (err) {
        return;
      }
    }
    getMatches();

    //set linesmen
    if (matches?.linesMen) {
      let linesmen = matches.linesMen
      setLinesMen(linesmen);
    }


      
    }, [])
  

  return (
    <>
      <div className={classes.container}>
        <h1>Edit Match</h1>
        <div className={classes.userslist}>
          {matches?.map((match)=>{
              return (
                <MatchCard
                  key={match._id}
                  id={match._id}
                  team1={match.homeTeam}
                  team2={match.awayTeam}
                  stadium={match.matchVenue}
                  date={match.dateTime}
                  mainreferee={match.mainReferee}
                  firstlinesman={linesMen[0]}
                  secondlinesman={linesMen[1]}
                />
              );
            })}
        </div>

      </div>
    </>
  );
};

export default EditMatch;
