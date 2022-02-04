import React from "react";
import SectionContent from "../../components/section";
import GamesList from "./GamesList";
import "./index.scss";

const GamesPage = () => {
    return (
        <SectionContent nameClass="games__section">
            <h1 className="title">Игры</h1>

            <GamesList />
        </SectionContent>
    );
};

export default GamesPage;
