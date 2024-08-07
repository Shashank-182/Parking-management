import React, { useEffect, useState } from 'react';
import './App.css'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'




function Entry(){
  const url = "http://localhost:3000/Vehicles";

  const navigate = useNavigate();

  const { id } = useParams();

  const [Name, SetNames] = useState("");

  const [Contact, SetContacts] = useState("");

  const [number, Setnumbers] = useState("");

  const [Vehicle, SetVehicles] = useState("");

  const [edit, setEdit] = useState(false);

  const [Errors, setErrors] = useState({ Name: "", Contact: "", number: "", Vehicle : ""});



  useEffect(()=> {

    if (id){
      axios.get(`${url}/${id}`)
    .then((Response)=>{
      console.log(id)
      const {Name,Contact,number,Vehicle} = Response.data

      SetNames(Name);
      SetContacts(Contact);
      Setnumbers(number);
      SetVehicles(Vehicle);
      setEdit(true);
    }).catch((error) =>{
      alert("error occuerd : " + error);
    });
    }

    

  },[id]);

    const validateName = (value) =>{
      const regexName = /^[A-Za-z\s]{1,49}$/; 
      return regexName.test(value) ? "" : <span className='text-danger'> Enter valid name</span>
    };

    const validateContact = (value) =>{
      const regexContact = /^[0-9]{10}$/;
      return regexContact.test(value)? "" :  <span className='text-danger'> Enter valid contact number</span>
    };

    const validatenumber = (value) =>{
      const regexNumber = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
      return regexNumber.test(value) ? "" :  <span className='text-danger'> Enter valid Vehicle number</span>
    }
    const validateVehicle = (value)=>{
      
      return value !== "Type of Vehicle" ? "" : <span className='text-danger'> Enter type of vehicle</span>
    }



  
  


  const nameChangeHandler = (event) =>{

    const value = event.target.value;
    SetNames(value);

    setErrors((prevErrors)=>({
      ...prevErrors,
      Name: validateName(value),
    }))
        console.log(setErrors)
    
    

  };
  const contactchangehandler =(event) =>{

    const value = event.target.value;
    SetContacts(value);

    setErrors((PrevErrors)=>({
      ...PrevErrors,
      Contact: validateContact(value)
    }))

  }
  const numberchangehandler = (event) =>{

    const value = event.target.value;
    Setnumbers(value);

    setErrors((PrevErrors)=>({
      ...PrevErrors,
      number: validatenumber(value)
    }))
  }
  const Vehiclechangehandler = (event) =>{
    const value = event.target.value;
    SetVehicles(value);
     
    setErrors((PrevErrors)=>({
      ...PrevErrors,
      Vehicle: validateVehicle(value)
    }))

  }

  const submitActionHandler = (event) =>{
      event.preventDefault();


      const nameError = validateName(Name);
      const contactError = validateContact(Contact);
      const numbererror = validatenumber(number);
      const VehicleError = validateVehicle(Vehicle);

      if(nameError || contactError || numbererror || VehicleError){
        setErrors({
          Name:nameError,
          Contact:contactError,
          number: numbererror,
          Vehicle: VehicleError
        });
        alert("please enter correct details");
        return;
      }

      const vehicleData = {Name,Contact,number,Vehicle}

      if(edit){
        axios.put(`${url}/${id}`,vehicleData)
        .then(()=>{
          alert(Name + " is updated")
          navigate("/Vehicles")
          }).catch(error =>{
            alert(error + "error occuerd")
          });
      }
      else{
        axios.post(url,vehicleData)
        .then((Response)=>{
          console.log(Response)
          alert(Name + " is added")
          navigate("/Vehicles")
        }).catch(error => {
          alert("error" + error)
        });
      }
  }
  

    return(
      <div className='center' >
        
        <div className='half' >
          


      <Form  className='index' onSubmit={submitActionHandler}>
        <h2>Vehicle Entry</h2>
        
      <Row  >
        <Col >
        <Form.Label>Name</Form.Label>
          <Form.Control className='mb-3'  value={Name} onChange={nameChangeHandler} isInvalid = {!!Errors.Name}/>
          {Errors.Name}
        </Col>
        <Col>
        <Form.Label>Contact</Form.Label>
          <Form.Control  className='mb-3'  value={Contact} onChange={contactchangehandler} isInvalid= {!!Errors.Contact}/>
          {Errors.Contact}
        </Col>
        </Row>
        <Row  >
        <Col >
        <Form.Label>Vehicle number</Form.Label>
            <Form.Control placeholder="Ex: TS09KA7569" className='mb-3' value={number} onChange={numberchangehandler} isInvalid= {!!Errors.number} />
            {Errors.number}
        </Col>
        <Col>
        <Form.Label> </Form.Label>
            <Form.Select aria-label="Default select example" className='mb-4' value={Vehicle} onChange={Vehiclechangehandler} isInvalid = {!!Errors.Vehicle} > 

                <option>Type of Vehicle</option>
                <option value="Four wheeler">Four wheeler</option>
                <option value="Three wheeler">Three wheeler</option>
                <option value="Two wheeler">Two wheeler</option>
              </Form.Select>
              {Errors.Vehicle}
        </Col>
        
        </Row>
        <div className='button'>
        <Button variant="primary" type="submit" className='mb'>
        submit
        </Button>
        </div>

   </Form>
   

   

   </div>

   </div>



    );
}
export default Entry;