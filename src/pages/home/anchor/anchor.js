import React, { useState } from 'react';
import classes from './anchor.module.css';

import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

export default function Anchor() {
    const [show, setShow] = useState(false);

    window.onscroll = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    return (
        <div className={`${classes.container} ${show ? classes.show : ''}`} >
            <button className={classes.button} onClick={() => window.scroll(0, 0)}>
                <KeyboardArrowUpRoundedIcon className={classes.icon} />
            </button>
        </div>
    )
}