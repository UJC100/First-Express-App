const express = require("express")
const router = express.Router();
const userController = require("../controllers/registerController")

router.post("register", userController.handleNewUser)
            .get("AllUsers", userController.getAllUsers)



module.exports = router