import express, {Router} from 'express'
import { Login, Logout, refreshToken, Register} from '../controller/auth.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'

const route = express.Router()

route.post('/auth/register',Register)
route.post('/auth/login',Login)
route.post('/auth/logout',Logout)
route.post("/auth/refresh", refreshToken);

route.get("/auth/profile", verifyToken, (req, res) => {
    res.json({
        userId: req.userId,
        email: req.email,
    })
})



export default route