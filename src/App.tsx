import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from 'src/views/home'
import H5editor from 'src/views/h5editor'
import Resume from 'src/views/resume'
import Interview from 'src/views/interview'
import './app.css'

const App: React.FC = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/h5editor" component={H5editor} />
                <Route exact path="/resume" component={Resume} />
                <Route exact path="/interview" component={Interview} />
                <Route path="/" component={Home} />
            </Switch>
        </HashRouter>
    )
}

export default App;