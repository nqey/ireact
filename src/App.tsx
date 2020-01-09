import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from 'src/views/home'
import H5editor from 'src/views/h5editor'
import './app.css'

const App: React.FC = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/h5editor" component={H5editor} />
                <Route path="/" component={Home} />
            </Switch>
        </HashRouter>
    )
}

export default App;