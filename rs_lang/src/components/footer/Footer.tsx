import React from "react";
import "./index.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="wrapper">
                <a
                    className="school__link"
                    href="https://rs.school"
                    target="_blank"
                    rel="noreferrer"
                ></a>

                <p className="year__text">2022</p>

                <a
                    className="github__link"
                    href="https://github.com/TarasiukDima"
                    target="_blank"
                    rel="noreferrer"
                >
                    Tarasiuk Dmitrij
                </a>
            </div>
        </footer>
    );
};

export default Footer;
