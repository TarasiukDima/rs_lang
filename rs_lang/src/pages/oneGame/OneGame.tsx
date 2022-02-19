import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import AudioGame from "../../components/audioGame";
import SectionContent from "../../components/section";
import SprintGame from "../../components/sprintGame";
import { PageLinks } from "../../helpers/consts";
import {
    changeGameCategory,
    changeGamePage,
} from "../../store/actions/actionsGame";
import { IOneGameProps } from "../../types/game";
import { IAction, IState } from "../../types/redux";
import ChooseCategoryGame from "./ChooseCategoryGame";

import "./index.scss";

const OneGame = ({
    gamePage,
    gameCategory,
    changeGameCat,
    changeGamePage,
}: IOneGameProps) => {
    const { pathname } = useLocation();
    let gameTitle = "Данной игры нет";
    let needGame = "not game";

    switch (pathname) {
        case PageLinks.gameSprintPage:
            needGame = "sprint";
            gameTitle = "Спринт";
            break;
        case PageLinks.gameAudioPage:
            needGame = "audio";
            gameTitle = "Аудиовызов";
            break;
        default:
            break;
    }

    const changeCateAndPage = (idCat: number) => {
        changeGameCat(idCat);
        changeGamePage(29);
    };

    const showChoose = gameCategory === null;
    const showAudioGame = !showChoose && needGame === "audio";
    const showSprintGame = !showChoose && needGame === "sprint";



    return (
         <SectionContent nameClass="games__section">
            {showChoose ? (
                <ChooseCategoryGame
                    gameTitle={gameTitle}
                    changeCateAndPage={changeCateAndPage}
                />
            ) : <></>}


            {showAudioGame ? <AudioGame /> : <></>}
            {showSprintGame ? <SprintGame /> : <></>}
        </SectionContent>
    );
};

const mapStateToProps = ({ game: { gamePage, gameCategory } }: IState) => ({
    gamePage,
    gameCategory,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeGameCat: (id: number | null) => {
            dispatch(changeGameCategory(id));
        },
        changeGamePage: (id: number | null) => {
            dispatch(changeGamePage(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneGame);
