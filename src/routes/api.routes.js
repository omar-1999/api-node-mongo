import { Router } from 'express'
import { verifyToken, checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middlewares'
import * as authController from '../controllers/auth.controller'
import * as requestController from '../controllers/request.controller'

const router = Router()

// Authentications
router.post('/login', authController.signIn)
router.post('/register', [
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
], authController.signUp)
router.post('/logout', authController.signOut)
// Requests with validation token
router.get('/requests', verifyToken, requestController.getRequest)
router.post('/requests', verifyToken, requestController.postRequest)
router.put('/requests/:id', verifyToken, requestController.updateRequest)
router.get('/requests/:id', verifyToken, requestController.getRequestById)
router.delete('/requests/:id', verifyToken, requestController.deleteRequest)

export default router