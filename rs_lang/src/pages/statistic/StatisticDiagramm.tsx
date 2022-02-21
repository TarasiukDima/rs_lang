import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import { ISTATDiagrammProps } from "../../types/statistic";

const StatisticDiagramm = ({ data }: ISTATDiagrammProps) => {
    const dataKeys = Object.keys(data).sort();
    const labels = dataKeys.map((date) => {
        const dat = new Date(date);
        return `${dat.getDate()}, ${dat.getMonth() + 1}, ${dat.getFullYear()}`;
    });

    const optionsChar = {
        responsive: true,
        maintainAspectRation: false,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
            title: {
                display: true,
                text: "Изученные и новые слова",
            },
        },
    };

    const dataOptionsChar = {
        labels: labels,
        datasets: [
            {
                label: "Изученные слова",
                data: dataKeys.map((dataEl) => data[dataEl].learnedWords),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 1)",
            },
            {
                label: "Новые cлова",
                data: dataKeys.map((dataEl) => data[dataEl].countNewWords),
                backgroundColor: "rgba(255, 99, 132, 1)",
                borderColor: "rgb(255, 99, 132)",
            },
        ],
    };

    return (
        <div className="diagrams__wrap">
            <Line
                className="statistic__canvas"
                options={optionsChar}
                data={dataOptionsChar}
            />
        </div>
    );
};

export default StatisticDiagramm;
