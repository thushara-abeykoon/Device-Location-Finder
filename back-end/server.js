import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import fs from 'fs';
import dotenv from 'dotenv';
import multer from 'multer';
import Location from "./schema/locationSchema.js";
import Device from "./schema/deviceSchema.js";
import { log } from "console";

const app = express();
dotenv.config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
})


const upload = multer({ storage: storage });

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
//to access the request body
app.use(express.json());

//get location details
app.get('/locations/:name?',async (req,res)=>  {
    try{
        //if location name available get location details for the particular location
        //if location name not available get all the location details
        const locationName = req.params.name;
        const locations = (locationName) ? await Location.findOne({locationName}) : await Location.find({});
        console.log(locations);

        if(locations.devices){
            locations.devices.forEach(device => {
                const imageBuffer = fs.readFileSync(`./uploads/${device.image}`);
                const base64Image = imageBuffer.toString('base64');
                device.image = base64Image;
            });
        }

        res.json(locations)
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Error Retrieving Locations");
    }
})

//register a new location
app.post('/locations', async (req,res)=>{
    try{
        const {name, address, phone } = req.body;
        
        const location = await Location.findOne({locationName: name});
        if(location){
            return res.status(400).send("Location Already Registered!");
        }

        const newLocation = new Location({
            locationName: name,
            address,
            phone,
            devices:[]
        });

        const savedLocation = await newLocation.save();

        res.status(201).json({message: "Location registered successfully!", location:savedLocation});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Error Registering Location!"}); 
    }
})


//register a new device
app.post('/devices', upload.single('image'), async (req, res)=>{
    try{
        const requestBody = JSON.parse(req.body.data);
        const {locationName, serialNumber, type, status} = requestBody;
        const image = req.file.originalname;
        const location = await Location.findOne({locationName});
        
        const devices = location.devices.filter(device => device.serialNumber === serialNumber);
        log(devices);
        if(devices.length !== 0){
            res.status(400).send("Device Already Registered!");
        }
        else{
            const newDevice = new Device({
                serialNumber,
                type,
                image,
                status
            });
    
            location.devices.push(newDevice);
            location.save();
            res.status(201).send("Device Registration Successfull!");
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Cannot Register the Device");
    }
});

app.delete('/devices/:locationName/:serialNumber', async (req, res)=>{
    try{
        const locationName = req.params.locationName;
        const serialNumber = req.params.serialNumber;
        const location = await Location.findOne({locationName});
        const deviceIndex = location.devices.findIndex(device => device.serialNumber === serialNumber);
        location.devices.splice(deviceIndex, 1);
        location.save();
        res.send("Device Deleted Successfully!");
    }
    catch(err){
        console.error(err);
        res.status(500).send("Cannot Delete the Device");
    }
    })

//connect mongo database
mongoose.connect(MONGO_URL).then(()=>{
    console.log("Database Connected Successfully")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}).catch(err=>console.error(err));