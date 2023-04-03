const express = require('express')
const app = express()
const routes = require('./router/server')
const path=require("path")

app.use(express.static(path.join(__dirname,'client', 'js')));


app.listen(3001, (err, res) => console.log('server started on port 3001'));

app.use(routes)
app.use((req,res)=>{
    res.status(200)
    res.sendFile(path.join(__dirname,'client','index.html'))
})


