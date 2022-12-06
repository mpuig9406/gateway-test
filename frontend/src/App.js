//import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom'; 
import NavBar from './NavBar';
import GatewayLists from './services/Gateway/List';
import GatewayShow from "./services/Gateway/Show";
import GatewayNew from "./services/Gateway/New";
import GatewayEdit from "./services/Gateway/Edit";
import DeviceLists from './services/Device/List';
import DeviceShow from "./services/Device/Show";
import DeviceNew from "./services/Device/New";
import DeviceEdit from "./services/Device/Edit";


function App() {
  return (
    <div className="App">
        <NavBar />
        <h1>Test - Managing Gateways </h1>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<GatewayLists/>} exact></Route>
            <Route path='/gateways/:id' element={<GatewayShow/>} exact></Route>
            <Route path='/gateways/edit/:id' element={<GatewayEdit/>} exact></Route>
            <Route path='/gateways/new' element={<GatewayNew/>} exact></Route>
            <Route path='/peripherals' element={<DeviceLists/>} exact></Route>
            <Route path='/peripherals/:id' element={<DeviceShow/>} exact></Route>
            <Route path='/peripherals/edit/:id' element={<DeviceEdit/>} exact></Route>
            <Route path='/peripherals/new' element={<DeviceNew/>} exact></Route>
            <Route path='/peripherals/new/gateway/:id' element={<DeviceNew/>} exact></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
