// 按路由拆分代码
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import App from '../containers/App/App.jsx';

// 组件加载
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

// 懒加载
const AsyncIndex = Loadable({
    loader: () => import('../containers/IndexContainer/IndexContainer'),
    loading: MyLoadingComponent
});

// 路由配置
const WrappedApp = (props) => (
    <App {...props}>
        <Switch>
            <Route exact={true} path="/" component={AsyncIndex} />
            <Route render={() => <div>404</div>} />
        </Switch>
    </App>
);

export default (
    <Route path="/" component={WrappedApp} />
);
