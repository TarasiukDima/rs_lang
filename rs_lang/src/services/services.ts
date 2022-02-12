import { URL_DATA } from "../helpers/consts";
import {
    ApiUrls,
    ErrorMessages,
    IApiOptions,
    IHeaders,
    IUserCreateForm,
    IUserLogInForm,
    TOptionsMethods,
} from "../types/api";

const _getData = async (
    stingSearch: string,
    method: TOptionsMethods = "GET",
    body = "",
    token = "",
) => {
    const url = URL_DATA + stingSearch;
    const options: IApiOptions = {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = body;
    }
    if (token) {
        (options.headers as IHeaders )['Authorization']= `Bearer ${token}`;
    }

    return await fetch(url, options).then((response) => {
        if (!response.ok) {
            throw new Error(`Bad url:${url}`);
        }
        return response.json();
    });
};

/* words start */
export const getWords = async (group: number, page: number) => {
    const urlString = `${ApiUrls.words}?group=${group}&page=${page}`;

    return await _getData(urlString).catch((error) =>
        console.error(error, ErrorMessages.getWords)
    );
};
/* words end */

/* user start */
export const createUser = async (user: IUserCreateForm) => {
    const data = JSON.stringify(user);
    return await _getData(ApiUrls.createUser, "POST", data)
        .then((data) => {
        return {
            ...data,
            errorText: null,
        };
    })
    .catch((error) => {
        console.error(error);
        return { id: null, errorText: ErrorMessages.createUser };
    });
};

export const getToken = async (id: string) => {
    const urlString = `${ApiUrls.createUser}/${id}/tokens`;

    return await _getData(urlString).catch((error) =>
        console.error(error, ErrorMessages.getToken)
    );
};

export const logInUser = async (user: IUserLogInForm) => {
    const data = JSON.stringify(user);

    return await _getData(ApiUrls.signInUser, "POST", data)
        .then((data) => {
            return {
                ...data,
                errorLoginText: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorLoginText: ErrorMessages.authorization };
        });
};
/* user end */
