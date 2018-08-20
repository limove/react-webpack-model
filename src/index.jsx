import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import App from './containers/App/App.jsx';

render(
    <HashRouter>
        <Route path="/" component={App} />
    </HashRouter>,
    document.getElementById('root')
);