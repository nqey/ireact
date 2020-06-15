import React from 'react';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom'
import Home from 'src/views/home'
import H5editor from 'src/views/h5editor'
import Resume from 'src/views/resume'
import Interview from 'src/views/interview'
import PayView from 'src/views/pay'
import './app.css'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/pay/:id" component={PayView} />
                <Route path="/interview" component={Interview} />
                <Route path="/resume" component={Resume} />
                <Route path="/h5editor" component={H5editor} />
                <Route path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;
