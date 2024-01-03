import React, { useEffect, useState } from "react";
import classes from "./auth.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import images from "../../assets/data/loginPhotos";
import { Link } from "react-router-dom";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import ErrorNotification from "../../generic components/error message/ErrorNotification";
import { useSelector } from "react-redux";
import GenericModal from "../../generic components/generic modal/GenericModal";
import { TfiEmail } from "react-icons/tfi";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { NavLink } from "react-router-dom";
import Loader from "../../layouts/loader/Loader";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [randImg, setrandImg] = useState(Math.floor(Math.random() * 3));
  const [email, setEmail] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorLinkMsg, setErrorLinkMsg] = useState("");

  const [showForgetPass, setShowForgetPass] = useState(false);
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);

  //To make sure user can't access login if he is already logged in
  useEffect(() => {
    if(user.loggedIn){
      navigate("/")
    }
  }, []);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Please enter a valid user name"),
    password: Yup.string().required("Password is required"),
  });
  const [loader,setLoader] = useState(false);

  const handleSubmit = (data, { setErrors }) => {
    setErrorMsg("");
    setErrorLinkMsg("");
    setErrorLink("");

    async function sendData() {
      setLoader(true);
      try {
        const response = await axios.post(routes.logIn, data);
        setLoader(false);
        console.log(response);
        dispatch(
          userActions.login({
            id: response.data.id,
            token: response.data.token,
            userType: response.data.role,
          })
        );
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("id", response.data.id);
        navigate("/");

      } catch (err) {
        setLoader(false);
        // console.log("X" + err.response.data.error + "x");
        if (err.response.data.message === "User not approved yet")
          setErrorMsg("User not approved yet");
        else if (err.response.data.message === "Error: Password is incorrect") {
          setErrorMsg("user name or password is incorrect");
          setShowForgetPass(true);
        } else if (
          err.response.data.message === "Error: email is not verified "
        ) {
          setErrorMsg("Email is not verified");
        } else {
          setErrorMsg("There is no account associated with the email or username.");
          setErrors({
            email: "There is no account associated with the email or username.",
          });
          setErrorLinkMsg("Create account");
          setErrorLink("/signup");
        }
      }
    }
    sendData();
  };

  const handleForgetPassword = () => {
    setForgetPasswordModal(false);

    async function sendData() {
      try {
        const response = await axios.patch(routes.forgotPassword, {
          email: email,
        });
        console.log(response);
        setForgetPasswordModal(true);
      } catch (err) {
        console.log(err);
      }
    }

    sendData();
  };

  return (
    <div data-testid="LoginComponent">
      <div className={classes.main}>
        <NavLink to="/">
          <ArrowCircleLeftIcon className={classes.backArrow} />
        </NavLink>
        <div className={classes.shape1}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#C8E3E2"
              d="M67,-23.1C73.4,-2.1,55.9,25.3,32.3,41.8C8.7,58.3,-20.8,63.9,-38.1,51.6C-55.3,39.3,-60.1,9.1,-51.7,-14.7C-43.3,-38.5,-21.6,-55.9,4.3,-57.3C30.3,-58.7,60.6,-44.1,67,-23.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className={classes.shape2}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#C8E3E2"
              d="M67,-23.1C73.4,-2.1,55.9,25.3,32.3,41.8C8.7,58.3,-20.8,63.9,-38.1,51.6C-55.3,39.3,-60.1,9.1,-51.7,-14.7C-43.3,-38.5,-21.6,-55.9,4.3,-57.3C30.3,-58.7,60.6,-44.1,67,-23.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div
          className={classes.imageLogin}
          style={{ backgroundImage: `url(${images[randImg]})` }}
        >
          <div className={classes.slogan}>
            <h2>
            Cheer for your favorite team <br />    
            </h2>
          </div>
        </div>
        <div className={classes.infoLogin}>
          <div className={classes.form}>
            <div className={classes.header}>
              <h1>Sign in</h1>
            </div>

            {errorMsg ? (
              <ErrorNotification
                mssg={errorMsg}
                linkmsg={errorLinkMsg}
                link={errorLink}
              />
            ) : null}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  <div className={classes.boxContainer}>
                    <label className={classes.label}>User Name</label>
                    <Field
                      className={classes.field}
                      name="username"
                      autoComplete="off"
                      data-testid="LoginFormEmailInput"
                    />
                    <ErrorMessage
                      name="username"
                      component="span"
                      data-testid="emailError"
                    />
                  </div>
                  <div className={classes.boxContainer}>
                    <label className={classes.label}> Password</label>
                    <Field
                      className={classes.field}
                      name="password"
                      type="password"
                      autoComplete="off"
                      data-testid="LoginFormPasswordInput"
                    />
                    <ErrorMessage name="password" component="span" />
                  </div>
                  {showForgetPass && (
                    <p
                      className={classes.screenLink}
                      onClick={handleForgetPassword}
                    >
                      Forgot password?
                    </p>
                  )}
                  <div className={classes.btn}>
                    <button
                      type="submit"
                      className={classes.button}
                      data-testid="LoginFormSubmitButton"
                    >
                      Sign in
                    </button>
                  </div>
                  <Link to="/signup">
                    <p className={classes.changeLink}>
                      {" "}
                      Do not have an account? <b>Sign up</b>{" "}
                    </p>
                  </Link>
                  {loader && <Loader color={"#F46444"}/>}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {forgetPasswordModal && (
        <GenericModal
          header="Check your email to update your password"
          details={"We sent a link to " + `${email}`}
          icon={<TfiEmail className={classes.modalicon} />}
        />
      )}
    </div>
  );
};

export default LoginPage;
