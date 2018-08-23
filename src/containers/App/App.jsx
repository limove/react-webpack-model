import React, { Component } from 'react';
import moment from 'moment';
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
                {this.props.children}
            </div>
        );
    }
}

export default App;