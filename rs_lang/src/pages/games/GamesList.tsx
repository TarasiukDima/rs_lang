import React from "react";
import GameLink from "./GameLink";

import { gamesInfo } from "../../helpers/settings";

const GamesList = () => {
    return (
        <ul className="list__games">
            {gamesInfo.map((gameInfo) => (
                <GameLink key={gameInfo.pageLink} {...gameInfo} />
            ))}
        </ul>
    );
};

export default GamesList;
