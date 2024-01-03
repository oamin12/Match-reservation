import React, { useState ,useEffect} from "react";
import classes from "./auth.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import images from "../../assets/data/loginPhotos";
import { Link } from "react-router-dom";
import validator from "validator";
import axios from "../../requests/axios"
import routes from "../../requests/routes"
import ErrorNotification from "../../generic components/error message/ErrorNotification";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GenericModal from "../../generic components/generic modal/GenericModal";
import {BiErrorCircle} from "react-icons/bi";
import {TfiEmail} from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Loader from "../../layouts/loader/Loader";
import Cities from "../../assets/data/Cities.js";

/**
 * Component that renders Signup page
 * 
 * @component
 * @example
 * return(<SignupPage />)
 */
const SignupPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [cont, setContinue] = useState(false);
  const [loader, setLoader] = useState(false);
  const [randImg, setrandImg] = useState(Math.floor(Math.random() * 3));
  const [myEmail, setMyEmail] = useState();


  const [errorMsg, setErrorMsg] = useState('');
  const [errorLink, setErrorLink] = useState('');
  const [errorLinkMsg, setErrorLinkMsg] = useState('');
  const[stateoftheconditionform,setstateoftheconditionform]=useState(false);
  const[agreeformstate,setagreeformstate]=useState(false);
  const[datainfo,setdatainfo]=useState();

    //To make sure user can't access signUp if he is already logged in 
    useEffect(() => {
      if(user.loggedIn){
        navigate("/")
      }
    }, []);


  const initialValues = {
    username: "",
    email: "",
    address: "",
    firstName: "",
    lastName: "",
    gender: "male",
    password: "",
    passwordConfirm: "",
    birthDate: "",
    role: "fan",
    city: "Mokattam",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3)
      .email("Invalid email address")
      .required(" Email field is required"),

    password: Yup.string().min(8).required("Field required"),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Field required"),
    firstName: Yup.string().required("Full name field required"),
    lastName: Yup.string().required("Full name field required"),
    username: Yup.string().required("Username field required"),
    birthDate: Yup.date().required("Date Field required"),
    user: Yup.string().required("Field required"),
    

  });

  const openconditionform = () => {
    setstateoftheconditionform(true);
    
  };


 async function sendData(data){
  setLoader(true);
  try{
    const request = await axios.post(routes.signUp, data)
    setagreeformstate(true);
    setLoader(false);
    
    navigate("/login")
    
  } catch(err){
    setLoader(false);
    setErrorMsg("There is an account associated with the email.")
    setErrorLinkMsg("Log in")
    setErrorLink("/login")
  }
}  

const handleSubmit = (data) => {
  console.log("lol");
  setdatainfo(data);
  sendData(datainfo);

 
  
};
const accepthandle=() =>{
  setstateoftheconditionform(false);
}
const rejecthandle=()=>{
  setstateoftheconditionform(false);
  setErrorMsg('To continue you have to accept our Terms and conditions.')
}


  return (
    <div>
      <div className={classes.main}>
            <NavLink to="/">
              <ArrowCircleLeftIcon className={classes.backArrowSignUp}/>
            </NavLink>
        <div className={classes.infoSignUp}>
          <div className={classes.form}>
            <div className={classes.header}>
              <h1>
                Sign Up
              </h1>
            </div>

            {errorMsg?
            <ErrorNotification mssg={errorMsg} linkmsg={errorLinkMsg} link={errorLink} signUp={true}/>:null}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  {setdatainfo(values)}
                  
                  <div className={classes.boxContainer}>
                      <label className={classes.label}> Email address </label>
                      <Field 
                        className={classes.field}
                        id="email"
                        name="email"
                        autoComplete="off"
                        disabled={cont}
                        data-testid="EmailFieldInput"
                      />
                    <ErrorMessage name="email" component="span" />
                  </div>
                  <div className={classes.boxContainer}>
                      <label className={classes.label}> Username </label>
                      <Field 
                        className={classes.field}
                        id="username"
                        name="username"
                        autoComplete="off"
                        disabled={cont}
                      />
                    <ErrorMessage name="username" component="span" />
                  </div>
                    <div className={classes.boxContainer}>
                        <label className={classes.label}> First Name </label>
                        <Field
                          className={classes.field}
                          name="firstName"
                          autoComplete="off"
                          data-testid="fullNamefield"
                        />
                      <ErrorMessage name="firstName" component="span" />
                    </div>
                    <div className={classes.boxContainer}>
                        <label className={classes.label}> Last Name </label>
                        <Field
                          className={classes.field}
                          name="lastName"
                          autoComplete="off"
                        />
                      <ErrorMessage name="lastName" component="span" />
                    </div>
                    <div className={classes.boxContainer}>
                        <label className={classes.label}> Date Of Birth</label>
                        <Field
                          className={classes.field}
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
                    <div className={classes.boxContainer}>
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
                    <div className={classes.boxContainer}>
                      <label className={classes.label}>City</label>
                            <Field
                              as="select"
                              name="city"
                              className={classes.field}
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
                    <div className={classes.boxContainer}>
                        <label className={classes.label}> address </label>
                        <Field
                          className={classes.field}
                          name="address"
                          type="text"
                          autoComplete="off"
                        />
                      <ErrorMessage name="address" component="span" />
                    </div>
                    <div className={classes.boxContainer}>
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}> Password</label>
                        <Field
                          className={classes.field}
                          name="password"
                          type="password"
                          autoComplete="off"
                          data-testid="Passwordfield"
                        />
                      </div>
                      <ErrorMessage name="password" component="span" />
                    </div>
                    <div className={classes.boxContainer}>
                      <div className={classes.fieldContainer}>
                        <label className={classes.label}>Confirm Password</label>
                        <Field
                          className={classes.field}
                          name="passwordConfirm"
                          type="password"
                          autoComplete="off"
                          data-testid="Passwordfield"
                        />
                      </div>
                      <ErrorMessage name="passwordConfirm" component="span" />
                    </div>
                    <div className={classes.boxContainer}>
                    <label className={classes.label}>Role</label>
                    <div className={classes.list}>
                      <label className={classes.label__radio}>
                        <Field
                          type="radio"
                          className={classes.radio}
                          name="role"
                          value="fan"
                        />
                        <div>Fan</div>
                      </label>
                      <label className={classes.label__radio}>
                        <Field
                          type="radio"
                          className={classes.radio}
                          name="role"
                          value="manager"
                        />
                        <div>Manager</div>
                      </label>
                    </div>
                    </div>
                    <div
                      className={classes.btn}
                    >
                      <button type="submit" className={classes.button} onClick={handleSubmit} >
                        Create account
                      </button>
                    </div>
                </Form>
              )}
            </Formik>
            <Link to="/login">
              <p className={classes.changeLink}>Already have an account <b>Log in</b></p>
            </Link>
          </div>
        </div>
        <div
          className={classes.imgSignUp}
          style={{ backgroundImage: `url(${images[randImg]})` }}
        >
          <div className={classes.slogan}>
            <h2>Let’s create an account <br/> NOW</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
