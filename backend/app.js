const express = require('express');
const multer = require('multer');

const { PORT } = require('./settings');
const data = require('./data');

const DATA_URI_PREFIX = 'data:image/png;charset=utf-8;base64,';

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

const app = express();

app.use(express.static('img'));

app.get('/data', (_, response) => {
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

app.listen(PORT, function() {
  console.log(`Server is started at port ${PORT}`);
});
