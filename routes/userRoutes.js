const express = require("express")
const router = express.Router();
const userController = require("../controllers/registerController")

router.post("/register", userController.handleNewUser)
    .get("/AllUsers", userController.getAllUsers)
    .put("/updateUser/:id", userController.updateUser)
    .delete("/deleteUser/:id", userController.deleteUser)



module.exports = router