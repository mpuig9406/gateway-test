import React, {useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router";

function EditGateway() {

    const navigate = useNavigate();
    const params = useParams();

    const [gateway, setGateway] = useState({});
    const [serial, setSerial] = useState('');
    const [ip, setIp] = useState('');
    const [validated, setValidated] = useState(false);
    
    useEffect(() => {
        axios.get('/gateways/' + params.id).then(response => {
          setGateway(response.data);
          setSerial(response.data.serial);
          setIp(response.data.ip);
          setValidated(response.data.validated);

        }).catch(error => {
            console.error(error);
        }).finally();          
    }, []);

    function editGateway() {
      const gateway = {
         serial : serial,
         ip : ip, 
         validated: validated 
      };

       axios.patch('/gateways/' + params.id, gateway).then(res => {
        if(res.data){
            alert("Gateway edited successfully");
            setGateway(res.data);
            setSerial(res.data.serial);
            setIp(res.data.ip);
            setValidated(res.data.validated);
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
            <Card.Title>Edit Gateway</Card.Title>
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
                     checked={ validated ? 'checked' : ''}
                   />
                </Form>
               
            <Button onClick={editGateway} variant="primary" className="m-1">Edit</Button>
            <Button onClick={()=>{navigate('/')}} variant="secondary" className="m-1">Cancel</Button>

          </Card.Body>
        </Card>      
    )
};

export default EditGateway;