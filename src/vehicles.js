import { FaEdit, FaTrash } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';
function Vehicles(){

  const  url = "http://localhost:3000/Vehicles";

  const navigate = useNavigate();


  const [Entry, setEntry]= useState([]);



  const setEntryData = () =>{
    axios.get(url)

    .then((response)=>{
      console.log(response)
      setEntry(response.data);
      }).catch(error => {
        alert("Error Ocurred while loading data::" + error)
      });
  }

  useEffect(() => {
    setEntryData();
}, []);

      const removeVehicle = (id) =>{

        axios.delete( `${url}/${id}`)
        .then((response)=>{
          console.log(id);
          alert(" Vehicle details is deleted");
          navigate("/vehicles");
          window.location.reload();
          }).catch(error =>{
            alert("error occured : " + error)
          });
      }

      const editVehicle = (id) =>{
        navigate(`/edit/${id}`)
        console.log(id);
      }
     
    
  
     return(
        <div className='container-lg'>
        <Table striped bordered hover >
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Contact</th>
          <th>Vehicle number</th>
          <th>Type of vehicles</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody>
      {
                    Entry.map((Entry) => (

                        <tr key={Entry.id}>
                            <td>
                                {Entry.id}
                            </td>
                            <td>
                                {Entry.Name}
                            </td>
                            <td>
                                {Entry.Contact}
                            </td>
                            <td>
                            {Entry.number}
                            </td>
                            <td>
                              {Entry.Vehicle}
                            </td>
                            <td className='icons'>
                           <FaTrash onClick={() => removeVehicle(Entry.id)} />
                            <FaEdit onClick={() => editVehicle(Entry.id)}/>

                            </td>
                        </tr>
                    ))
                }
      </tbody>
      
      
    </Table>
    </div>
   
    

     );
}
export default Vehicles;