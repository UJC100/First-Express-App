const bcrypt = require('bcrypt')
const User = require('../model/User');


handleNewUser = async (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
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

        res.status(201).json({ "message": `New user ${username} creadted` })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "message": error.message
        })
    }
}

    const getAllUsers = async (req, res) => {    
        const users = await User.find();
        console.log(users)
        res.status(200).json({ users })
    }

    const updateUser = async (req, res) => {
        const userId = req.params.id
        const verifyId = await User.findById({ _id: userId })
        if (!verifyId) res.status(404).json(`No user with id: ${userId} exists`)
        
        const payload = req.body
        const updateUser = await User.findByIdAndUpdate( userId, payload, {new: true})
        res.status(200).json({ updateUser });
}
    
    const deleteUser = async (req, res) => {
        const userId = req.params.id
        const verifyId = await User.findById({ _id: userId });
        if (!verifyId) res.status(404).json(`No user with id: ${verifyId} exists`);
        await User.findByIdAndDelete(userId)

        res.status(200).json({message: `user ${userId} records has been deleted`})

    }


module.exports = { handleNewUser, getAllUsers, updateUser, deleteUser };