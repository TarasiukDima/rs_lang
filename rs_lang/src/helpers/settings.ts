import { ITabInfoObj } from "../types/common";

/* main advanteges info start */
import freeImg from "../assets/svg/free.svg";
import gamesImg from "../assets/svg/games.svg";
import ratingImg from "../assets/svg/rating.svg";
import statisticsImg from "../assets/svg/statistics.svg";

export const advantegesInfoArr = [
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
/* main advanteges info end */


/* team start */
import avatar1 from "../assets/img/avatar1.jpg";
import avatar2 from "../assets/img/avatar2.jpg";
export const teamPeoplesArr = [
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
        name: "Димка",
        activity: "Разработал страницы словаря и учебника. Сделал игру Аудиовызов, написал логику для карточек слов.",
        githubLink: "https://github.com/TarasiukDima",
        imgLink: avatar2,
    }
];
/* team end */

/* games start */
import music from "../assets/img/music.jpg";
import fast from "../assets/img/fast.jpg";
import { PageLinks } from "./consts";

export const gamesInfo = [
    {
        gameImg: fast,
        pageLink: PageLinks.gameSprintPage,
        linkName: "Спринт",
    },
    {
        gameImg: music,
        pageLink: PageLinks.gameAudioPage,
        linkName: "Аудио",
    },
];
/* games end */


/* book start */
export const tabsBookInfo: Array<ITabInfoObj> = [
    { id: 0, text: 1, },
    { id: 1, text: 2, },
    { id: 2, text: 3, },
    { id: 3, text: 4, },
    { id: 4, text: 5, },
    { id: 5, text: 6, },
];
/* book end */


/* statistic start */
export const statisticTabsInfo: Array<ITabInfoObj> = [
    { id: 0, text: "Аудиовызов" },
    { id: 1, text: "Спринт" },
];
/* statistic end */

