/* eslint-disable */
import React from "react";
import { ApiContextConsumer } from "../services/servicesContext";

/////////////////////////////////////////////////
// TODO: remove//////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// HOW DO IT?????????????????????????????????????
// TYPES/////////////////////////////////////////
/////////////////////////////////////////////////

// @ts-ignore
const ApiContextWrapper = (Component: any) => {
    // : TApiConsumerProps
    return function wrapFunction(props: any) {
        return (
            <ApiContextConsumer>
                {(serviceApi) => <Component serviceApi={serviceApi} {...props}/>}
            </ApiContextConsumer>
        );
    };
};

export default ApiContextWrapper;
