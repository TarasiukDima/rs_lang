import React from "react";
import SectionContent from "../../../components/section";
import CardItem from "../../../components/advantegestem";
import { advantegesInfoArr } from "../../../helpers/settings";

const AdvantegesSection = () => {
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
