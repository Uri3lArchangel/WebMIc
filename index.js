const express = require('express')
const app = express()
const routes = require('./api/server')
const path=require("path")

app.use(express.static(path.join(__dirname,'api', 'public')));
app.use(routes)




app.listen(3001, (err, res) => console.log('server started on port 3001'));
