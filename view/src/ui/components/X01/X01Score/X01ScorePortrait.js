import React, {useEffect, useRef} from "react";
import {Card} from "react-bootstrap";
import Slider from "react-slick";

function X01ScorePortrait(props) {
    const {players, game} = props.game
    const slider = useRef(null);
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: Object.keys(players).length > 1 ? 2 : 1,
        slidesToScroll: 1,
        initialSlide: Object.keys(players).indexOf(game.currentPlayer)
    };

    useEffect(() => {
        slider.current.slickGoTo(Object.keys(players).indexOf(game.currentPlayer))
    },[game.currentPlayer]);

    return (
        <Slider {...settings} className="h-100" ref={slider}>
            {Object.keys(players).map(playerName => (
                <Card
                    className={`d-flex flex-column flex-nowrap h-100 ${game.currentPlayer === playerName && 'bg-info'}`}
                    key={`${playerName}-card`}
                >
                    <div className="flex-fill">
                        <div className="d-flex flex-row flex-nowrap h-100">
                            <div className="flex-fill text-center align-self-center">
                                <span style={{fontSize: "10vw"}}>{players[playerName].score}</span>
                            </div>
                            <div className="flex-fill text-center align-self-center">
                                <span style={{fontSize: "6vw", fontWeight: "bold"}}>{playerName.split('-')[1]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-fill">
                        <div className="d-flex flex-row flex-nowrap h-100">
                            {
                                players[playerName].currentRound.map((dart, idx) => (
                                    <div
                                        key={`dart-${playerName}-${idx}`}
                                        className="flex-fill text-center align-self-center"
                                    >
                                        <span style={{fontSize: "4vw"}}>
                                            {idx}
                                        </span>
                                        <br/>
                                        <span style={{fontSize: "6vw", fontWeight: "bold"}}>
                                            {dart ? dart : 'X'}
                                        </span>
                                    </div>
                                ))
                            }
                            {
                            }
                            <div className="flex-fill text-center align-self-center">
                                <span style={{fontSize: "4vw"}}>Total</span>
                                <br/>
                                <span style={{fontSize: "6vw", fontWeight: "bold"}}>
                                    {
                                        players[playerName].currentRound.reduce(
                                            (previous, current) => current ? previous + current : previous
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </Slider>
    )

}

export default X01ScorePortrait;

