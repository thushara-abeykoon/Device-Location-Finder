import React, { useEffect, useState } from 'react'
import LocationCard from './LocationCard'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from 'react-icons/fa'
import AddLocation from './AddLocation'
import axios from 'axios';

const AllLocations = () => {
    const [isActive, setIsActive] = useState(false);

    const [locations, setLocations] = useState();
    const [isLoading, setIsLoading] = useState(false);

  const fetchData = async() => { 
    setIsLoading(true);
    await axios.get("http://localhost:8080/locations/")
    .then(res=>{
      setLocations(res.data);
    })
    .catch(err=>{
      console.error(err);
    })
    .finally(()=>{
        setIsLoading(false);
    })
}

  useEffect(()=>{
    fetchData();
  },[])



  if(isLoading){
    return <div className='loading-screen'><AiOutlineLoading3Quarters className='loading-icon'/></div>
  }
  else{
    return (
      <div style={{height:"70%"}}>
          {locations?<div className='location-container'>
            {locations.map(el=><LocationCard location={el}/>)}
          </div>:<div>Cannot Fetch</div>}
        <button className='add-device-button' onClick={()=>{
          setIsActive(true);
        }}><FaPlus /></button>
        {isActive?<AddLocation fetchData={fetchData} setIsActive={setIsActive}/>:<></>}
      </div>
    )
  }
}

export default AllLocations