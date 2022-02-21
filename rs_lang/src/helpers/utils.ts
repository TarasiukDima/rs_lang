import {
    TCheckFormErrors,
    TCheckInputValue,
    TCheckLocalObj,
    TCheckValue,
    TSaveLocalSettings,
    TSimpleTypeFunction,
    TValidateLocalObj,
    TValidateString,
} from "../types/common";
import { ILocalStoragUser } from "../types/form";
import { IStatisticGameState } from "../types/redux";
import {
    ERROR_VALIDATE_DOMAIN,
    ERROR_VALIDATE_DOMAIN1_LETTER,
    ERROR_VALIDATE_DOMAIN2_LETTER,
    ERROR_VALIDATE_DOMAIN_DOG,
    ERROR_VALIDATE_DOMAIN_DOT,
    ERROR_VALIDATE_DOMAIN_LETTER,
    ERROR_VALIDATE_EMAIL_LENGTH,
    ERROR_VALIDATE_LENGTH_NAME,
    ERROR_VALIDATE_LENGTH_PASSWORD,
    ERROR_VALIDATE_LETTERS,
    LENGTH_DOMAIN1,
    MAX_LENGTH_MAILNAME,
    MAX_LENGTH_NAME,
    MAX_LENGTH_PASSWORD,
    MIN_LENGTH_MAILNAME,
    MIN_LENGTH_NAME,
    MIN_LENGTH_PASSWORD,
} from "./consts";

export const checkValue: TCheckValue = (
    value: number,
    comparisonValue: number,
    varient: "more" | "less" = "more"
): boolean => {
    if (varient === "more") {
        return value >= comparisonValue;
    }

    return value <= comparisonValue;
};

/* start validate form start */
const _checkInputValue: TCheckInputValue = (val: string, RegEx: RegExp) => {
    return val.match(RegEx);
};

export const validateName: TValidateString = (name: string): string | null => {
    const inputValue = name.trim();
    const RegEx = /[^\dа-яА-ЯЁё-іa-zA-Z\s]+/gm;
    const failInput = _checkInputValue(inputValue, RegEx);

    if (failInput) return ERROR_VALIDATE_LETTERS;

    if (
        inputValue &&
        (inputValue.length < MIN_LENGTH_NAME ||
            inputValue.length > MAX_LENGTH_NAME)
    ) {
        return ERROR_VALIDATE_LENGTH_NAME;
    }

    return null;
};

export const validatePassword: TValidateString = (
    password: string
): string | null => {
    const inputValue = password.trim();

    if (
        inputValue &&
        (inputValue.length < MIN_LENGTH_PASSWORD ||
            inputValue.length > MAX_LENGTH_PASSWORD)
    ) {
        return ERROR_VALIDATE_LENGTH_PASSWORD;
    }

    return null;
};

export const validateEmail: TValidateString = (name: string): string | null => {
    const inputValue = name.trim();
    const RegEx = /[\w\d\_\-]{3,16}@[a-z]{4,}\.[a-z]{2,}/gm;
    const RegExDontLetter = /[^\-\_][\W\s]/gm;
    const failInput = _checkInputValue(inputValue, RegEx);

    if (inputValue) {
        const arrInp = inputValue.split("@");
        // name length
        if (
            arrInp[0].length > MAX_LENGTH_MAILNAME ||
            arrInp[0].length < MIN_LENGTH_MAILNAME
        )
            return ERROR_VALIDATE_EMAIL_LENGTH;

        // only letter and numbers and - _
        if (_checkInputValue(arrInp[0], RegExDontLetter))
            return ERROR_VALIDATE_DOMAIN;

        // don't @
        if (arrInp.length < 2) return ERROR_VALIDATE_DOMAIN_DOG;

        const arrDomain = arrInp[1].split(".");
        // dot
        if (arrDomain.length < 2) return ERROR_VALIDATE_DOMAIN_DOT;

        // 1 domain length
        if (arrDomain[0].length < LENGTH_DOMAIN1)
            return ERROR_VALIDATE_DOMAIN1_LETTER;

        // 2 domain length
        if (arrDomain[1].length < 2) return ERROR_VALIDATE_DOMAIN2_LETTER;

        // don't letter and numbers and - _
        if (!failInput || arrInp[0] === inputValue)
            return ERROR_VALIDATE_DOMAIN_LETTER;
    }

    return null;
};

export const checkFormErrors: TCheckFormErrors = (
    textEmail: string,
    cbEmail: (st: string) => void,
    textPassword: string,
    cbPassword: (st: string) => void,
    textName?: string,
    cbName?: (st: string) => void
) => {
    const errEmailText = validateEmail(textEmail);
    const errPassword = validatePassword(textPassword);
    let validName = null;

    errEmailText ? cbEmail(errEmailText) : cbEmail("");
    errPassword ? cbPassword(errPassword) : cbPassword("");

    if (textName && cbName) {
        validName = validateName(textName);
        validName ? cbName(validName) : cbName("");
    }

    return !(errEmailText || errPassword || validName);
};
/* start validate form end */

/* locastorage start */
export const saveSettingsLocalStorage: TSaveLocalSettings = (
    name: string,
    infoObj: ILocalStoragUser | IStatisticGameState
): void => {
    const stringObj: string = JSON.stringify(infoObj);
    localStorage.setItem(name, stringObj);
};

export const removeSettingsLocalStorage: TSimpleTypeFunction<string> = (
    name: string
): void => {
    localStorage.removeItem(name);
};

export const checkFielsdInObjFromLocalStorage: TValidateLocalObj = (
    obj: object,
    arrayKeys: Array<string>
): boolean => {
    const compareArr = arrayKeys.filter((key) => key in obj).length;
    return compareArr === arrayKeys.length;
};

export const checkSettingsLocalStorage: TCheckLocalObj = (
    name: string,
    arrayKeys: Array<string>
): null | ILocalStoragUser => {
    const storageString: string | null = localStorage.getItem(name);
    if (!storageString) return null;
    const localObj = JSON.parse(storageString);

    if (!checkFielsdInObjFromLocalStorage(localObj, arrayKeys)) return null;

    return localObj;
};
/* locastorage end */


/* return random number include max start */
export const randInt = (max: number, min: number) => Math.floor(Math.random() * (max - min + 1)) + min;
/* return random number include max end */


/* array random indexes start */
export const randomArrayNumbers = (countElements: number, maxNumber: number, excludeNumber?: number) => {
    if (maxNumber === 0 || countElements === 0) return [];

    const indexSet = new Set();

    while (indexSet.size < countElements) {
        const ind: number = randInt(maxNumber, 0);
        if (excludeNumber && excludeNumber > -1 && ind === excludeNumber ) {
            continue;
        }
        indexSet.add(ind);
    }

    return Array.from(indexSet);
};
/* array random indexes end */
