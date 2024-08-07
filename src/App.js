import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entry from './Entry';
import Vehicles from './vehicles';
function App() {



  
  return (
    <Router>

    <Navbar className="bg m-auto" >
        <Container>
           <Navbar.Brand className="navs" href='/Entry'>
             {' '}
          
             Parking Management
             </Navbar.Brand>
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                 <Nav.Link className="navs"  href="/Entry"> Vehicle Entry</Nav.Link>
                 <Nav.Link className="navs" href="/Vehicles">Vehicles</Nav.Link>
    
                 </Nav>
             </Navbar.Collapse>
         </Container>
       </Navbar>
    
       <Routes>
        <Route path="/Vehicles" element={<Vehicles />} />
        <Route path="/Entry" element={<Entry />} />

        <Route path="/edit/:id" element={<Entry />} />
      </Routes>
    </Router>
  

  );
}

export default App;



