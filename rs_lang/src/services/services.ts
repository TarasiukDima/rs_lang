import {
    COUNT_TOKEN_REFRESH,
    COUNT_TOKEN_WORK,
    LOCASTORAGE__NAME_USER,
    URL_DATA,
} from "../helpers/consts";
import { USER_LOCAL_KEYS } from "../helpers/settings";
import { checkSettingsLocalStorage } from "../helpers/utils";
import {
    ApiUrls,
    ErrorMessages,
    IApiGameWordsObj,
    IApiOptions,
    IApiUserInfo,
    IApiWordsObj,
    ICreateUserWord,
    IHeaders,
    ISettingsData,
    IUserCreateForm,
    IUserLogInForm,
    TOptionsMethods,
} from "../types/api";
import { ILocalStoragUser } from "../types/form";
import { IStatisticGameState } from "../types/redux";

class ServiceApi {
    time: number;
    token: string;
    refreshToken: string;
    idUser: string;
    difficult: "normal";

    constructor() {
        this.time = 0;
        this.token = "";
        this.refreshToken = "";
        this.idUser = "";
        this.difficult = "normal";
    }

    init = () => {
        this.checkLocalStorage();
    };

    private changeUserInfo = ({
        token,
        userId,
        refreshToken,
        time,
    }: IApiUserInfo) => {
        if (time) {
            this.time = time;
        }
        this.token = token;
        this.refreshToken = refreshToken;
        this.idUser = userId;
    };

    private changeOptions = (
        method: TOptionsMethods,
        body: string
    ): IApiOptions => {
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

        if (this.token) {
            options.withCredentials = true;
            (options.headers as IHeaders)[
                "Authorization"
            ] = `Bearer ${this.token}`;
        }
        return options;
    };

    private checkLocalStorage = () => {
        const answer = checkSettingsLocalStorage(
            LOCASTORAGE__NAME_USER,
            USER_LOCAL_KEYS
        ) as ILocalStoragUser;

        if (answer) {
            this.time = answer.time || 0;
            this.token = answer.token;
            this.refreshToken = answer.refreshToken;
            this.idUser = answer.id;
        }
    };

    private getData = async (
        stingSearch: string,
        method: TOptionsMethods = "GET",
        body: string | "" = ""
    ) => {
        const url = URL_DATA + stingSearch;
        const options = this.changeOptions(method, body);

        return await fetch(url, options).then((response) => {
            if (!response.ok) {
                throw new Error(`Bad url:${url}`);
            }
            return response.json();
        });
    };

    public checkTimeToken = () => {
        const now = new Date().getTime();
        const timeOutToken = now - COUNT_TOKEN_WORK > this.time;
        const timeAuthorization = now - COUNT_TOKEN_REFRESH > this.time;

        console.log("now", now);
        console.log("time", this.time);
        console.log("minus", now - this.time);

        return {
            tokenTimeOut: timeOutToken,
            authorizationTimeOut: timeAuthorization,
        };
    };
    public clearInfo = () => {
        this.changeUserInfo({
            time: 0,
            token: "",
            refreshToken: "",
            userId: "",
        });
    };

    /* user start */
    public createUser = async (user: IUserCreateForm) => {
        const data = JSON.stringify(user);
        return await this.getData(ApiUrls.createUser, "POST", data)
            .then((data) => {
                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { data: null, errorText: ErrorMessages.createUser };
            });
    };

    public getNewToken = async () => {
        const urlString = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.tokens}`;
        return await this.getData(urlString, "GET")
            .then((data) => {
                console.log(data);
                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { data: null, errorText: ErrorMessages.getToken };
            });
    };

    public logInUser = async (user: IUserLogInForm) => {
        const data = JSON.stringify(user);
        return await this.getData(ApiUrls.signInUser, "POST", data)
            .then((data) => {
                const date = new Date().getTime();
                this.changeUserInfo({
                    token: data.token,
                    userId: data.userId,
                    refreshToken: data.refreshToken,
                    time: date,
                });

                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { data: null, errorText: ErrorMessages.authorization };
            });
    };

    public logOut = () => {
        this.changeUserInfo({
            token: "",
            userId: "",
            refreshToken: "",
            time: 0,
        });
    };
    /* user end */

    /* words start */
    public getWords = async (
        group: number,
        page: number
    ): Promise<IApiWordsObj> => {
        const urlString = `${ApiUrls.words}?group=${group}&page=${page}`;

        return await this.getData(urlString)
            .then((words) => {
                return {
                    data: words,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { errorText: ErrorMessages.getWords, data: [] };
            });
    };

    public getGameWords = async (group: number, page: number, varient: boolean): Promise<IApiGameWordsObj | IApiWordsObj> => {
        const requests = [];
        const groupNumber = group ? group : 0;
        let pageNumber = page ? page : 29;

        if (varient) {
            return await this.getWords(group, page);
        }

        while (pageNumber >= 0) {
            const urlString = `${
                URL_DATA + ApiUrls.words
            }?group=${groupNumber}&page=${pageNumber}`;
            requests.push(fetch(urlString));
            pageNumber--;
        }
        return await Promise.all(requests)
            .then(responses => Promise.all(responses.map(r => r.json())))
            .then((data) => {
                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { errorText: ErrorMessages.getWords, data: [] };
            });
    };
    /* words end */

    /* user words start */
    public getUserAllWords = async () => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.words}`;
        return await this.getData(url, "GET", "")
            .then((data) => {
                return {
                    data: [...data],
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { errorText: ErrorMessages.getUserAllWords, data: [] };
            });
    };

    public createUserWord = async ({
        wordId,
        wordOptions,
    }: ICreateUserWord) => {
        const options = {
            difficulty: this.difficult,
            optional: wordOptions,
        };
        return await this.getData(
            `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.words}/${wordId}`,
            "POST",
            JSON.stringify(options)
        )
            .then((data) => {
                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { data: null, errorText: ErrorMessages.createUserWord };
            });
    };

    public updateUserWord = async ({
        wordId,
        wordOptions,
    }: ICreateUserWord) => {
        const options = {
            difficulty: this.difficult,
            optional: wordOptions,
        };

        return await this.getData(
            `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.words}/${wordId}`,
            "PUT",
            JSON.stringify(options)
        )
            .then((data) => {
                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { data: null, errorText: ErrorMessages.updateUserWord };
            });
    };

    public deleteUserWord = async (wordId: string) => {
        return await this.getData(
            `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.words}/${wordId}`,
            "DELETE",
            ""
        )
            .then((data) => {
                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { data: null, errorText: ErrorMessages.deleteUserWord };
            });
    };

    public getUserWord = async (wordId: string) => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.words}/${wordId}`;
        return await this.getData(url, "GET", "")
            .then((data) => {
                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { data: null, errorText: ErrorMessages.getUserWord };
            });
    };
    /* user words end */

    /* user agregates start */
    public getUserAggregatedWords = async (varient: number) => {
        const filter =
            varient === 0
                ? encodeURI(
                      '{ "$and": [{"userWord.difficulty":"normal", "userWord.optional.difficult":true}]}'
                  )
                : encodeURI(
                      '{ "$and": [{"userWord.difficulty":"normal", "userWord.optional.learned":true}]}'
                  );

        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.aggregatedWords}?filter=${filter}&wordsPerPage=3600`;

        return await this.getData(url, "GET")
            .then((data) => {
                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return {
                    data: null,
                    errorText: ErrorMessages.getUserAggregatedWords,
                };
            });
    };
    /* user agregates end */

    /* user statistic start */
    public getUseStatistics = async () => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.statistics}`;
        return await this.getData(url, "GET", "")
            .then((data) => {
                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return {
                    data: null,
                    errorText: ErrorMessages.getUseStatistics,
                };
            });
    };

    public updateUseStatistics = async (optionsUpdate: IStatisticGameState) => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.statistics}`;
        return await this.getData(url, "PUT", JSON.stringify(optionsUpdate))
            .then((data) => {
                console.log('updateUseStatistics', data);

                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return {
                    data: null,
                    errorText: ErrorMessages.ulpdateUseStatistics,
                };
            });
    };
    /* user statistic end */

    /* user settings start */
    public getUseSettings = async () => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.settings}`;
        return await this.getData(url, "GET", "")
            .then((data) => {
                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { data: null, errorText: ErrorMessages.getUseSettings };
            });
    };

    public updateUseSettings = async (optionsUpdate: ISettingsData) => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.settings}`;
        return await this.getData(url, "PUT", JSON.stringify(optionsUpdate))
            .then((data) => {
                return {
                    data: data,
                    errorText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return {
                    edata: null,
                    rrorText: ErrorMessages.updateUseSettings,
                };
            });
    };
    /* user settings end */
}

export default ServiceApi;
