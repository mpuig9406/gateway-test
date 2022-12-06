import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function DeviceShow() {

  const navigate = useNavigate();

  const [device, setDevice] = useState({});
  const [gateway, setGateway] = useState({});
  const params = useParams();


  useEffect(() => {
      axios.get('/peripherals/' + params.id).then(response => {
        setDevice(response.data);
      }).catch(error => {
          console.error(error);
      }).finally();          

  }, [params]);

  useEffect(() => {
    axios.get('/gateways/' + device.gateway_id).then(response => {
      setGateway(response.data);
    }).catch(error => {
        console.error(error);
    }).finally();          
  }, [device]);

  function deleteDevice(){
    axios.delete('/peripherals/' + params.id).then(res => {
     if(res.data){
        alert("Device deleted successfully");
        navigate('/peripherals');
     }
   }).catch( error => {  
     console.error(error);
     alert(error);
   });
  }

  const url_edit = `/peripherals/edit/${device.id}`;
  const url_gateway = `/gateways/${device.gateway_id}`;

    return (
        <Card>
          <Card.Body>
            <Card.Title>{device.devices}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{device.vendor}</Card.Subtitle>
            <Card.Text>Date: {device.date}</Card.Text>
            <Card.Text>Gateway: <Link to={url_gateway}>{gateway.ip}</Link></Card.Text>
            <Card.Text>Status: {device.status ? "Online" : "Offline"}</Card.Text>
            <Link to={url_edit}><Button variant="primary" className="m-1">Edit</Button></Link>
            <Link to="#"><Button onClick={deleteDevice}  variant="danger" className="m-1">Delete</Button></Link>
            <Link to="/peripherals"><Button variant="secondary" className="m-1">Devices List</Button></Link>
          </Card.Body>
        </Card>      
    )
};

export default DeviceShow;