import React from "react";
import { IGameStatisticProps } from "../../types/statistic";
import "./index.scss";

const GameStatistic = ({
    blockTitle,
    children,
    nameClass,
}: IGameStatisticProps) => {
    const classesNames = nameClass
        ? "statistic_block " + nameClass
        : "statistic_block";

    return (
        <div className={classesNames}>
            <h2 className="statistic__title">{blockTitle}</h2>

            <ul className="statistic__list_info">{children}</ul>
        </div>
    );
};

export default GameStatistic;
