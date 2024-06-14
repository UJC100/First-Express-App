const express = require("express")
const router = express.Router()
const refreshTokenController = require("../controllers/refreshTokenController");


router.post("/tokenRefresh", refreshTokenController.handleTokenRefresh)


module.exports = router