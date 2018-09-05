import React, { Component } from 'react';
import './ParkingFloorList.css';

class ParkingFloorList extends Component {

    handleSelectFloor() {
        console.log('select floor');
    }

    getFloorCard(list) {
        return list.map((floor, floor_i) => (
            <div key={floor_i} onClick={this.handleSelectFloor.bind(this)}>楼层{floor_i}</div>
        ));
    }

    render() {
        let {floorList} = this.props;
        floorList = floorList || [];
        let floorListLen = floorList.length;

        return (
            <div className="parking-floor-list">
                <div className="parking-floor-list-header">
                    <h3>停车楼层列表</h3>
                    {floorListLen > 0 ? <a>添加</a> : ''}
                </div>
                <div className="parking-floor-list-body">
                    {this.getFloorCard(floorList)}
                    {floorListLen > 0 ? '' : <button>新增停车楼层</button>}
                </div>
            </div>
        );
    }
}

export default ParkingFloorList;