import React from "react";
import PeopleCard from "../../../components/peopleCard";
import SectionContent from "../../../components/section";

import avatar1 from "../../../assets/img/avatar1.jpg";
import avatar2 from "../../../assets/img/avatar2.jpg";

const TeamSection = () => {
    const teamPeoplesArr = [
        {
            name: "Дмитрий",
            activity:
                "Тимлид, разработал архитектуру приложения и руководил командой. Разработал дизайн приложения.",
            githubLink: "https://github.com/TarasiukDima",
            imgLink: avatar1,
        },
        {
            name: "Дима",
            activity:
                "Разработал игры Саванна и Спринт, сделал страницу статистики.",
            githubLink: "https://github.com/TarasiukDima",
            imgLink: avatar2,
        },
        {
            name: "Дмитрий",
            activity: "Разработал страницы словаря и учебника. Сделал игру Аудиовызов, написал логику для карточек слов.",
            githubLink: "https://github.com/TarasiukDima",
            imgLink: avatar2,
        }
    ];

    return (
        <SectionContent nameClass="dream__team">
            <h2 className="title">Команда</h2>

            <ul className="team__list">
                {teamPeoplesArr.map((peopleInfo) => (
                    <PeopleCard key={peopleInfo.activity} {...peopleInfo} />
                ))}
            </ul>
        </SectionContent>
    );
};

export default TeamSection;
