const express = require('express');
const fs = require('fs');
const multer = require('multer');
const app = express()


const upload = multer({ dest: './' });

app.get('/download', (req, res) => {
  const filePath = __dirname + '/public/rec.ogg';
  const fileName = 'recording.ogg';
  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error downloading file');
    }
  });
});


app.get('/', (req, res) => {
    console.log('g');
    res.sendFile('index.html', { root: 'public' });
  });
  
  app.post('/upload', upload.single('recording'), (req, res) => {
    const recording = req.file;
    console.log(recording);
    fs.rename(recording.path, 'api/public/rec.ogg', (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving file');
      } else {
        res.status(201).send('rec.ogg');
      }
    });
  });
  
  module.exports = app
