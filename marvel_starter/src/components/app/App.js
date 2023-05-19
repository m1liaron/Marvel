import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {MainPage, ComicsPage} from '../pages'
import AppHeader from "../appHeader/AppHeader";


const App = () => {

    const bober = 0;

        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Switch>
                            <Route exact path="/">
                                <MainPage/>
                            </Route>

                            <Route exact path="/comics">
                                <ComicsPage/>
                            </Route>
                        </Switch>
                    </main>
                </div>
            </Router>
        )
    }

export default App;