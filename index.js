const express = require('express')
const app = express()
const server = require('./api/server')

app.use(express.static('public'));
app.use('/',server)

app.listen(3001, (err, res) => console.log('server started on port 3001'));
