import React from "react";
import SectionContent from "../../../components/section";
import GamesList from "../../games/GamesList";

const GamesSection = () => {
    return (
        <SectionContent nameClass="main__page_games">
            <h2 className="title">Игры</h2>

            <GamesList />
        </SectionContent>
    );
};

export default GamesSection;
