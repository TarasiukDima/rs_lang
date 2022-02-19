import React, { useState } from "react";
import { SPRINT_GAME_TIME } from "../../helpers/consts";
import Timer from "../timer";
import SprintBlock from "./SprintBlock";
import "./index.scss";

const SprintGame = () => {
    const [points, setPoints] = useState(0);

    return (
        <>
            <div className="sprint__game_head">
                <Timer timeTimer={SPRINT_GAME_TIME} />

                <p className="total__poinst">
                    Очки: <span>{points}</span>
                </p>
            </div>

            <SprintBlock />
        </>
    );
};

export default SprintGame;

// const mapStateToProps = ({ game: { gamePage, gameCategory } }: IState) => ({
//     gamePage,
//     gameCategory,
// });

// const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
//     return {
//         changeGameCat: (id: number | null) => {
//             dispatch(changeGameCategory(id));
//         },
//         changeGamePage: (id: number | null) => {
//             dispatch(changeGamePage(id));
//         },
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(OneGame);
