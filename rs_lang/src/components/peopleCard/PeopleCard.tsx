import React from "react";
import { PeopleCardProps } from "../../types/common";
import "./index.scss";

const PeopleCard = ({
    name,
    imgLink,
    githubLink,
    activity,
}: PeopleCardProps) => {
    return (
        <li className="team__item">
            <div className="item__img">
                <img src={imgLink} alt={"фотография " + name} />
            </div>

            <div className="content__wrap">
                <p className="item__title">{name}</p>
                <p className="item__description">{activity}</p>
                <a
                    className="item__link_github"
                    href={githubLink}
                    target="_blank"
                    rel="noreferrer"
                ></a>
            </div>
        </li>
    );
};

export default PeopleCard;
