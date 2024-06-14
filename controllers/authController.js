const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const loginAuth = async (req, res) => {
    const reqBody = req.body
    // console.log(reqBody)
    if (!reqBody) return res.status(400).json(`Please fill out the inputs above`);

    const verifyUser = await User.findOne({ username: reqBody.username });
    // console.log(verifyUser)
    if (!verifyUser) return res.status(401).json(`Incorrect credentials`);

    const verifypwd = await bcrypt.compare(reqBody.password, verifyUser.password);
    if (!verifypwd) return res.status(401).json(`Incorrect credentials`);
    const role = Object.values(verifyUser.roles)
    const payload = {
        "username": verifyUser.username,
        "role": role
    }
    const accessToken = jwt.sign(payload, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN }
    )
    const refreshToken = jwt.sign({
        "username": verifyUser.username,
    },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN }
    )
    verifyUser.refreshToken = refreshToken
    await verifyUser.save()
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 60000 }) //secure: true 
    res.json({ accessToken })     
}

const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(403)
    const refreshToken = cookies.jwt

    const user = await User.findOne({ refreshToken })
    if (!user) return res.sendStatus(401)
    
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none"
    }).json(`Logout success`);

    user.refreshToken = ''
    user.save()
}

module.exports = {loginAuth, logout}