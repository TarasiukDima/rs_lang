import React from "react";
import PeopleCard from "../../../components/peopleCard";
import SectionContent from "../../../components/section";
import { teamPeoplesArr } from "../../../helpers/settings";


const TeamSection = () => {
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
