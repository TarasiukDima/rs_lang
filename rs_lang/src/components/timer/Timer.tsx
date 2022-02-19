import React, { useEffect, useState } from "react";
import "./index.scss";

interface ITimerProps {
    timeTimer: number;
}

const Timer = ({ timeTimer }: ITimerProps) => {
    const [time, setTime] = useState(timeTimer);

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
