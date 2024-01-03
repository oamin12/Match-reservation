import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import classes from "./admin.module.css";
import AdminAuthorize from "./authorize/AdminAuthorize"
import AdminAllUsers from "./allUSers/AdminAllUsers";
import SideBar from "./../../layouts/sideBar/Sidebar"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { useSelector } from "react-redux";




const AdminPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  //To make sure user can't access login if he is already logged in
  useEffect(() => {
    if(user.isAdmin===false){
      navigate("/")
    }
  }, []);


  return (
    <>
      <div className={classes.container}>
      <SideBar/>
      <Routes>
        <Route path="/unauthorized"  element={<AdminAuthorize/>}/>
        <Route path="/allusers" element={<AdminAllUsers />} />
      </Routes>

      </div>
    </>
  );
};

export default AdminPage;
