import React, {useEffect, useState} from "react";
import axios from "axios";
import DeviceItem from "../Device/Item";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function DeviceLists() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        axios.get('/peripherals').then(response => {
            setDevices(response.data);
        }).catch(error => {
            console.error(error);
        }).finally();          

    }, [])

    const devicesList = devices.map( device => {
        return(
            <div>
                <React.Fragment key={device.id}>
                    <DeviceItem device={device} />
                </React.Fragment>
                
            </div>
        )
    });

    return (
        <div className="row">
            <div className="col-sm-12">
                <h2>Devices</h2>
                <div className="m-2"><Link to="/peripherals/new"><Button variant="primary">Add Device</Button></Link></div>

                {devicesList}
            </div>
        </div>
    )
};

export default DeviceLists;