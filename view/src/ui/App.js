import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import {PrivateRoute} from './hoc/PrivateRoute';
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewGame from "./pages/NewGame";
import Game from "./pages/Game";
import Test from "./pages/Test";

const App = () => {
    return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path="/newgame" comp={NewGame}/>
                    <PrivateRoute exact path="/game/:id" ><Game/></PrivateRoute>
                    <Route path="/test"><Test/></Route>
                    <Route path="/" exact={true} component={Home} />
                </Switch>
            </BrowserRouter>
    );
};

export default App;
