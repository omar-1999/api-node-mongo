import { Schema, model } from 'mongoose'

const requestSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  price: Number
},{
  timestamps: true,
  versionKey: false
})

export default model('Request', requestSchema)