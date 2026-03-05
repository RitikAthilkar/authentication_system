import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie-parser'
import User from '../model/user.model.js'
export const Register = async(req,res)=>{
    const { name, email, password } = req.body
    try {

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields Required"
            })
        }

            const hashpass = await bcrypt.hash(password, 10)

            const userExist = await User.findOne({ email })
            if (userExist) {
                // 409 fro duplicate data
                return res.status(409).json({
                    success: false,
                    message: "All Fields Required"
                })
            }

            const createUser = await User.create({ name, email, password: hashpass })
            if (createUser) {
                return res.status(200).json({
                    success: false,
                    message: "User Registered Successfully"
                })
            }

        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: `error ${error}`
        })
    }
 


}
export const Login = async(req,res)=>{
    const { email, password } = req.body
    try {

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields Required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            // 409 fro duplicate data
            return res.status(404).json({
                success: false,
                message: "User Not Found Please Register"
            })
        }

        const verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword){
            return res.status(400).json({
                success: false,
                message: "Invalide Credentials"
            })
        }
  

        const accessToken = jwt.sign(
            { userId: user._id, email:user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1m" }
        )

        const refreshToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })

            return res.status(200).json({
                success: true,
                accessToken: accessToken,
                message: 'Login Successful'
            })
    
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: `error ${error}`
        })
    }
 


}

export const Logout = (req, res)=>{

    res.clearCookie("refreshToken",{
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}

export const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: "1m" }
        );

        return res.json({
            accessToken: newAccessToken
        });

    } catch (error) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};