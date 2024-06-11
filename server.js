const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('')
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)) 