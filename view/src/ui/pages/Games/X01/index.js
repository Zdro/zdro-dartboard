import React from 'react';
import X01Score from "../../../components/X01/X01Score";
import X01Keyboard from "../../../components/X01/X01Keyboard";
import {useWindowSize} from "@react-hook/window-size";
import {Jumbotron} from "react-bootstrap";

function X01 (props) {
    const [width, height] = useWindowSize({leading : false, wait : 25});
    const screenOrientation = width > height ? 'landscape' : 'portrait'
    const {game} = props.game

    //const flexDirection = screenOrientation === 'portrait' ? 'flex-column' : 'flex-row';
    const flexDirection = 'flex-column';
    if (game.winner) {
        return (
            <Jumbotron className="pb-1" style={{borderRadius : 0}}>
                <h1>
                    {`${game.winner} a gagné !`}
                </h1>
            </Jumbotron>
        )
    }

    return (
        <>
            <div className={`d-flex ${flexDirection} flex-grow-1 h-100`}>
                <X01Score {...props} />
                <X01Keyboard {...props} />
            </div>
        </>
    )
}

export default X01;
