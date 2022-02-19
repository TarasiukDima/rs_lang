import React, { Component, FC, ReactElement } from "react";
import { ApiContextConsumer } from "../services/servicesContext";
import { IBookLearnProps } from "../types/book";
import { ILogOut, ILogUserProps } from "../types/form";
import { IAudioGameProps, ISprintGameProps } from "../types/game";

type TApiConsumerProps = Omit<TApiResult, "changeUser" | "serviceApi" | "name">;
type TApiResult = IAudioGameProps | ISprintGameProps | ILogOut | ILogUserProps | IBookLearnProps;
type TContextFCWrapper<T> = (Component: T) => (props: Omit<T, "serviceApi">) => JSX.Element;

/////////////////////////////////////////////////
// TODO: remove//////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// HOW DO IT?????????????????????????????????????
// TYPES/////////////////////////////////////////
/////////////////////////////////////////////////

const ApiContextWrapper = (Component) => {
    return function wrapFunction(props) {
        console.log(props);

        return (
            <ApiContextConsumer>
                {(serviceApi) => <Component serviceApi={serviceApi} {...props}/>}
            </ApiContextConsumer>
        );
    };
};

export default ApiContextWrapper;
