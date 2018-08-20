import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import App from './containers/App/App.jsx';

render(
    <HashRouter>
        {routes}
    </HashRouter>,
    document.getElementById('root')
);