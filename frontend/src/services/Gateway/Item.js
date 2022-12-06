import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function GatewayItem({gateway}) {
    const url = `/gateways/${gateway.id}`;
    
    return (
        <Card>
          <Card.Body>
            <Card.Title>{gateway.ip}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{gateway.serial}</Card.Subtitle>
            <Card.Text>
               {gateway.validated ? "Validated" : "Not Validated"}
            </Card.Text>
            <Link to={url}><Button variant="secondary">Go to</Button></Link>

          </Card.Body>
        </Card>      
    )
};

export default GatewayItem;