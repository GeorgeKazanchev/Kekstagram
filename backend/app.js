const express = require('express');
const multer = require('multer');

const data = require('./data');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

const app = express();

const PORT = 3000;
const DATA_URI_PREFIX = 'data:image/png;charset=utf-8;base64,';

app.get('/data', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.send(data.pictures);
});

app.post('/', upload.single('filename'), (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');

  const formData = request.body;
  const encodedPicture = DATA_URI_PREFIX + request.file.buffer.toString('base64');

  const picture = {
    url: encodedPicture,
    likes: 0,
    description: formData.description,
    comments: [],
  };

  data.pictures.push(picture);
  response.send(picture);
});

app.listen(PORT, 'localhost', function() {
  console.log(`Server is started at port ${PORT}`);
});
