import React, { useEffect, useState } from 'react'
import DeviceCard from './DeviceCard'
import { FaPlus } from "react-icons/fa6";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import AddDevice from './AddDevice';

const LocationViewer = (props) => {
    const {locationName} = useParams();
    const [location, setLocation] = useState();

    const [isActive, setIsActive] = useState(false);


    const fetchData = async()=>{
        await axios.get(`http://localhost:8080/locations/${locationName}`)
        .then(res=>{
            setLocation(res.data)
        })
        .catch(err=>{
            console.error(err);
        })
    }
    useEffect(()=>{
        fetchData();
    },[])

  return (
    <div>
        {location?<div className='location-header-wrapper'>
            <div className='location-header'>
                <h2>{location.locationName}</h2>
                <div>
                    <p>{location.address}</p>
                    <p>{location.phone}</p>
                </div>
            </div>
            <div className='device-card-wrapper'>{location.devices.map(device=><DeviceCard key={device.serialNumber} fetchData={fetchData} locationName={locationName} device={device} />)}</div>

            <button className='add-device-button' onClick={()=>{setIsActive(true)}}><FaPlus /></button>

        </div>:<div className='fetch-data-error'>
            Cannot fetch data!
        </div>
        }

        {isActive?<AddDevice setIsActive={setIsActive} fetchData={fetchData} locationName={locationName}/>:<></>}
    </div>
  );
}

export default LocationViewer