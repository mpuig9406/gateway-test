import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function GatewayShow() {

  const navigate = useNavigate();
  
  const [gateway, setGateway] = useState({});
  const [devices, setDevices] = useState([]);
  const params = useParams();

  useEffect(() => {
      axios.get('/gateways/' + params.id).then(response => {
        setGateway(response.data);
      }).catch(error => {
          console.error(error);
      }).finally();          
  }, [params]);

  useEffect(() => {
    axios.get('/peripherals/gateway/' + params.id).then(response => {
      setDevices(response.data);
    }).catch(error => {
        console.error(error);
    }).finally();          
}, [params]);


function toValidate(){
  const gtw = {
    validated : true
  };

  axios.patch('/gateways/' + params.id, gtw).then(res => {
   if(res.data){
       alert("Gateway validated successfully");
       setGateway(res.data);
       navigate('/gateways/' + params.id);
   }
 }).catch( error => {  
   console.error(error);
   alert(error);
 });
}
function deleteGateway(){
  axios.delete('/gateways/' + params.id).then(res => {
   if(res.data){
       alert("Gateway deleted successfully");
       navigate('/');
   }
 }).catch( error => {  
   console.error(error);
   alert(error);
 });
}

  const devicesList = devices.map( device => {
    return(
      <Card>
        <Card.Body>
          <Card.Text>Device: <b>{device.devices}</b> | Vendor: <b>{device.vendor}</b></Card.Text>
        </Card.Body>
      </Card> 
    )
  })

  const url_edit = `/gateways/edit/${gateway.id}`;
  //const url_add_device = `/peripherals/new/gateway/${gateway.id}`;

    return (
        <Card>
          <Card.Body>
            <Card.Title>{gateway.ip}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{gateway.serial}</Card.Subtitle>
            <Card.Text>
              {gateway.validated ? "Validated" : "Not Validated"}
            </Card.Text> 
                  {devicesList}
            <Card.Text>Count <Link to="/peripherals">devices</Link>: {devices.length} </Card.Text>
            {gateway.validated ? <Link to={url_edit} gateway={gateway}><Button variant="primary" className="m-1">Edit</Button></Link> : ''}
            {!gateway.validated ? <Link to="#"><Button onClick={toValidate} variant="info" className="m-1">To Validate</Button></Link> : ''}
            <Link to="#"><Button onClick={deleteGateway} variant="danger" className="m-1">Delete</Button></Link>
            <Link to="/"><Button variant="secondary" className="m-1">Gateways List</Button></Link>
          </Card.Body>
        </Card>      
    )
};

export default GatewayShow;