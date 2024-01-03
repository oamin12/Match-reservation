import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import classes from "./addmatch.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import Cities from "../../../assets/data/Cities.js";
import teamsList from "../../../assets/data/teams.js";
import stadiumsList from "../../../assets/data/stadiums.js";

const AddMatch = (props) => {

  const [teams, setTeams] = useState([]);
  const [stadiums, setStadiums] = useState(stadiumsList);

  useEffect(() => {
    //get teams names from teamsNameImage.js and set it to teams
    setTeams(teamsList);
  }, []);

  const initialValues = {
    team1: "Al Ahly",
    team2: "Ismaily",
    stadium: "Al Ahly Stadium",
    date: "",
    mainreferee: "",
    firstlinesman: "",
    secondlinesman: "",

  };
  function getStadiums(){
    //get stadiums names from backend and set it to stadiums TODO
  }
  const validationSchema = Yup.object().shape({
    //team2 and team1 should be different
    team1: Yup.string().required("Please choose a team").notOneOf([Yup.ref('team2'), null], 'Teams should be different'),
    team2: Yup.string().required("Please choose a team").notOneOf([Yup.ref('team1'), null], 'Teams should be different'),
    stadium: Yup.string().required("Please choose a stadium"),
    date: Yup.string().required("Please choose a date"),
    mainreferee: Yup.string().required("main referee is required"),
    firstlinesman: Yup.string().required("first linesman is required"),
    secondlinesman: Yup.string().required("second linesman is required"),

  });

  const handleSubmit = (data, { setErrors }) => {
    console.log(data);
    async function updateData() {
      try {
        const response = await axios.put(routes.getUser, data);
      } catch (err) {}
    }

    updateData();
    props.setProceed(3)
  };

  return (
    <div className={classes.container}>
      <h1>Add a Match</h1>
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
                    <label className={classes.label}>Team 1</label>
                          <Field
                            as="select"
                            name="team1"
                            className={classes.fieldo}
                            defaultValue={values.team1}
                          >
                            {teams.map((team) => {
                              return (
                                <option
                                  value={team}
                                  className={classes.dropItem}
                                >
                                  {team}
                                </option>
                              );
                            })}
                          </Field>
                          <ErrorMessage name="team1" component="span" className={classes.error} />
                  </div>
                  <div className={classes.fieldEntry}>
                    <label className={classes.label}>Team 2</label>
                          <Field
                            as="select"
                            name="team2"
                            className={classes.fieldo}
                            defaultValue={values.team2}
                          >
                            {teams.map((team) => {
                              return (
                                <option
                                  value={team}
                                  className={classes.dropItem}
                                >
                                  {team}
                                </option>
                              );
                            })}
                          </Field>
                      <ErrorMessage name="team2" component="span" className={classes.error} />
                  </div>
                </div>
                <div className={classes.fieldRow}>
                <div className={classes.fieldEntry}>
                    <label className={classes.label}>Stadium</label>
                          <Field
                            as="select"
                            name="stadium"
                            className={classes.fieldo}
                            defaultValue={values.stadium}
                          >
                            {stadiums.map((stadium) => {
                              return (
                                <option
                                  value={stadium}
                                  className={classes.dropItem}
                                >
                                  {stadium}
                                </option>
                              );
                            })}
                          </Field>
                      <ErrorMessage name="stadium" component="span" className={classes.error} />
                  </div>
                  <div className={classes.fieldEntry}>
                    <label className={classes.label}>Match Date</label>
                    <Field
                      className={classes.ziad}
                      name="date"
                      type="date"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="date"
                      component="span"
                      className={classes.error}
                    />
                  </div>
                </div>
                <div className={classes.fieldRow}>
                  <div className={classes.fieldEntry}>
                    <label className={classes.label}>Main Referee</label>
                    <Field
                      className={classes.fieldo}
                      name="mainreferee"
                      type="text"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="mainreferee"
                      component="span"
                      className={classes.error}
                    />
                  </div>
                </div>
                <div className={classes.fieldRow}>
                <div className={classes.fieldEntry}>
                    <label className={classes.label}>First Linesman</label>
                    <Field
                      className={classes.fieldo}
                      name="firstlinesman"
                      type="text"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="firstlinesman"
                      component="span"
                      className={classes.error}
                    />
                  </div>
                  <div className={classes.fieldEntry}>
                    <label className={classes.label}>Second Linesman</label>
                    <Field
                      className={classes.fieldo}
                      name="secondlinesman"
                      type="text"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="secondlinesman"
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

export default AddMatch;
