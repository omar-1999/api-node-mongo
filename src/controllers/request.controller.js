import Request from "../models/Request";

// Get requests
export const getRequest = async (req, res) => {
  const request = await Request.find()

  const response = {
    status: "success",
    data: request
  }
  res.status(200).json(response)
}
// Create request
export const postRequest = async (req, res) => {
  const { description, price } = req.body

  if (!description) return res.status(403).json({message: 'description is required'})
  if (!price) return res.status(403).json({message: 'price is required'})

  const newRequest = new Request({description, price})

  const savedRequest = await newRequest.save()

  const response = {
    status: "success",
    data: savedRequest
  }
  res.status(201).json(response)
}
// Update request
export const updateRequest = async (req, res) => {
  const { description, price } = req.body

  if (!description) return res.status(403).json({message: 'description is required'})
  if (!price) return res.status(403).json({message: 'price is required'})

  const updateRequest = await Request.findByIdAndUpdate(req.params.id, req.body, {new:true})

  const response = {
    status: "success",
    data: updateRequest
  }
  res.status(200).json(response)
}
// Get request by Id
export const getRequestById = async (req, res) => {
  const request = await Request.findById(req.params.id)

  const response = {
    status: "success",
    data: request
  }
  res.status(200).json(response)
}
// Delete request
export const deleteRequest = async (req, res) => {
  const deletedRequest = await Request.findByIdAndDelete(req.params.id)

  const response = {
    status: "success",
    data: deletedRequest
  }
  res.status(200).json(response)
}