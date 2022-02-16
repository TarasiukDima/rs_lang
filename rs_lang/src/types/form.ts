import ServiceApi from "../services/services";
import { IUserWordsInformation } from "./redux";

export type TFormSubmitFC = (event: React.FormEvent<HTMLFormElement>) => void;
export type TСhangeUserInfo = (newObj: IChangeUserObject) => void;

export interface IChangeUserObject {
    id: string;
    name: string;
    token: string;
    refreshToken: string;
    authorization: boolean;
    wordsSettings: IUserWordsInformation;
}

export interface IFormPageProps {
    name: string;
    authorization: boolean;
    changeUser: TСhangeUserInfo;
}

export interface ILogUserProps {
    changeUser: TСhangeUserInfo;
    serviceApi: ServiceApi;
}

export interface ILogOut extends ILogUserProps {
    name: string;
}

export interface ILabelForm {
    children: JSX.Element;
    errorText: string;
    nameClass?: string;
}

export interface FormInfoProps {
    text: string;
    pageLink: string;
    textPageLink: string;
    nameClass?: string;
}

/* localstorage start */
export interface ILocalStoragUser extends IChangeUserObject {
    email: string;
    time?: number;
}
/* localstorage end */
