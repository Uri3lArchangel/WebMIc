const express = require('express')
const app = express()
const server = require('./api/server')

app.use(express.static('./api/public'));
app.use('/',server)
app.use('/upload',server)
app.use('/download',server)



app.listen(3001, (err, res) => console.log('server started on port 3001'));
