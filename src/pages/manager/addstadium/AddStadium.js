import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import classes from "./addstadium.module.css";
import UserCard from "./usercard/UserCard.js"
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import Cities from "../../../assets/data/Cities.js";
import teamsList from "../../../assets/data/teams.js";
import stadiumsList from "../../../assets/data/stadiums.js";


const AddStadium = (props) => {
  const [teams, setTeams] = useState([]);
  const [stadiums, setStadiums] = useState(stadiumsList);

  useEffect(() => {
    //get teams names from teamsNameImage.js and set it to teams
    setTeams(teamsList);
  }, []);

  const initialValues = {
    name: "",
    rows: "",
    seatsPerRow: "",
  };
  function getStadiums(){
    //get stadiums names from backend and set it to stadiums TODO
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter a stadium name"),
    rows: Yup.string().required("Please enter number of rows"),
    seatsPerRow: Yup.string().required("Please enter number of seats per row"),
  });

  const handleSubmit = (data, { resetForm }) => {
    console.log(data);
    async function updateData() {
      try {
        const response = await axios.post(routes.addStadium, data);
        if(response)
        resetForm();
      } catch (err) {}
    }

    updateData();
    props.setProceed(3)
  };

  return (
    <div className={classes.container}>
      <h1>Add a Stadium</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            <div className={
                !props.isBooking ? classes.container : null
              }>
            <div
              className={
                props.isBooking ? classes.personalInfo : null
              }
            >
              <div className={classes.personalInfoSection}>
                {props.isBooking ? (
                  <>
                    <h5 className={classes.infoTitle}> Personal Information</h5>
                    <h6 className={classes.subtitle}>
                      Update your personal information if needed
                    </h6>
                  </>
                ) : null}

                <div className={classes.fieldRow}>
                  <div className={classes.fieldEntry}>
                      <label className={classes.label}>Stadium Name</label>
                      <Field
                        className={classes.fieldo}
                        name="name"
                        type="text"
                        autoComplete="off"
                      />
                      <ErrorMessage
                        name="name"
                        component="span"
                        className={classes.error}
                      />
                    </div>
                </div>
                <div className={classes.fieldRow}>
                <div className={classes.fieldEntry}>
                    <label className={classes.label}>Number of Rows</label>
                    <Field
                      className={classes.fieldo}
                      name="rows"
                      type="number"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="rows"
                      component="span"
                      className={classes.error}
                    />
                </div>
                <div className={classes.fieldEntry}>
                  <label className={classes.label}>Seats Per Row</label>
                  <Field
                    className={classes.fieldo}
                    name="seatsPerRow"
                    type="number"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="seatsPerRow"
                    component="span"
                    className={classes.error}
                  />
                </div>  
                </div>
              </div>
            </div>
            <button className={classes.btnProfile} type="submit" >
              Save
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default AddStadium;
