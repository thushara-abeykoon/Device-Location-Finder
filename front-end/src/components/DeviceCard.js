import axios from 'axios';
import React, { useState } from 'react'
import { FaDotCircle } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const DeviceCard = ({fetchData, device, locationName}) => {
  const [isActive, setIsActive] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
    const handleDelete = async() => { 
      setIsActive(true);
    }

  return (
    <div className='device-card'>
        <div>
          <img src={`data:image/png;base64,${device.image}`} />
          <p>Serial Number : {device.serialNumber}</p>
          <p>Device Type : <span className='device-type'>{device.type}</span></p>
          <p className='device-status-wrapper'>Status : <FaDotCircle className='device-status-dot' style={(device.status==="active")?{color:"green"}:{color:"gray"}} /> <span className='device-status'>{device.status}</span></p>
        </div>
        <div className='delete-button' onClick={handleDelete}><MdOutlineDelete /></div>
        {isActive?<DeleteAlert setIsActive={setIsActive} locationName={locationName} fetchData={fetchData} serialNumber={device.serialNumber} />:null}
    </div>
  )
}
const DeleteAlert = ({setIsActive, serialNumber, locationName, fetchData}) => {
  return (
    <div className='add-window'>
      <div className='add-wrapper'>
          <p>Are you sure you want to delete this device?</p>
          <div className='button-wrapper'>
              <button className='window-button close-button' onClick={()=>{setIsActive(false)}}>No</button>
              <button className='window-button delete-alert-button' onClick={async()=>{
                await axios.delete(`http://localhost:8080/devices/${locationName}/${serialNumber}`)
                .then(res=>console.log(res.data))
                .catch(err=>console.error(err));
                fetchData();
                setIsActive(false)}}>Yes</button>
          </div>
      </div>
    </div>
  )
}


export default DeviceCard