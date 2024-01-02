import React, { useState, useEffect } from "react";
import classes from "./personalInfo.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import Cities from "../../../assets/data/Cities.js";

const PersonalInfo = (props) => {
  const initialValues = {
    email: props.email,
    fullName: props.fullName,
    phoneNO: props.phone,
    nationalId: "",
    birthDate: "",
    Address: "",
    gender: "",
    city: "Mokattam",//change to props.city TODO
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3)
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
    fullName: Yup.string().required("Please enter your full name"),

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
    <div>
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
                    <label className={classes.label}> Full Name</label>
                    <Field
                      className={classes.fieldo}
                      name="fullName"
                      type="text"
                      autoComplete="off"
                      required
                      
                    />
                    <ErrorMessage
                      name="fullName"
                      component="span"
                      className={classes.error}
                    />
                  </div>
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
                </div>
                <div className={classes.fieldRow}>
                  <div className={classes.fieldEntry}>
                    <label className={classes.label}> National ID</label>
                    <Field
                      className={classes.fieldo}
                      name="nationalId"
                      pattern="^[0-9]{14}$"
                      autoComplete="off"
                      number="true"
                    />
                    <ErrorMessage
                      className={classes.error}
                      name="nationalId"
                      component="span"
                    />
                  </div>

                  <div className={classes.fieldEntry}>
                    <label className={classes.label}> Phone Number</label>
                    <Field
                      className={classes.fieldo}
                      name="phoneNO"
                      autoComplete="off"
                      data-testid="LoginFormEmailInput"
                    />
                    <ErrorMessage
                      name="phoneNO"
                      component="span"
                      data-testid="emailError"
                    />
                  </div>
                </div>
                <div className={classes.fieldRow}>
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
            <button className={props.isBooking?classes.btn:classes.btnProfile} type="submit" >
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
