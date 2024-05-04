import mongoose from "mongoose";
import Device from "./deviceSchema.js";

const locationSchema = new mongoose.Schema({
    locationName: {type:String, required:true},
    address: {type:String},
    phone: {type:String},
    devices: {type:[Device.schema]}
})

export default mongoose.model('Location',locationSchema);   