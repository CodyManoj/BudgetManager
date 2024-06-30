require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { database } = require('./db/database')
const fs = require('fs');
const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())
// routers 
fs.readdirSync('./routes').map((route) => app.use('/api/version1',require('./routes/'+route)))
app.get('/',(req,res) =>{
    res.send('Hello World')
})
const server = () => {
    database()
    app.listen(PORT, ()=>{
        console.log('Listen to port = ',PORT);
    })
}

server()