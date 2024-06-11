const bcrypt = require('bcrypt')
const User = require('../model/User');


const handleNewUser = async (req, res) => {
    const { username, password } = req.body
    if (!username && !password) return res.status(400).json({ 'message': "Username and password required" });

    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) return res.status(409)  //conflict
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
          "username": username,
          "password": hashedPassword,
        });  

        console.log(result)

        res.status(201).json({ "message": `New user ${user} creadted` })
    } catch (error) {
        res.status(500).json({
            "message": error.message
        })
    }
}