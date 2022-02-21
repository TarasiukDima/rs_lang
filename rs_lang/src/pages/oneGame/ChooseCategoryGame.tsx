import React from "react";
import ButtonEl from "../../components/button";
import { tabsBookInfo } from "../../helpers/settings";
import { IChooseProps } from "../../types/game";

const ChooseCategoryGame = ({ gameTitle, changeCateAndPage }: IChooseProps) => (
    <>
        <h1 className="title">{gameTitle}</h1>

        <p className="game__choose__text">Вам нужно выбрать категорию.</p>

        <ul className="categories__list">
            {tabsBookInfo.map((item) => (
                <li className="categories__item" key={item.link}>
                    <ButtonEl
                        nameClass="categories__item_link"
                        onclick={() => changeCateAndPage(item.id)}
                    >
                        {item.text}
                    </ButtonEl>
                </li>
            ))}
        </ul>
    </>
);

export default ChooseCategoryGame;
