import React from "react";
import Toolbar from "../components/Toolbar";
import {isLoaded, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import AddPlayers from "../components/newGame/AddPlayers";
import '../../css/style.css';
import X01 from "./Games/X01";

function Game(props){
    const gameId = props.match.params.id;
    const firestore = useFirestore();
    useFirestoreConnect(() => [
        { collection: 'games', doc: gameId },
        { collection: `games/${gameId}/players`, storeAs : 'players' }
    ])
    const game = useSelector(
        ({ firestore: { data } }) => data.games && data.games[gameId]
    )
    const players = useSelector(
        ({ firestore: { data } }) => {
            return data.players ? Object.entries(data.players).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {}) : []
        }
    )

    return (
        <>
            <Toolbar/>
            {
                isLoaded(game) && isLoaded(players) && !game.gameStarted &&
                <AddPlayers game={game} gameId={gameId}/>
            }
            {
                isLoaded(game) && isLoaded(players) && game.gameStarted &&
                <>
                    <X01 game={{id : gameId, game : game, players : players}}/>
                </>
            }
        </>
    )
}

export default Game;