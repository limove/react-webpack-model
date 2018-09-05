import React, { Component } from 'react';
import ParkingFloorList from './ParkingFloorList'

class Temp extends Component {
    render() {
        return (
            <div>
                <ParkingFloorList
                    floorList={[{}, {}, {}]}
                />
            </div>
        );
    }
}

export default Temp;