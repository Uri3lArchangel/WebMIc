const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router()
const path = require('path')


const upload = multer({ dest: './' });

router.get('/download', (req, res) => {
  res.status(200)
  const filePath = path.join(__dirname,'client','rec.ogg');
  const fileName = 'recording.ogg';
  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error downloading file');
    }
  });
});


router.get('/', (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname,'../client/index.html'));
  });
  
  router.post('/upload', upload.single('recording'), (req, res) => {
    const recording = req.file;
    console.log(recording);
    fs.rename(recording.path, path.join(__dirname,'client','rec.ogg'), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving file');
      } else {
        res.status(201).send('rec.ogg');
      }
    });
  });
  
  module.exports = router
