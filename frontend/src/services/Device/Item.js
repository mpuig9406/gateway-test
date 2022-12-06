import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function DeviceItem({device}) {

  const [gateway, setGateway] = useState({});
  const gateway_id = device.gateway_id;

  useEffect(() => {
      axios.get('/gateways/' + gateway_id).then(response => {
        setGateway(response.data);
      }).catch(error => {
          console.error(error);
      }).finally();          

  }, [gateway_id]);

  const url = `/peripherals/${device.id}`;

    return (
        <Card>
          <Card.Body>
            <Card.Title>{device.devices}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{device.vendor}</Card.Subtitle>
              <Card.Text>Date: {device.date}</Card.Text>
              <Card.Text>Status: {device.status ? "Online" : "Offline"}</Card.Text>
              <Card.Text>{gateway.validated ? `Gateway: ${gateway.ip}` : `Gateway: Not Validated` }</Card.Text>
          
            <Link to={url}><Button variant="secondary">Go to</Button></Link>
          </Card.Body>
        </Card>      
    )
};

export default DeviceItem;