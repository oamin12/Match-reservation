import React from "react";
import classes from "./confirmcard.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import teamsList from "../../../../../assets/data/teams.js";
import stadiumsList from "../../../../../assets/data/stadiums.js";
import axios from "../../../../../requests/axios";
import routes from "../../../../../requests/routes";


function Confirm(props) {
    const [error, setError] = useState("");
    function handleModalClose() {
        props.setOpen(false);
        props.setSuccess("")
        setError("");
    }
    function handleSubmit() {
 
        props.handleSubmit();

    }
    const [teams, setTeams] = useState([]);
    const [stadiums, setStadiums] = useState(stadiumsList);
  
    useEffect(() => {
      //get teams names from teamsNameImage.js and set it to teams
      setTeams(teamsList);
    }, []);
  
    const initialValues = {
      team1: props.team1,
      team2: props.team2,
      stadium: props.stadium,
      date: props.date,
      mainreferee: props.mainreferee,
      firstlinesman: props.firstlinesman,
      secondlinesman: props.secondlinesman,
  
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
  
    
    return (
        <Modal open={props.open} onClose={handleModalClose}>
            <Box className={classes.box}>
                <div className={classes.container1}>
                    <div className={classes.close}>
                        <button onClick={handleModalClose}>
                        x
                        </button>
                    </div>
                    <h1 className={classes.title}>Edit Match</h1>
                        <div className={classes.info}>
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
                                    {props.success!==""? <p className={classes.success}>{props.success}</p>:null}
                                    <button className={classes.btnProfile} type="submit" >
                                    Save
                                    </button>
                                    </div>
                                </Form>
                                )}
                            </Formik>
                        </div>
                        <div className={classes.error}>{error}</div>
                </div>
            </Box>
        </Modal>
    );

}

export default Confirm;