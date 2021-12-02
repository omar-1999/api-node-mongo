import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
},{
  timestamps: true,
  versionKey: false
})

export default model('Category', categorySchema)