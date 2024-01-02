import React from 'react'
import classes from './profilebar.module.css'
import FavoriteIcon from '@mui/icons-material/Favorite';


const ProfileBar = (props) => {
  return (
    <div className={classes.profileBar}>
    <ul>
      <li className={props.selectedItem==="My Feed"?classes.selected:classes.Unselected} onClick={()=>{props.setSelectedItem("My Feed")}}>My Feed</li>
      <li className={props.selectedItem==="Profile Info"?classes.selected:classes.Unselected} onClick={()=>{props.setSelectedItem("Profile Info")}}>Profile Info</li>
    </ul>
    <hr/>
  </div>
  )
}

export default ProfileBar