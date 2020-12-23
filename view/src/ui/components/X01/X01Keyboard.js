import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useWindowSize} from "@react-hook/window-size";
import {useFirestore} from "react-redux-firebase";

function X01Keyboard (props){
    const [width, height] = useWindowSize({leading : true, wait : 25});
    const screenOrientation = width > height ? 'landscape' : 'portrait'
    //const flexStyle = screenOrientation === 'portrait' ? 3 : 1
    const flexStyle = 3
    const [multiplierValue, setMultiplierValue] = useState(1);
    const {game, players} = props.game
    const gameId = props.game.id
    const firestore = useFirestore();


    const multipliers = [
        { name: 'Simple', value: 1 },
        { name: 'Double', value: 2 },
        { name: 'Triple', value: 3 },
    ];

    async function nextPlayer(){
        let idxNextPlayer = Object.keys(players).indexOf(game.currentPlayer) + 1
        idxNextPlayer = idxNextPlayer === Object.keys(players).length ? 0 : idxNextPlayer
        await firestore
            .collection('games')
            .doc(gameId)
            .collection('players')
            .doc(game.currentPlayer)
            .update({
                currentRound: [null,null,null]
            })
        await firestore
            .collection('games')
            .doc(gameId)
            .update({
                currentPlayer: Object.keys(players)[idxNextPlayer]
            })
    }

    async function addDart(score){
        let dartScore = score * multiplierValue;
        let playerName = game.currentPlayer;
        let round = [...players[playerName].currentRound];
        let rounds = [...players[playerName].rounds];
        let playerScore = players[playerName].score

        let idx = round.indexOf(null);
        console.log({
            dartScore,
            playerName,
            playerScore,
            round,
            rounds,
        })

        // Bust
        if (playerScore + dartScore > game.objective.score){
            round = [0,0,0];
            rounds.push({...round});
            idx = 2;
        }
        else {
            round[idx] = dartScore
            playerScore = playerScore + dartScore;
        }
        if (idx === 2){
            rounds.push({...round});
            round = [null,null,null];
        }

        await firestore
            .collection('games')
            .doc(gameId)
            .collection('players')
            .doc(playerName)
            .update({
                currentRound: round,
                rounds : rounds,
                score : playerScore
            })

        // Last dart, end of round
        if (idx === 2) {
            let playerIdx = Object.keys(players).indexOf(playerName);
            let newPlayerIdx = playerIdx === Object.keys(players).length - 1 ? 0 : playerIdx + 1
            let newPlayer = Object.keys(players)[newPlayerIdx];

            await firestore
                .collection('games')
                .doc(gameId)
                .update({
                    currentPlayer : newPlayer
                })
        }
        if (playerScore === game.objective.score){
            await firestore
                .collection('games')
                .doc(gameId)
                .update({
                    winner : playerName
                })
        }

        setMultiplierValue(1);
    }

    return (
        <div className="p-3" style={{'flex': flexStyle}}>
            <div className="d-flex flex-column flex-grow-1 h-100">
                <div className="d-flex flex-row flex-grow-1">
                    <div className="d-flex flex-row flex-grow-1">
                            {
                                multipliers.map((multiplier, idx) => (
                                    <Button
                                        key={`multiplier-${idx}`}
                                        variant={multiplierValue === multiplier.value ? "dark" : "outline-dark"}
                                        className="m-1 flex-even"
                                        onClick={(e) => setMultiplierValue(multiplier.value)}
                                    >
                                        {multiplier.name}
                                    </Button>
                                ))
                            }
                    </div>
                </div>
                {
                    [1,2,3,4].map((e,v) => (
                        <div key={`score-row-${v}`} className="d-flex flex-row flex-grow-1">
                            {
                                [1,2,3,4,5].map(score => (
                                    <Button
                                        key={`score-button-${(5*v)+score}`}
                                        variant="outline-dark"
                                        className="m-1 flex-even"
                                        onClick={() => addDart((5*v)+score)}
                                    >
                                        {(5*v)+score}
                                    </Button>
                                ))
                            }
                        </div>
                    ))
                }
                <div className="d-flex flex-row flex-grow-1">
                    <Button variant="outline-dark" className="m-1 flex-even" >Undo</Button>
                    <Button variant="outline-dark" className="m-1 flex-even" >T19</Button>
                    <Button variant="outline-dark" className="m-1 flex-even" >T20</Button>
                    <Button variant="outline-dark" className="m-1 flex-even" >BULL</Button>
                    <Button variant="outline-dark" className="m-1 flex-even" >0</Button>
                </div>
            </div>
        </div>
    )
}

export default X01Keyboard;