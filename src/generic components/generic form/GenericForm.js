import React, { useState, useEffect } from "react";
import classes from "./genericform.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../requests/axios";
import routes from "../../requests/routes";

const PersonalInfo = (props) => {

    const init = {}

  for (const obj of props.arr) {
    if(obj.type === "checkbox"){
        init[obj.name] = false;
    }
    else if(obj.type === "radio"){
        init[obj.name] = obj.radioFields[0].name;
    }
    else if((obj.type === "text")){
        init[obj.name] = "hh";
    }

  }



  const initialValues = init;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3)
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
  });

  const handleSubmit = (data, { setErrors }) => {

  };

  useEffect(() => {
    console.log(props.arr);
  }, []);
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form className={classes.cont}>
            {props.arr.map((obj) =>
              obj.type === "checkbox" ? (
                <div className={classes.fieldEntry}>
                  <label className={classes.travelled}>
                    <Field
                      type="checkbox"
                      name={obj.name}
                      className={classes.checkbox}
                    />
                    <div className={classes.label}>{obj.label}</div>
                  </label>
                </div>
              ) : obj.type === "radio" ? (
                <div className={classes.fieldEntry}>
                  <label className={classes.label}>{obj.label}</label>
                  <div className={classes.list}>
                    {obj.radioFields.map((r) => (
                      <label className={classes.label__radio}>
                        <Field
                          type="radio"
                          className={classes.radio}
                          name={obj.name}
                          value={r.name}
                        />
                        <div>{r.name}</div>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={classes.fieldEntry}>
                  <label className={classes.label}>{obj.label}</label>
                  <Field
                    className={classes.field}
                    type={obj.type}
                    name={obj.name}
                    pattern={obj.regex}
                    required={obj.required}
                  />
                </div>
              )
            )}

            <div className={classes.btnCont}>
            <button className={classes.btn} type="submit">
              Save <h6>→</h6>
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PersonalInfo;
