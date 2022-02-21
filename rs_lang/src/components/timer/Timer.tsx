import React, { useEffect, useState } from "react";
import { ITimerProps } from "../../types/game";

import "./index.scss";


const Timer = ({ timeTimer, cbEnd }: ITimerProps) => {
    const [time, setTime] = useState(timeTimer);

    useEffect(() => {
        const timeId = setInterval(() => {
            time > 0 ? setTime(time - 1) : clearInterval(timeId);
        }, 1000);

        if (time <= 0) {
            cbEnd(true);
        }

        return () => {
            clearInterval(timeId);
        };
    }, [time]);

    return <div className="timer">{time}</div>;
};

export default Timer;
