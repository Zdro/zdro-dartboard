import React from 'react';
import X01ScorePortrait from "./X01ScorePortrait";
import X01ScoreLandscape from "./X01ScoreLandscape";
import {useWindowSize} from "@react-hook/window-size";

function XO1Score(props){
    const [width, height] = useWindowSize({leading : true, wait : 25});

    const screenOrientation = width > height ? 'landscape' : 'portrait'// useScreenOrientation().startsWith('portrait') ? 'portrait' : 'landscape'
    return (
        <div className="pt-2 px-3" style={{flex : '1'}}>
            {screenOrientation === 'portrait' ? <X01ScorePortrait {...props}/> : <X01ScoreLandscape {...props} />}
        </div>
    )
}

export default XO1Score;