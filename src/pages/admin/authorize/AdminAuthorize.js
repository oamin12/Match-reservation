import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import classes from "./adminAuth.module.css";
import UserCard from "./usercard/UserCard.js"
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import { Formik, Form, Field, ErrorMessage } from "formik";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    //get users names from backend and set it to users TODO
    async function getUsers() {
      try {
        const response = await axios.get(routes.getUnauthorized);
        setUsers(response.data);
        console.log("response", response.data);
      }
      catch (err) {}
    }
    getUsers();

   
  }, []);

  return (
    <>
      <div className={classes.container}>
        <h1>Authorize users</h1>
        <div className={classes.userslist}>
          {users.map((user)=>{
              return (
                <UserCard
                  key={user._id}
                  id={user._id}
                  name={user.firstName + " " + user.lastName}
                  email={user.email}
                />
              );
            })}
        </div>

      </div>
    </>
  );
};

export default AdminDashboard;
