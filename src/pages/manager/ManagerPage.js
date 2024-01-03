import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import classes from "./manager.module.css";
import SideBar from "./../../layouts/sideBar/Sidebar";
import AddMatch from "./addmatch/AddMatch";
import AddStadium from "./addstadium/AddStadium";
import EditMatch from "./editmatch/EditMatch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { useSelector } from "react-redux";



const ManagerPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //To make sure user can't access login if he is already logged in
  useEffect(() => {
    if(user.userType !== "manager"){
      navigate("/")
    }
  }, []);


  return (
    <>
      <div className={classes.container}>
      <SideBar SideBar={"manager"}/>
      <Routes>
        <Route path="/addmatch"  element={<AddMatch/>}/>
        <Route path="/addstadium" element={<AddStadium />} />
        <Route path="/editmatch" element={<EditMatch />} />
      </Routes>

      </div>
    </>
  );
};

export default ManagerPage;
