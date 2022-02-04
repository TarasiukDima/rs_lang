import React from "react";
import GameLink from "./GameLink";
import music from "../../assets/img/music.jpg";
import fast from "../../assets/img/fast.jpg";
import { PageLinks } from "../../utils";

const GamesList = () => {
    const gamesInfo = [
        {
            gameImg: fast,
            pageLink: PageLinks.gameSprintPage,
            linkName: "Спринт",
        },
        {
            gameImg: music,
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
