import { IInputsObjInfo } from "../types/form";

export const URL_DATA = "https://dimkalang.herokuapp.com/";
export const URL_DATA_FILES = "https://raw.githubusercontent.com/TarasiukDima/react-rslang-be/main/";
export const SPRINT_GAME_TIME = 60;
export const COUNT_PAGE = 29;
export const PREV_PAGINGATION_TEXT = "&#171;";
export const NEXT_PAGINGATION_TEXT = "&#187;";

export const mainTitleText1 = "Изучай английский язык ";
export const mainTitleText2 = "быстро и с интересом";

export enum PageLinks {
    mainPage = "/",
    authPage = "/auth/",
    loginPage = "/log_in/",
    bookPage = "/book/",
    gamesPage = "/games/",
    gameSprintPage = "/games/sprint",
    gameAudioPage = "/games/audio",
    statisticPage = "/statistic/",
}

/* header start */
export const HeaderLinks = [
    { link: PageLinks.mainPage, textLink: "Главная" },
    { link: PageLinks.gamesPage, textLink: "Игры" },
    { link: PageLinks.bookPage, textLink: "Словарь" },
    { link: PageLinks.statisticPage, textLink: "Статистика" },
];
/* header start */


/* forms start */
export const submitRegistrText = "Зарегистрироваться";

export enum AuthFormText {
    text = 'Если у вас есть аккаунт, тогда войдите в него',
    linkText = 'Войти',
}

export const rgistrFieldsForm: Array<IInputsObjInfo> = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
];

export const submitLoginText = "Войти";

export enum LoginFormText {
    text = 'Если у вас нет аккаунта, тогда зарегистрируйтесь',
    linkText = 'Создать аккаунт',
}

export const loginFieldsForm: Array<IInputsObjInfo> = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
];
/* forms end */


/* utils start */
export const MIN_LENGTH_NAME = 3;
export const MAX_LENGTH_NAME = 15;
export const ERROR_VALIDATE_LENGTH_NAME = `Минимальная длина имени ${MIN_LENGTH_NAME} символа, максимальная ${MAX_LENGTH_NAME}`;
export const ERROR_VALIDATE_LETTERS = "Только буквы";

export const MIN_LENGTH_PASSWORD = 3;
export const MAX_LENGTH_PASSWORD = 15;
export const ERROR_VALIDATE_LENGTH_PASSWORD = `Минимальная длина пароля ${MIN_LENGTH_PASSWORD} символа, максимальная ${MAX_LENGTH_PASSWORD}`;


export const MIN_LENGTH_MAILNAME = 3;
export const MAX_LENGTH_MAILNAME = 16;
export const MIN_LENGTH_DOMAIN1 = 3;
export const MAX_LENGTH_DOMAIN1 = 16;
export const LENGTH_DOMAIN1 = 4;
export const LENGTH_DOMAIN2 = 2;
export const ERROR_VALIDATE_EMAIL_LENGTH = `Минимальная длина имени почты ${MIN_LENGTH_MAILNAME} символа, максимальная ${MAX_LENGTH_MAILNAME}`;
export const ERROR_VALIDATE_DOMAIN = "Только буквы, цифры и '_ -' в домене";
export const ERROR_VALIDATE_DOMAIN_DOG = 'Нужна "@"';
export const ERROR_VALIDATE_DOMAIN_DOT = 'Нужна "." после 1 доменного имени';

export const ERROR_VALIDATE_DOMAIN_LENGTH = `Длинна почты должна быть более ${MIN_LENGTH_DOMAIN1} и меньше ${MAX_LENGTH_DOMAIN1} букв`;
export const ERROR_VALIDATE_DOMAIN1_LETTER = `В 1 доменном имени должно быть не менее ${LENGTH_DOMAIN1} букв`;
export const ERROR_VALIDATE_DOMAIN2_LETTER = `Во 2 доменном имени должно быть не менее ${LENGTH_DOMAIN2} букв`;
/* utils end */
