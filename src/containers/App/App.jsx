import React, { Component } from 'react';
import moment from 'moment';
import './App.less';
moment.locale('zh-cn');

class App extends Component {
    constructor(props) {
        super(props);
        //记录当前环境变量
        window.localStorage.setItem('NODE_ENV', process.env.NODE_ENV);
    }
    

    render() {
        console.log(this.props);

        return (
            <div>
                <div className="header"></div>
                <div className="app">
                    <div className="menu"></div>
                    <div className="content">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default App;