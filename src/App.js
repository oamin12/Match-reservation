import classes from "./App.css";
import NavBar from "./layouts/nav/NavBar";
import Footer from "./layouts/footer/Footer";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/authentication/LoginPage";
import { Routes, Route} from "react-router-dom";
import SignupPage from "./pages/authentication/SignupPage";
import ForgetPasswordPage from "./pages/authentication/ForgetPasswordPage";
import Profile from "./pages/profile/Profile";
import { useState } from "react";
import PersonalInfo from "./pages/profile/Personal Information/PersonalInfo";
import HideComponent from "./layouts/hideComponent/HideComponent";
import NotFound from "./layouts/notFound/NotFound";
import GenericForm from "./generic components/generic form/GenericForm"
import AdminPage from "./pages/admin/AdminPage"
import ManagerPage from "./pages/manager/ManagerPage"
import React, { useRef, useEffect } from 'react';
import ReservationPage from "./pages/reservation/ReservationPage";

function App() {

  const [open, setOpen] = useState(true);

  return (
    <>
      {/* <SubscribeCard open={open} setOpen={setOpen} /> */}
      <HideComponent>
        <NavBar />
      </HideComponent>
      <Routes>
        <Route path="/adminForm" element={<GenericForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/PersonalInfo" element={<PersonalInfo/>}/>
        <Route path="/forgetPassword/:id" element={<ForgetPasswordPage/>}/>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/manager/*" element={<ManagerPage/>}/>
        <Route path="/reserve/:id" element={<ReservationPage/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <HideComponent>
        <Footer />
      </HideComponent>
    </>
  );
}

export default App;
