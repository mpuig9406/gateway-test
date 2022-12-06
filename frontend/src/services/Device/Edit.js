import React, {useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router";

function EditDevice() {

    const navigate = useNavigate();
    const params = useParams();

    const [device, setDevice] = useState({});
    const [devices, setDevices] = useState('');
    const [vendor, setVendor] = useState('');
    const [status, setStatus] = useState(false);
    const [gateway_id, setGatewayId] = useState('');
    const [gateways, setGateways] = useState([]);

    useEffect(() => {
        axios.get('/peripherals/' + params.id).then(response => {
          setDevice(response.data);
          setDevices(response.data.devices);
          setVendor(response.data.vendor);
          setStatus(response.data.status);
          setGatewayId(response.data.gateway_id);
        }).catch(error => {
            console.error(error);
        }).finally();          
    }, [params]);

    useEffect(() => {
      axios.get('/gateways').then(response => {
          if(response.data){
              setGateways(response.data);
          }
      }).catch(error => {
          console.error(error);
      }).finally();          

    }, [device])

    function editDevice() {
      const peripheral = {
        devices : devices,
        vendor : vendor, 
        status: status,
        gateway_id: gateway_id
      };

       axios.patch('/peripherals/' + params.id, peripheral).then(res => {
        if(res.data){
            alert("Device edited successfully");
            setDevice(res.data);
            setDevices(res.data.devices);
            setVendor(res.data.vendor);
            setStatus(res.data.status);
            setGatewayId(res.data.gateway_id);          
            navigate('/peripherals/' + res.data.id);
        }
      }).catch( error => {  
        console.error(error);
        alert(error);
      });

    }

    const gateways_options = gateways.map( gtw => {
      if(gtw.validated){
          return(
              <option value={gtw.id} selected="{if(gtw.id === gateway_id) ? selected : ''}">{gtw.ip}</option>
          )
      }
    })

    return (
        <Card>
          <Card.Body>
            <Card.Title>Edit Gateway</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>

            <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Device</Form.Label>
                    <Form.Control type="text" placeholder="Enter device" value={devices} onChange={(e) => {setDevices(e.target.value)}} required />
                    <Form.Text className="text-muted">
                      Example: Iphone x
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Vendor</Form.Label>
                    <Form.Control type="text" placeholder="Enter vendor" value={vendor} onChange={(e) => {setVendor(e.target.value)}} required />
                    <Form.Text className="text-muted">
                      Example: Cloudflare
                    </Form.Text>
                  </Form.Group>
                  <Form.Check 
                     type="switch"
                     id="custom-switch"
                     label="Status (Offline/Online)"
                     value={status} onChange={(e) => {setStatus(e.target.checked)}}
                     checked={ status ? 'checked' : ''}
                   />
                   <Form.Select aria-label="Gateway" value={gateway_id} onChange={(e) => {setGatewayId(e.target.value)}}>
                     <option>Select a gateway</option>
                     { gateways_options }
                   </Form.Select>
                </Form>
               
            <Button onClick={editDevice} variant="primary" className="m-1">Edit</Button>
            <Button onClick={()=>{navigate('/peripherals')}} variant="secondary" className="m-1">Cancel</Button>

          </Card.Body>
        </Card>      
    )
};

export default EditDevice;