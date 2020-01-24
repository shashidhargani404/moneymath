const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('./config/database')

const cors = require('cors')
app.use(cors())
app.use(express.json())

const router = require('./config/routes')

app.use('/', router)

const path = require('path')
app.use(express.static(path.join(__dirname,"client/build"))) 
app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
}) 

app.listen(port, _ => console.log('listening to the port ', port))