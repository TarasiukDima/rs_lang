import React from "react";
import GamesList from "../../components/gamesList/GamesList";
import SectionContent from "../../components/section";

import "./index.scss";

const GamesPage = () => {
    return (
        <SectionContent nameClass="games__section">
            <h1 className="title">Игры</h1>

            <GamesList category={ null }  page={ null } gameOnePage={false}/>
        </SectionContent>
    );
};

export default GamesPage;
