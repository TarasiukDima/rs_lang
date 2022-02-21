import React from "react";
import { IGameStatisticProps } from "../../types/statistic";

import "./index.scss";

const GameStatistic = ({
    blockTitle,
    nameClass,
    itemsInfoArray,
}: IGameStatisticProps) => {
    const classesNames = nameClass
        ? "statistic_block " + nameClass
        : "statistic_block";

    return (
        <div className={classesNames}>
            <h2 className="statistic__title">{blockTitle}</h2>

            <ul className="statistic__list_info">
                {itemsInfoArray.map((el) => (
                    <li className="statistic__list_item" key={el.id}>
                        <span className="list__item_text">{el.text}</span>
                        <span className="list__item_value">{el.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameStatistic;
