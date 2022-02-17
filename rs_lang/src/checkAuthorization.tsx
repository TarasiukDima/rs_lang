import React, { Dispatch } from "react";
import { connect } from "react-redux";
import ServiceApi from "./services/services";
import {
    changeRefreshToken,
    changeToken,
    changeUserInformation,
} from "./store/actions/actionsUser";
import { TSimpleTypeFunction } from "./types/common";
import { IChangeUserObject } from "./types/form";
import { IAction, IState } from "./types/redux";

interface ICheckAuthorization {
    authorization: boolean;
    serviceApi: ServiceApi;
    changeUserInfo: TSimpleTypeFunction<IChangeUserObject>;
    changeOldToken: TSimpleTypeFunction<string>;
    changeOldRefreshToken: TSimpleTypeFunction<string>;
}

const CheckAuthorization = ({
    authorization,
    serviceApi,
    changeUserInfo,
    changeOldToken,
    changeOldRefreshToken,
}: ICheckAuthorization) => {
    if (!authorization) {
        return null;
    }
    const { tokenTimeOut, authorizationTimeOut } = serviceApi.checkTimeToken();

    if (authorizationTimeOut) {
        serviceApi.clearInfo();
        changeUserInfo({
            id: "",
            name: "",
            token: "",
            refreshToken: "",
            authorization: false,
            wordsSettings: {},
            time: 0,
        });
        return null;
    }

    const getNewTok = async () => {
        const { data, errorText } = await serviceApi.getNewToken();
        console.log(data, errorText);
    }

    getNewTok();
    if (tokenTimeOut) {
    }


    // id: "",
    // name: "",
    // token: "",
    // refreshToken: "",
    // authorization: false,
    // wordsSettings: {},

    return null;
};

const mapStateToProps = ({ user: { authorization, id, name } }: IState) => ({
    authorization,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeUserInfo: (userInfo: IChangeUserObject) => {
            dispatch(changeUserInformation(userInfo));
        },
        changeOldToken: (token: string) => {
            dispatch(changeToken(token));
        },
        changeOldRefreshToken: (token: string) => {
            dispatch(changeRefreshToken(token));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckAuthorization);
