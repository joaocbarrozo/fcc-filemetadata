var express = require('express');
var cors = require('cors');
var multer = require('multer')
require('dotenv').config()

var app = express();

// multer for file upload
var upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// File upload route
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.json({ 'error': 'No file uploaded' });
  }

  // Get file details
  const fileDetails = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  // Send the file details as a JSON response
  res.json(fileDetails);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
