import { IUserWordsInformation } from "./redux";

export type TFormSubmitFC = (event: React.FormEvent<HTMLFormElement>) => void;

export type TСhangeUserInfo = (newObj: IChangeUserObject) => void;


export interface ILabelForm {
    children: JSX.Element;
    errorText: string;
    nameClass?: string;
}

export interface FormProps {
    submitFunction: TFormSubmitFC;
    submitBtnText: string;
    nameClass?: string;
    children?: JSX.Element;
    needFileButton?: boolean;
}

export interface FormInfoProps {
    text: string;
    pageLink: string;
    textPageLink: string;
    nameClass?: string;
}



export interface IChangeUserObject {
    id: string;
    name: string;
    token: string;
    refreshToken: string;
    authorization: boolean;
    wordsSettings: IUserWordsInformation;
}

export interface ILogUserProps {
    changeUser: TСhangeUserInfo;
}

export interface IFormPageProps extends ILogUserProps {
    name: string;
    authorization: boolean;
    changeUser: TСhangeUserInfo;
}

export interface ILogOut extends ILogUserProps {
    name: string;
}




/* localstorage start */
export interface ILocalStoragUser extends IChangeUserObject {
    email: string;
    time?: number;
}
/* localstorage end */

