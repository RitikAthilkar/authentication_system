
import jwt from 'jsonwebtoken'
export const verifyToken = async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    // return res.status(401).json({ token: token, message: process.env.JWT_SECRET })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        req.email = decoded.email
        next()
    } catch (err) {
        return res.status(401).json({ message: "Token expired"})
        // console.log("JWT ERROR:", err)
        // return res.status(401).json({ message: err.message })
        
    }
   next()
}