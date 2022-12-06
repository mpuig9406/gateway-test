import React, {useEffect, useState} from "react";
import axios from "axios";
import GatewayItem from "./Item";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function GatewayLists() {
    const [gateways, setGateways] = useState([]);

    useEffect(() => {
        axios.get('/gateways').then(response => {
            setGateways(response.data);
        }).catch(error => {
            console.error(error);
        }).finally();          

    }, [])

    const gatewaysList = gateways.map( gateway => {
        return(
            <React.Fragment key={gateway.id}>
                <GatewayItem gateway={gateway} />
            </React.Fragment>
        )
    });

    return (
        <div className="row">
            <div className="col-sm-12">
                <h2>Gateways</h2>
                <div className="m-2"><Link to="/gateways/new"><Button variant="primary">Add Gateway</Button></Link></div>

                    { gatewaysList }

            </div>
        </div>
    )
};

export default GatewayLists;