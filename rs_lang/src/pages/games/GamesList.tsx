import React from "react";
import GameLink from "./GameLink";
import avatar1 from "../../assets/img/avatar1.jpg";
import { PageLinks } from "../../utils";

const GamesList = () => {
    const gamesInfo = [
        {
            gameImg: avatar1,
            pageLink: PageLinks.gameSprintPage,
            linkName: "Спринт",
        },
        {
            gameImg: avatar1,
            pageLink: PageLinks.gameAudioPage,
            linkName: "Аудио",
        },
    ];

    return (
        <ul className="list__games">
            {gamesInfo.map((gameInfo) => (
                <GameLink key={gameInfo.pageLink} {...gameInfo} />
            ))}
        </ul>
    );
};

export default GamesList;
