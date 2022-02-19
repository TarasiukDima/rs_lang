import React from "react";
import SectionContent from "../../../components/section";
import GamesList from "../../../components/gamesList/GamesList";

const GamesSection = () => {
    return (
        <SectionContent nameClass="main__page_games">
            <h2 className="title">Игры</h2>

            <GamesList category={ null } page={ null }/>
        </SectionContent>
    );
};

export default GamesSection;
