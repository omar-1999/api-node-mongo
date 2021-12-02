import { Schema, model } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    uniqued: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    ref: 'Category',
    type: Schema.Types.ObjectId
  },
  imageUrl: {
    type: String,
    required: true
  }
},{
  timestamps: true,
  versionKey: false
})

export default model('Product', productSchema)