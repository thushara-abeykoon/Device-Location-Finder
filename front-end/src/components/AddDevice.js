import axios from 'axios';
import React, { useRef, useState } from 'react'

const AddDevice = ({setIsActive, fetchData, locationName}) => {

    const [serialNumber, setserialNumber] = useState("");
    const [type, setType] = useState("pos");
    const [image, setImage] = useState();
    const [status, setStatus] = useState("");

    const inputRef = useRef(null);

    console.log(type);

    const handleStatus = (event) => { 
        setStatus(event.target.value);
     }
    
    const handleImage = (event) => { 
        setImage(event.target.files[0]);      
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = {
            locationName,
            serialNumber,
            type,
            status
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('data', JSON.stringify(data));

        await axios.post("http://localhost:8080/devices", formData, {headers:{
            "Content-Type":"multipart/form-data"
        }})
        .then(res=>{
            if(res.status<400){
                setIsActive(false);
                fetchData();
            }
            else{
                alert("Hello");
            }
        })
        .catch(err=>{
            if(err.response.status===400){
                alert("Error: "+err.response.data);
            }
            console.error(err);
        })
    }

  return (
    <div className='add-window'>
        <div className='add-wrapper'>
            <h2>Add Device</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Serial Number' value={serialNumber} onChange={e=>setserialNumber(e.target.value)} />
                <select style={{width:"520px"}} className='device-inputs' value={type} onChange={e=>setType(e.target.value)}>
                    <option value={"pos"}>POS</option>
                    <option value={"kisok"}>KISOK</option>
                    <option value={"signage"}>SIGNAGE</option>
                </select>
                <input className='device-inputs' type='file' ref={inputRef}  onChange={handleImage} />
                <div className='device-inputs' style={{display:"flex", alignItems:"center", justifyContent:"space-around", border:"none", padding:"0px"}}>
                    <p style={{fontWeight:"500"}}>Status: </p>
                    <div style={{width:"40%", display:"flex", justifyContent:"space-around"}}>
                        <label>
                            <input type='radio' name="status" checked={status==="active"} value={'active'} onChange={handleStatus} /> Active
                        </label>
                        <label>
                            <input type='radio'name='status'checked={status==="inactive"} value={'inactive'} onChange={handleStatus}/> Inactive
                        </label>
                    </div>
                </div>
                <div className='button-wrapper'>
                    <button className='window-button close-button' onClick={()=>{setIsActive(false)}}>Close</button>
                    <button className='window-button add-button' type='submit'>Add</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddDevice