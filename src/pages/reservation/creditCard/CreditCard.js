import React from "react";
import classes from "./creditcard.module.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";


function CreditCard(props) {
    const [error, setError] = useState("");
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [password, setPassword] = useState("");
    function handleModalClose() {
        props.setOpen(false);
        setError("");
    }
    function handleSubmit() {
        if (props.selectedSeatsCount === 0) {
            setError("Please select a seat");
            return;
        }
        if (creditCardNumber === "") {
            setError("Please enter your credit card number");
            return;
        }
        if (password === "") {
            setError("Please enter your password");
            return;
        }
        if (creditCardNumber.length !== 16) {
            setError("Please enter a valid credit card number");
            props.setSuccess("");
            return;

        }
        setError("");
        props.handleSubmitSelectedSeats();
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
                    <h1 className={classes.title}>Confirm Reservation</h1>
                        <div className={classes.info}>
                            {/*this will have the number of tickets and total price, 2 text boxes one for CreditCard number and 1 for password*/}
                            <div className={classes.infoItem}>
                                <p>Number of Tickets: {props.selectedSeatsCount}</p>
                                <p>Total Price: {props.selectedSeatsCount*props.price}</p>                       
                            </div>
                            <div className={classes.creditCard}>
                                <input type="number" placeholder="Credit Card Number" onChange={(e)=>setCreditCardNumber(e.target.value)} />
                                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            {error!==""? <p className={classes.error}>{error}</p>:null}
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

export default CreditCard;