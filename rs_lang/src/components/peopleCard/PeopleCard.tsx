import React from "react";
import "./index.scss";

interface PeopleCardProps {
    name: string;
    activity: string;
    githubLink: string;
    imgLink: string;
}

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
