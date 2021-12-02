import Role from '../models/Role'
// Default role default, only if they don't exist
export const createRoles = async () => {
  try {
    // Validate if exits role
    const count = await Role.estimatedDocumentCount()

    if (count > 0) return
    
    // Create role
    const values = await Promise.all([
      new Role({name: "user"}).save(),
      new Role({name: "moderador"}).save(),
      new Role({name: "admin"}).save(),
    ])

    console.log(values)
  } catch (error) {
    console.error(error)
  }
}