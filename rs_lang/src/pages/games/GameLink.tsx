import React from "react";
import { Link } from "react-router-dom";
import { IGameOptions } from "../../types/game";


const GameLink = ({gameImg, pageLink, linkName}: IGameOptions) => {
    return (
        <li className="game__item">
            <Link to={pageLink}>
                <img src={gameImg} alt={linkName} />
                <span className="item__name">{linkName}</span>
            </Link>
        </li>
    );
};

export default GameLink;
