import { CONFIG_SECRET, TOKEN_EXPIRES } from "../config"
import jwt from 'jsonwebtoken'
import User from '../models/User'
import Role from '../models/Role'

export const signUp = async (req, res) => {
  const { name, email, password, password_confirmation, roles } = req.body

  if (!name) return res.status(403).json({message: 'name is required'})
  if (!email) return res.status(403).json({message: 'email is required'})
  if (!password) return res.status(403).json({message: 'password is required'})
  if (!password_confirmation) return res.status(403).json({message: 'password confirmation is required'})
  if (password !== password_confirmation) return res.status(403).json({message: 'passwords do not match'})

  const newUser = new User({ 
    username: name, 
    email,
    password: await User.encryptPassword(password)
  })
  // Validate roles, if you do not have assign user by default
  if (roles) {
    const foundRoles = await Role.find({name: {$in: roles}})
    newUser.roles = foundRoles.map(role => role._id)
  } else {
    const role = await Role.findOne({name: 'user'})
    newUser.roles = [role._id]
  }

  const savedUser = await newUser.save()
  // Generate token jwt
  const token = jwt.sign({id: savedUser._id}, CONFIG_SECRET, {
    expiresIn: TOKEN_EXPIRES
  })

  const response = {
    message: "User successfully registered",
    access_token: token,
    user: {
      name: savedUser.username,
      email: savedUser.email
    }
  }

  res.status(201).json(response)
}

export const signIn = async (req, res) => {

  if (!req.body.email) return res.status(403).json({message: 'email is required'})
  if (!req.body.password) return res.status(403).json({message: 'password is required'})

  // Get user and their roles assign
  const userFound = await User.findOne({email: req.body.email}).populate('roles')
  // Validate if exist
  if (!userFound) return res.status(400).json({message: 'User not found'})

  const matchPassword = await User.comparePassword(req.body.password, userFound.password)

  if (!matchPassword) return res.status(401).json({token: null, message: 'Invalid Password'})

  const token = jwt.sign({id: userFound._id}, CONFIG_SECRET, {
    expiresIn: TOKEN_EXPIRES
  })

  const response = {
    access_token: token,
    token_type: "bearer",
    expires_in: TOKEN_EXPIRES,
    user: {
      name: userFound.username,
      email: userFound.email
    }
  }

  res.status(200).json(response)
}

export const signOut = (req, res) => {
  return res.status(200).json({message: 'closed sesion'})
}