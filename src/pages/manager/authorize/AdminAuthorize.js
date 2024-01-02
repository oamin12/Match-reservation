import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import classes from "./adminAuth.module.css";
import UserCard from "./usercard/UserCard.js"


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const response = await axios.get(routes.getUsers);
    //     setUsers(response.data);
    //   } catch (err) {}
    // }
    // fetchData();
    setUsers([
      {
        id: 1,
        name: "Ahmed Amin",
        username: "ahmedamin",
        email: "adwa@daw.com"
      },
      {
        id: 2,
        name: "abdelrahman sayed sika",
        username: "mohamed123445",
        email: "mo@yahooo.com"
      },
      {
        id: 3,
        name: "Ali ali ali",
        username: "ali9090",
        email: "ali@ali.ali"
      },
      {
        id: 4,
        name: "Omar Amin amin",
        username: "omaromar",
        email: "oamin.omar@madw.com"
      },
    ]);
  }, []);

  return (
    <>
      <div className={classes.container}>
        <h1>Authorize users</h1>
        <div className={classes.userslist}>
          {users.map((user)=>{
              return (
                <UserCard
                  key={user.id}
                  id={user.id}
                  name={user.name}
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
