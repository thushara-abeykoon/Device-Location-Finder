import mongoose from "mongoose";

const deviceSchema = mongoose.Schema({
    serialNumber: {type:String, required:true},
    type:{type:String, enum:["pos", "kisok", "signage"], required:true},
    image:{type:String, required:true},
    status:{type:String, enum:["active", "inactive"], required:false}
})

export default mongoose.model("Device", deviceSchema);