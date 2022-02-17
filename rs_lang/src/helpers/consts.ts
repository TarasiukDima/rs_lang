export const URL_DATA = "https://dimkalang.herokuapp.com/";
export const URL_DATA_FILES =
    "https://raw.githubusercontent.com/TarasiukDima/react-rslang-be/main/";

export const SPRINT_GAME_TIME = 60;
export const COUNT_PAGE = 29;

export const COUNT_TOKEN_REFRESH = 86400000;
export const COUNT_TOKEN_WORK = 16200000;

export const PREV_PAGINGATION_TEXT = "&#171;";
export const NEXT_PAGINGATION_TEXT = "&#187;";

export const LOCASTORAGE__NAME_USER = "user_data";
export const LOCASTORAGE__VOC_CAT = "book_category";
export const LOCASTORAGE__VOC_PAG = "book_page";
export const LOCASTORAGE__VOC_HIDDEN_TAB = "book_tab";
export const LOCASTORAGE__STATISTIC_PAG = "statistic";
export const LOCASTORAGE__NAME_SETTINGS = "rs_lang";

export const mainTitleText1 = "Изучай английский язык ";
export const mainTitleText2 = "быстро и с интересом";

export enum PageLinks {
    mainPage = "/",
    authPage = "/auth/",
    loginPage = "/log_in/",
    bookPage = "/book/",
    vocabularyPage = "/vocabulary/",
    gamesPage = "/games/",
    gameSprintPage = "/games/sprint",
    gameAudioPage = "/games/audio",
    statisticPage = "/statistic/",
}

export const NUMBER_HIDDEN_CATEGORY = 6;
export const NAME_HIDDEN_CATEGORY = "Список слов";

/* forms start */
export const submitRegistrText = "Зарегистрироваться";
export const submitLoginText = "Войти";

export enum AuthFormText {
    text = "Если у вас есть аккаунт, тогда войдите в него",
    linkText = "Войти",
}

export enum LoginFormText {
    text = "Если у вас нет аккаунта, тогда зарегистрируйтесь",
    linkText = "Создать аккаунт",
}
/* forms end */

/* utils start */
export const MIN_LENGTH_NAME = 3;
export const MAX_LENGTH_NAME = 15;
export const ERROR_VALIDATE_LENGTH_NAME = `Минимальная длина имени ${MIN_LENGTH_NAME} символа, максимальная ${MAX_LENGTH_NAME}`;
export const ERROR_VALIDATE_LETTERS = "Только буквы и цыфры";

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
export const ERROR_VALIDATE_DOMAIN_LETTER =
    "Не верный email (name@domain.domain2)";

export const ERROR_VALIDATE_DOMAIN_LENGTH = `Длинна почты должна быть более ${MIN_LENGTH_DOMAIN1} и меньше ${MAX_LENGTH_DOMAIN1} букв`;
export const ERROR_VALIDATE_DOMAIN1_LETTER = `В 1 доменном имени должно быть не менее ${LENGTH_DOMAIN1} букв`;
export const ERROR_VALIDATE_DOMAIN2_LETTER = `Во 2 доменном имени должно быть не менее ${LENGTH_DOMAIN2} букв`;
/* utils end */
