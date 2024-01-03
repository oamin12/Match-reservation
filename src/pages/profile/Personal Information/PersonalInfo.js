import React, { useState, useEffect } from "react";
import classes from "./personalInfo.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import Cities from "../../../assets/data/Cities.js";

const PersonalInfo = (props) => {

  const [dataToBeSent, setDataToBeSent] = useState({});

  const initialValues = {
    email: props.email,
    firstName: props.firstName,
    lastName: props.lastName,
    birthDate: props.birthDate,
    Address: props.address,
    gender: props.gender,
    city: props.city,
  };

  useEffect(() => {
    console.log("props", props);
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3)
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
    firsName: Yup.string().required("Please enter your full name"),

  });

  function handleSubmit() {
    //console.log(data);
    async function updateData() {
      try {
        const response = await axios.patch(routes.updateUser+props.id, dataToBeSent);
        
        if(response)
        window.location.reload();
        
      } catch (err) {}
    }

    updateData();
    props.setProceed(3)
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
          {setDataToBeSent(values)}
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
                    <label className={classes.label}> First Name</label>
                    <Field
                      className={classes.fieldo}
                      name="firstName"
                      type="text"
                      autoComplete="off"
                      required
                      
                    />
                    <ErrorMessage
                      name="firstName"
                      component="span"
                      className={classes.error}
                    />
                  </div>
                  <div className={classes.fieldEntry}>
                    <label className={classes.label}>Last Name</label>
                    <Field
                      className={classes.fieldo}
                      name="lastName"
                      type="text"
                      autoComplete="off"
                      required
                      
                    />
                    <ErrorMessage
                      name="lastName"
                      component="span"
                      className={classes.error}
                    />
                  </div>
                  
                </div>
                <div className={classes.fieldRow}>
                <div className={classes.fieldEntry}>
                    <label className={classes.label}> Email Address</label>
                    <Field
                      className={classes.fieldo}
                      name="email"
                      autoComplete="off"
                      data-testid="LoginFormEmailInput"
                      required
                      readOnly
                    />
                    <ErrorMessage
                      className={classes.error}
                      name="email"
                      component="span"
                      data-testid="emailError"
                    />
                  </div>

                  <div className={classes.fieldEntry}>
                    <label className={classes.label}> Date Of Birth</label>
                    <Field
                      className={classes.ziad}
                      name="birthDate"
                      type="date"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="birthDate"
                      component="span"
                      className={classes.error}
                    />
                  </div>
                </div>
                <div className={classes.fieldRow}>
                  
                  <div className={classes.fieldEntry}>
                    <label className={classes.label}>Address</label>
                    <Field
                      className={classes.fieldo}
                      name="Address"
                      type="text"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="Address"
                      component="span"
                      className={classes.error}
                    />
                  </div>
                </div>
                <div className={classes.fieldRow}>
                  <div className={classes.fieldEntry}>
                    <label className={classes.label}>Gender</label>
                    <div className={classes.list}>
                      <label className={classes.label__radio}>
                        <Field
                          type="radio"
                          className={classes.radio}
                          name="gender"
                          value="male"
                        />
                        <div>Male</div>
                      </label>
                      <label className={classes.label__radio}>
                        <Field
                          type="radio"
                          className={classes.radio}
                          name="gender"
                          value="female"
                        />
                        <div>Female</div>
                      </label>
                    </div>
                  </div>
                  <div className={classes.fieldEntry}>
                  <label className={classes.label}>City</label>
                        <Field
                          as="select"
                          name="government"
                          className={classes.fieldo}
                          defaultValue={values.city}
                        >
                          {Cities.map((city) => {
                            return (
                              <option
                                value={city.city_name_en}
                                className={classes.dropItem}
                              >
                                {city.city_name_en}
                              </option>
                            );
                          })}
                        </Field>
                      </div>
                </div>
              </div>
            </div>
            <button className={props.isBooking?classes.btn:classes.btnProfile} type="submit" onClick={handleSubmit} >
              Save
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalInfo;
