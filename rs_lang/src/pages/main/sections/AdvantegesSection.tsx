import React from "react";
import SectionContent from "../../../components/section";
import CardItem from "../../../components/cardItem";
import freeImg from "../../../assets/svg/free.svg";
import gamesImg from "../../../assets/svg/games.svg";
import ratingImg from "../../../assets/svg/rating.svg";
import statisticsImg from "../../../assets/svg/statistics.svg";

const AdvantegesSection = () => {
    const advantegesInfoArr = [
        {
            title: "Бесплатный доступ",
            img: freeImg,
            description: "Обучения английскому абсолютно бесплатное для всех",
        },
        {
            title: "Игры",
            img: gamesImg,
            description: "Обучение в игре очень эффективное для всех возрастов",
        },
        {
            title: "Популярные материалы",
            img: ratingImg,
            description:
                "Тренируйся по актуальным материалам. Библиотека из 4000 часто встречающихся слов",
        },
        {
            title: "Статистика",
            img: statisticsImg,
            description: "Подробная статистика достижений, изученных слов",
        },
    ];

    return (
        <SectionContent nameClass="advanteges__app">
            <h2 className="title">Преимущества приложения</h2>

            <ul className="cards__list">
                {advantegesInfoArr.map((cardInfo) => (
                    <CardItem key={cardInfo.title} {...cardInfo} />
                ))}
            </ul>
        </SectionContent>
    );
};

export default AdvantegesSection;
