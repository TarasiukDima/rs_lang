import React from "react";
import { useLocation } from "react-router-dom";
import AudioGame from "../../components/audioGame";
import SectionContent from "../../components/section";
import SprintGame from "../../components/sprintGame";
import { PageLinks } from "../../helpers/settings";

import "./index.scss";

const OneGame = () => {
    const location = useLocation();
    let gameTitle = "";
    let needGame = <div>Данной игры нет</div>;
    switch (location.pathname) {
        case (PageLinks.gameSprintPage):
            needGame = <SprintGame />;
            gameTitle = "Спринт";
            break;
        case (PageLinks.gameAudioPage):
            needGame = <AudioGame />;
            gameTitle = "Аудиовызов";
            break;
        default:
            break;
    }

    return (
        <SectionContent nameClass="games__section">
            <h1 className="title">{ gameTitle }</h1>

            {needGame}
        </SectionContent>
    );
};

export default OneGame;
