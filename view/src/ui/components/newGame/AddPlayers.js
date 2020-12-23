import React, {useState} from "react";
import {Button, Col, Container, FormControl, InputGroup, Jumbotron, ListGroup, Row} from "react-bootstrap";
import {isLoaded, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {PersonPlus, Trash} from "react-bootstrap-icons";

function AddPlayers (props){
    const [removingPlayer, setRemovingPlayer] = useState(null);
    const [newPlayerName, setNewPlayerName] = useState('');
    const firestore = useFirestore();
    useFirestoreConnect(() => [
        { collection: `games/${props.gameId}/players`, storeAs : 'players' }
    ])
    const players = useSelector(
        ({ firestore: { data } }) => {
            return data.players ? Object.entries(data.players).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {}) : {}
        }
    )

    async function addPlayer(){
        const playerCount = Object.keys(players).length
        if (newPlayerName){
            await firestore
                .collection('games')
                .doc(props.gameId)
                .collection('players')
                .doc(`${playerCount + 1}-${newPlayerName}`)
                .set({
                    score : 0,
                    rounds : [],
                    currentRound : [null, null, null]
                });
            setNewPlayerName('');
        }
    }

    async function removePlayer(name){
        setRemovingPlayer(name);
        await firestore
            .collection('games')
            .doc(props.gameId)
            .collection('players')
            .doc(name)
            .delete();
        setRemovingPlayer(null)
    }

    async function startGame(){
        await firestore
            .collection('games')
            .doc(props.gameId)
            .update({
                gameStarted : true,
                currentPlayer : Object.keys(players)[0],
                round : 0
            })
    }

    return (
        <>
            <Jumbotron className="pb-1" style={{borderRadius : 0}}>
                <h3>
                    {`${props.game.gameType} - ${props.game.gameVariant}`}
                </h3>
                <p>Nouveau jeu</p>
            </Jumbotron>
            <Container className="flex-grow-1 flex-shrink-1 flex-column overflow-auto" fluid>
                <Container className="px-3">
                    {
                        isLoaded(players) &&
                            <Row>
                                <Col lg={8} sm={12}>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Nom du joueur"
                                            aria-label="Nom du joueur"
                                            className="shadow-none"
                                            onChange={e => setNewPlayerName(e.target.value)}
                                            value={newPlayerName}
                                            onKeyDown={(e) => e.key === 'Enter' ? addPlayer() : null}
                                        />
                                        <InputGroup.Append>
                                            <Button
                                                onClick={addPlayer}
                                                className="shadow-none" variant="outline-secondary"
                                            >
                                                <PersonPlus/>
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <Button
                                        className="shadow-none"
                                        variant={"dark"}
                                        block
                                        onClick={startGame}
                                        disabled={Object.keys(players).length === 0}
                                    >
                                        Start
                                    </Button>
                                </Col>
                            </Row>
                    }
                    {
                        isLoaded(players) && players ?
                            <ListGroup className="pt-3 pt-lg-0">
                                {
                                    Object.keys(players).map(e =>
                                        <ListGroup.Item className="d-flex align-items-center" key={e}>
                                            {e}
                                            <Button disabled={removingPlayer !== null} onClick={() => removePlayer(e)} variant={"outline-dark"} className="ml-auto">
                                                <Trash/>
                                            </Button>
                                        </ListGroup.Item>
                                    )
                                }
                            </ListGroup> : null
                    }
                </Container>
            </Container>
        </>
    )
}

export default AddPlayers;