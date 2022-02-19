import React from "react";
import GameLink from "./GameLink";

import { gamesInfo } from "../../helpers/settings";
import { IGameListProps } from "../../types/game";

import "./index.scss"

const GamesList = ({ category, page }: IGameListProps) => {
    return (
        <ul className="list__games">
            {gamesInfo.map((gameInfo) => (
                <GameLink key={gameInfo.pageLink} {...gameInfo} category={category} page={page}/>
            ))}
        </ul>
    );
};

export default GamesList;
