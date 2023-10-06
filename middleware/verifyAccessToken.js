import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export const verifyAccessToken = (req, res, next) => {
    const token = req.headers["x-auth-token"]
    if (!token) return res.sendStatus(401);
    console.log("in verify token")
    jwt.verify(
        token,
        process.env.USER_ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({message:"Invalid Token", error: err}); //invalid token
            req.email = decoded.userDetail.email;
            req.role = decoded.userDetail.role;
            next();
        }
    );
}