import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";

import TabList from "../../components/tabList";
import Loader from "../../components/loader";
import StatisticBlocksInfo from "./StatisticBlocksInfo";
import ApiContextWrapper from "../../hoc/ApiContextWrapper";

import {
    LOCASTORAGE__STATISTIC_PAG,
    LOCASTORAGE__USER_STATISTIC,
} from "../../helpers/consts";
import { statisticTabsInfo } from "../../helpers/settings";
import { changeStatisticTab } from "../../store/actions/actionsPages";
import { IAction, IState } from "../../types/redux";
import {
    IStatisticBlocksInfoData,
    IStatisticContentProps,
} from "../../types/statistic";
import { saveSettingsLocalStorage } from "../../helpers/utils";

const StatisticContent = ({
    statisticTab,
    changeTab,
    serviceApi,
}: IStatisticContentProps) => {
    const [loadingData, setLoadingData] = useState(true);
    const [errorTextData, setErrorTextData] = useState("");
    const [statisticUserData, setStatisticUserData] = useState(
        {} as IStatisticBlocksInfoData
    );

    const getData = async () => {
        const { data, errorText } = await serviceApi.getUseStatistics();
        if (!errorText) {
            setStatisticUserData(data);
            if ("learnedWords" in data && "optional" in data) {
                const { learnedWords, optional } = data;
                saveSettingsLocalStorage(LOCASTORAGE__USER_STATISTIC, {
                    learnedWords,
                    optional,
                });
            }
        } else {
            setErrorTextData(errorText);
        }

        setLoadingData(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const changeHiddenCategoryLink = (id: number) => {
        changeTab(id);
        localStorage.setItem(LOCASTORAGE__STATISTIC_PAG, id.toString());
    };

    return (
        <div className="statistic__content">
            {loadingData ? (
                <Loader />
            ) : errorTextData ? (
                <p>404</p>
            ) : (
                <>
                    <TabList
                        fildCheckActive={statisticTab}
                        listItems={statisticTabsInfo}
                        tabClick={changeHiddenCategoryLink}
                    />

                    <StatisticBlocksInfo
                        activeTab={statisticTab}
                        data={statisticUserData}
                    />
                </>
            )}
        </div>
    );
};

const mapStateToProps = ({ pages: { statisticTab } }: IState) => ({
    statisticTab,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeTab: (id: number) => {
            dispatch(changeStatisticTab(id));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApiContextWrapper(StatisticContent));
