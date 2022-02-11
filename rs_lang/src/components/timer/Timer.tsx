import React, { useEffect, useState } from "react";
import { SPRINT_GAME_TIME } from "../../helpers/consts";
import "./index.scss";

const Timer = () => {
    const [time, setTime] = useState(SPRINT_GAME_TIME);

    // useEffect(() => {
    //     const timeId = setInterval(() => {
    //         time > 0 ? setTime(time - 1) : clearInterval(timeId);
    //     }, 1000);

    //     return () => {
    //         clearInterval(timeId);
    //     };
    // }, [time]);

    return <div className="timer">{time}</div>;
};

export default Timer;
