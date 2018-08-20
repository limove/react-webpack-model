// 按路由拆分代码
import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

const AsyncIndex = Loadable({
    loader: () => import('../containers/IndexContainer/IndexContainer'),
    loading: MyLoadingComponent
});

export default (
    <Switch>
        <Route exact={true} path="/" component={AsyncIndex} />
        <Route render={() => <div>404</div>} />
    </Switch>
);
