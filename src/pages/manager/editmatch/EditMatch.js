import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import classes from "./editmatch.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MatchCard from "./matchescard/MatchCard";


const EditMatch = () => {
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);

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
    setMatches(matchesData);
      
    }, [])
  

  return (
    <>
      <div className={classes.container}>
        <h1>Edit Match</h1>
        <div className={classes.userslist}>
          {matches.map((match)=>{
              return (
                <MatchCard
                  key={match.id}
                  id={match.id}
                  team1={match.team1}
                  team2={match.team2}
                  stadium={match.stadium}
                  date={match.date}
                  mainreferee={match.mainreferee}
                  firstlinesman={match.firstlinesman}
                  secondlinesman={match.secondlinesman}
                />
              );
            })}
        </div>

      </div>
    </>
  );
};

export default EditMatch;
