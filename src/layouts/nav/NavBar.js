import React, { useState, useEffect } from "react";
import classes from "./navbar.module.css";
import navData from "../../assets/data/navData";
import logo from "../../assets/brand/logo.png";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import audio from "../../assets/music/music.mp3";
import { NavLink } from "react-router-dom";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useSelector } from "react-redux";
import ListIcon from "@mui/icons-material/List";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";

const NavBar = (props) => {
  const user = useSelector((state) => state.user);
  const [dropDown, setDropDown] = useState(false);
  const logged = user.loggedIn;
  const dispatch = useDispatch();
  let audio1 = new Audio(audio);

  useEffect(() => {
    console.log(dropDown);
  }, [dropDown]);

  function handleLogout() {
    dispatch(userActions.logout());
    setDropDown(false);
  }

  return (
    <nav id="intro" className={classes.nav}>
      <NavLink to="/">
        <div className={classes.logoContainer}>
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
      </NavLink>

      <div className={classes.routes}>
        <ul>
          {navData.Home[0].map((element, index) => {
            return (
              <div className={classes.list}>
                <li className={classes.navItem}>
                  <NavLink
                    to={element.route}
                    activeClassName={classes.activeLink}
                  >
                    <div className={classes.wrapper}>
                      {element.icon}
                      <div>
                        {element.title}{" "}
                        {/* {element.list && (
                          <KeyboardArrowDownIcon className={classes.arrow} />
                        )} */}
                      </div>
                    </div>
                  </NavLink>

                </li>
              </div>
            );
          })}
          {logged && (
            <>
              <NavLink to="/login">
                <li className={classes.navItem} onClick={() => handleLogout()}>
                  Logout
                </li>
              </NavLink>
              {user.isAdmin ? (
                <NavLink to={"/admin/unauthorized"}>
                  <li className={classes.navItem}>Admin Center</li>
                </NavLink>
              ) : (
                <>
                  {user.userType === "user" ? (
                    <NavLink to={"/profile/" + user.id}>
                      <li className={classes.navItem}>
                        <PersonOutlineIcon className={classes.profile} /> My Profile
                      </li>
                    </NavLink>
                  ) : (
                    <NavLink to={"/manager/"}>
                        <li className={classes.navItem}>
                          <PersonOutlineIcon className={classes.profile} /> Manager Portal
                        </li>
                    </NavLink>
                  )}
                </>
              )}
            </>
          )}
          {!logged && (
            <NavLink to="/login">
              <button className={classes.btn}>
                {" "}
                Sign In <TrendingFlatIcon size="large" />{" "}
              </button>
            </NavLink>
          )}
        </ul>
      </div>

      {/* mobile view */}
      <ListIcon
        className={classes.burger}
        onClick={() => setDropDown(!dropDown)}
      />
      {dropDown && (
        <ol className={classes.dropDown}>
          {navData.Home[0].map((item, index) => {
            return (
              <li
                className={classes.navSubItem}
                onClick={() => setDropDown(false)}
              >
                <NavLink
                  to={item.route}
                  className={classes.navTitle}
                  activeClassName={classes.activeLink}
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
          {!logged ? (
            <li
              className={classes.navSubItem}
              onClick={() => setDropDown(false)}
            >
              <NavLink
                to={navData.Home[1][0].route}
                className={classes.navTitle}
                activeClassName={classes.activeLink}
              >
                {navData.Home[1][0].title}
              </NavLink>
            </li>
          ) : user.isAdmin ? (
            navData.Home[3].map((item, index) => {
              return (
                <li
                  className={classes.navSubItem}
                  onClick={
                    item.title === "Log Out"
                      ? () => handleLogout()
                      : () => {
                          setDropDown(false);
                        }
                  }
                >
                  <NavLink
                    to={
                      item.title === "Profile"
                        ? "/profile/" + user.id
                        : item.route
                    }
                    className={classes.navTitle}
                    activeClassName={classes.activeLink}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })
          ) : (
            navData.Home[2].map((item, index) => {
              return (
                <li
                  className={classes.navSubItem}
                  onClick={
                    item.title === "Log Out"
                      ? () => handleLogout()
                      : () => {
                          setDropDown(false);
                        }
                  }
                >
                  <NavLink
                    to={
                      item.title === "Profile"
                        ? "/profile/" + user.id
                        : item.route
                    }
                    className={classes.navTitle}
                    activeClassName={classes.activeLink}
                  >
                    {item.title}
                  </NavLink>
                </li>
              );
            })
          )}
        </ol>
      )}
    </nav>
  );
};

export default NavBar;
