import React from "react";
import { useLocation } from "react-router-dom";
import "./index.scss";

const Footer = () => {
    const { pathname } = useLocation();
    const gameName = pathname.split("/")[2];
    const gamePage = gameName === "audio" || gameName === 'sprint';

    return (
        <>
            {gamePage ? (
                <></>
            ) : (
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
            )}
        </>
    );
};

export default Footer;
