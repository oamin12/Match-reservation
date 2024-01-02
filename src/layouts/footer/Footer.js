import React from "react";
import classes from "./footer.module.css";
import FooterData from "../../assets/data/FooterData";
import paymob from "../../assets/imgs/partners/paymob.png";
import valu from "../../assets/imgs/partners/Valu.png";
import facebook from "../../assets/imgs/contactUs/facebook1.png";
import instagram from "../../assets/imgs/contactUs/instagram.png";
import linkedin from "../../assets/imgs/contactUs/linkedin.png";

const Footer = () => {
  return (
    <footer className={classes.container}>
      <div className={classes.footer}>
        <div className={classes.data}>
          {FooterData.map((data, index) => {
            return (
              <div key={index}>
                <h3>{data.header}</h3>
                <ul>
                  {data.links.map((link, index) => {
                    return (
                      <li key={index}>
                        <a href={link.link}>{link.title}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div className={classes.newsLetter}>
          <div>
            <h3>Payment Partners</h3>
            <img src={valu} alt="valu" />
            <img src={paymob} alt="paymob" />
          </div>

          <div>
            <h3>Follow Us</h3>
            <div className={classes.socials}>
              <a target="_blank" rel="noreferrer" href="https://www.facebook.com/omar.mohamedahmed.90/">
                <img src={facebook} alt="fb" />
              </a>
              <a target="_blank" rel="noreferrer" href="https://www.instagram.com/oamin12000/">
                <img src={instagram} alt="fb" />
              </a>
            </div>
          </div>

        </div>
      </div>
      <p>copyright © 2023 . Amon 𓂀</p>

    </footer>
  );
};

export default Footer;
