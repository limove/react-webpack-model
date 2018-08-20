import React, { Component } from 'react';
import routes from '../../config/routes';

class App extends Component {
    render() {
        console.log(this.props);

        return (
            <div>
                {routes}
            </div>
        );
    }
}

export default App;