import { Schema, model } from "mongoose";

const roleSchema = Schema({
  name: {
    type: String,
    unique: true
  }, 
},{
  versionKey: false
})

export default model('Role', roleSchema)