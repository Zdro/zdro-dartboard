import React from "react";
import {Button} from "react-bootstrap";

import {isEmpty, isLoaded, useFirebase, useFirestore} from 'react-redux-firebase'
import {useHistory} from "react-router";
import {useSelector} from "react-redux";

function NewGame(){
    const firestore = useFirestore();
    const firebase = useFirebase();
    const history = useHistory();
    const auth = useSelector(state => state.firebase.auth)

    async function createNewGame() {
        let game = await firestore
            .collection('games')
            .add({
                gameStarted : false,
                gameType : 'X01',
                gameVariant : '301',
                currentPlayer : null,
                round : null,
                winner : null,
                objective : {
                    score : 301
                },
                createdAt : Date.now(),
                createdBy : firebase.auth().currentUser.uid
            });

        await firestore.collection(`games/${game.id}/players`);
        history.push(`/game/${game.id}`);
    }

    return (
        isLoaded(auth) && !isEmpty(auth) &&
        <Button variant="dark" size="lg" block onClick={createNewGame}>
            <h3 className="mb-0 p-3">Nouveau jeu</h3>
        </Button>
    )
}
export default NewGame;