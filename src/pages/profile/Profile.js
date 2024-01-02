import React, { useState, useEffect } from "react";
import classes from "./profile.module.css";
import avatarImg from "../../assets/imgs/avatar.png";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { useParams } from "react-router-dom";
import PersonalInfo from "./Personal Information/PersonalInfo";
import ProfileBar from "./ProfileBar";
import MyFeed from "./My Feed/MyFeed";
import noFeed from "../../assets/imgs/notFound/noFeed.png";
import { useSelector } from "react-redux";

const Profile = () => {
  const myUser = useSelector((state) => state.user);
  const id = myUser.id;
  const [user, setUser] = useState({});
  const [selectedItem, setSelectedItem] = useState("My Feed");

  async function getUser() {
    try {
      const response = await axios.get(routes.getUser + id);
      setUser(response.data);
    } catch (err) {}
  }
  useEffect(() => {
    getUser();
    // console.log(user);
  }, []);

  return (
    <div className={classes.container}>
      <section className={classes.profile}>
        <div className={classes.profileInfo}>
          <div className={classes.profileImage}>
            {user.image ? (
              <img src={user.image} alt="" />
            ) : (
              <img src={avatarImg} alt="" />
            )}
          </div>
          <div className={classes.profileInfo}>
            <div className={classes.profileDetails}>
              <h1 className={classes.profileName}>{user.fullName}</h1>
              <div className={classes.extraDetails}>
                <h1 className={classes.profileTitle}>User ID: {user._id}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <ProfileBar
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </section>
      {selectedItem === "My Feed" ? (
        <>
          {user.programs == 0 && user.blogs == 0 && user.gallery == 0 ? (
            <div className={classes.emptyFeed}>
              <div className={classes.noFeed}>
                <img src={noFeed} alt="" />
                <div className={classes.letsFill}>
                  Buy Your Tickets Now!
                </div>
              </div>
            </div>
          ) : (
            <section>
              <MyFeed user={user} />
            </section>
          )}
        </>
      ) : null}
      {selectedItem === "Profile Info" ? (
        <section>
          <PersonalInfo
            fullName={user.fullName}
            email={user.email}
            phone={user.phoneNO}
            id={user._id}
          />
        </section>
      ) : null}
    </div>
  );
};

export default Profile;
