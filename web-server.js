const express = require('express');

const PORT = 3002;

const app = express();

app.use(express.static(__dirname));

app.get('/', (_, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.listen(PORT, function() {
  console.log(`Server is started at port ${PORT}`);
});
