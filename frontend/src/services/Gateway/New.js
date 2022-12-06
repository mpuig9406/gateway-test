import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function NewGateway() {

    const navigate = useNavigate();

    const [serial, setSerial] = useState('');
    const [ip, setIp] = useState('');
    const [validated, setValidated] = useState(false);
    
    function createGateway() {
      const gateway = {
         serial : serial,
         ip : ip, 
         validated: validated 
      };

       axios.post('/gateways', gateway).then(res => {
        if(res.data){
            alert("Gateway created successfully");
            navigate('/gateways/' + res.data.id);
        }
      }).catch( error => {  
        console.error(error);
        alert(error);
      });

    }

    return (
        <Card>
          <Card.Body>
            <Card.Title>New Gateway</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
            

                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Serial</Form.Label>
                    <Form.Control type="text" placeholder="Enter serial" value={serial} onChange={(e) => {setSerial(e.target.value)}} required />
                    <Form.Text className="text-muted">
                      Example: 23242wdsfg
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>IP</Form.Label>
                    <Form.Control type="text" placeholder="Enter IP" value={ip} onChange={(e) => {setIp(e.target.value)}} required />
                    <Form.Text className="text-muted">
                      Example: 192.168.1.1
                    </Form.Text>
                  </Form.Group>
                  <Form.Check 
                     type="switch"
                     id="custom-switch"
                     label="Validated"
                     value={validated} onChange={(e) => {setValidated(e.target.checked)}}
                   />
                </Form>
               

            <Button onClick={createGateway} variant="primary" className="m-1">Create</Button>
            <Button onClick={()=>{navigate('/')}} variant="secondary" className="m-1">Cancel</Button>

          </Card.Body>
        </Card>      
    )
};

export default NewGateway;