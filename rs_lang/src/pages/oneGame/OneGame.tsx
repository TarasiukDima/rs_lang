import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import SectionContent from "../../components/section";
import ChooseCategoryGame from "./ChooseCategoryGame";
import Game from "../../components/game";
import { PageLinks } from "../../helpers/consts";
import {
    changeGameCategory,
    changeGamePage,
} from "../../store/actions/actionsGame";
import { IOneGamePageProps } from "../../types/game";
import { IAction, IState } from "../../types/redux";

import "./index.scss";

const OneGame = ({
    gameCategory,
    changeGameCat,
    changeGamePage,
}: IOneGamePageProps) => {
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

    return (
         <SectionContent nameClass="games__section">
            {showChoose ? (
                <ChooseCategoryGame
                    gameTitle={gameTitle}
                    changeCateAndPage={changeCateAndPage}
                />
            ) : <Game needGame={ needGame }/>}
        </SectionContent>
    );
};

const mapStateToProps = ({ game: { gameCategory } }: IState) => ({
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
