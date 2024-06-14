const User = require("../model/User")
const jwt = require("jsonwebtoken")


const handleTokenRefresh = async (req, res) => {
    const cookies = req.cookies
    // console.log(cookies)
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    
    const verifyRefresh = await User.findOne({ refreshToken });
    if (!verifyRefresh) return res.sendStatus(403)
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
            (err, decode) => {
                if (err || verifyRefresh.username !== decode.username) return res.sendStatus(403)
                const role = Object.values(verifyRefresh.roles)
                const payload = {
                    "username": verifyRefresh.username,
                    "role": role
                }
                const accessToken = jwt.sign(
                  payload,
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN }
                );
                res.status(200).json({ accessToken });
        }
    );

    
    
}

module.exports = {handleTokenRefresh}