import React from "react";
import classes from "./confirmcard.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";


function Confirm(props) {
    const [error, setError] = useState("");
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [password, setPassword] = useState("");
    function handleModalClose() {
        props.setOpen(false);
        setError("");
    }
    function handleSubmit() {
        
        props.handleSubmit();
    }


    return (
        <Modal open={props.open} onClose={handleModalClose}>
            <Box className={classes.box}>
                <div className={classes.container}>
                    <div className={classes.close}>
                        <button onClick={handleModalClose}>
                        x
                        </button>
                    </div>
                    <h1 className={classes.title}>Confirm Delete</h1>
                        <div className={classes.info}>
                            {/*this will have the number of tickets and total price, 2 text boxes one for CreditCard number and 1 for password*/}
                            <div className={classes.infoItem}>
                                <p>Are you sure you want to delete this user?</p>
                            </div>
                            {props.success!==""? <p className={classes.success}>{props.success}</p>:null}
                            <div className={classes.btns}>
                                <button className={classes.cancel} onClick={handleModalClose}>Cancel</button>
                                <button className={classes.confirm} onClick={handleSubmit}>Confirm</button>
                            </div>
                        </div>
                </div>
            </Box>
        </Modal>
    );

}

export default Confirm;