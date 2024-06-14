const express = require("express")
const router = express.Router()
const refreshTokenController = require("../controllers/refreshTokenController");


router.get("/tokenRefresh", refreshTokenController.handleTokenRefresh)


module.exports = router