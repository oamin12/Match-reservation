import {HiOutlineHome} from 'react-icons/hi'
import {SiYourtraveldottv} from 'react-icons/si'
import {BiReceipt} from 'react-icons/bi'
import {FaHandHoldingHeart} from 'react-icons/fa'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import classes from "../../layouts/sideBar/sidebar.module.css"

const sideBarCreator = {
    list: [
        {
          key: "0",  
          title: "Unauthorized Users",
          icon: <VerifiedUserIcon className={classes.icon}/>,
          route: "/admin/unauthorized",
        },
        {
          key: "1",
          title: "All Users",
          icon: <PeopleAltIcon className={classes.icon}/>,
          route: "/admin/allUsers",
        }
        
      ],
      managerList: [
        {
          key: "0",  
          title: "Add Match",
          icon: <VerifiedUserIcon className={classes.icon}/>,
          route: "/manager/addmatch",
        },
        {
          key: "1",
          title: "Add Stadium",
          icon: <PeopleAltIcon className={classes.icon}/>,
          route: "/manager/addstadium",
        },
        {
          key: "2",
          title: "Edit Match",
          icon: <PeopleAltIcon className={classes.icon}/>,
          route: "/manager/editmatch",
        }
        
      ],
}

export default sideBarCreator;