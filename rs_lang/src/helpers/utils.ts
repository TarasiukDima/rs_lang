import { TCheckValue } from "../types/common";
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
const _checkInputValue = (val: string, RegEx: RegExp) => {
    return val.match(RegEx);
};

export const validateName = (name: string): string | null => {
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

export const validatePassword = (password: string): string | null => {
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

export const validateEmail = (name: string): string | null => {
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

export const checkFormErrors = (
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

    return !(errEmailText || errPassword || validName );
};
/* start validate form end */
