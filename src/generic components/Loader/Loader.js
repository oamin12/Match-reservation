import React, {useEffect} from 'react'
import loader from "./loaderball.svg"
import classes from './loader.module.css'

//import products from './dummyData'
const Loader = () => {

  return (
    <div className={classes.body}>
        <img src={loader} alt='loader' />
    </div>
  )
}

export default Loader