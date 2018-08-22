import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import routes from './config/routes';

render(
    <HashRouter>
        {routes}
    </HashRouter>,
    document.getElementById('root')
);