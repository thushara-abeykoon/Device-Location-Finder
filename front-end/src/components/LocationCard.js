import React from 'react'
import { useNavigate } from 'react-router-dom'


const LocationCard = ({location}) => {
  const navigate = useNavigate();
  return (
    <div className='location-card' onClick={()=>{navigate(`/location/${location.locationName}`)}}>
        <h2>{location.locationName}</h2>
        {/* add icons */}
        <p>{location.address}</p>
        <p>{location.phone}</p>
    </div>
  )
}

export default LocationCard