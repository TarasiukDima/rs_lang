import React, { Dispatch } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    changeGameCategory,
    changeGamePage,
} from "../../store/actions/actionsGame";
import { IGameProps } from "../../types/game";
import { IAction } from "../../types/redux";

const GameLink = ({
    gameImg,
    pageLink,
    linkName,
    category,
    page,
    changeGameCat,
    changeGamePage,
}: IGameProps) => {
    const changeGameState = () => {
        changeGameCat(category);
        changeGamePage(page);
    };

    return (
        <li className="game__item">
            <Link to={pageLink} onClick={changeGameState}>
                <img src={gameImg} alt={linkName} />
                <span className="item__name">{linkName}</span>
            </Link>
        </li>
    );
};


const mapStateToProps = () => ({});

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

export default connect(mapStateToProps, mapDispatchToProps)(GameLink);
