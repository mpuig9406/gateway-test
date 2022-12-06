import Nav from 'react-bootstrap/Nav';

function NavBar() {
  return (
    <Nav variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/">Gateways</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link  href="/peripherals" eventKey="/peripherals">Devices</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;