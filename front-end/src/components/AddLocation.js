import axios from 'axios';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';

const AddLocation = ({fetchData, setIsActive}) => {
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const handleSubmit = async(event) => { 
    event.preventDefault();
    const data = {
      name:locationName,
      address,
      phone:phoneNumber
    }
    await axios.post("http://localhost:8080/locations", data )
    .then(res=>{
      if(res.status<400){
        setIsActive(false)
        fetchData();
      }
      else{
        alert(res.data);
      }
    })
    .catch(err=>{
      alert("Error: "+err.response.data);
      console.error(err)
    });
  }

  return (
    <div className='add-window'>
      <div className='add-wrapper'>
          <h2>Add New Location</h2>
          <form onSubmit={handleSubmit}>
              <input type='text' placeholder='Location Name' value={locationName} onChange={e=>setLocationName(e.target.value)} />
              <input type='text' placeholder='Address'  onChange={e=>setAddress(e.target.value)}/>
              <input type='text' placeholder='Phone Number' onChange={e=>setPhoneNumber(e.target.value)} />
              <div className='button-wrapper'>
                  <button className='window-button close-button' onClick={()=>{setIsActive(false)}}>Close</button>
                  <button type='submit' className='window-button add-button'>Add</button>
              </div>
          </form>
      </div>
    </div>
  );
}

export default AddLocation