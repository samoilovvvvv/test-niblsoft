const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// пользовательские настройки:
// на каком порту слушать по умолчанию, можно заоверрайдить через переменную окружения PORT
const DEFAULT_PORT = 3001;
// полный путь файла, который перезаписываем (тут, относительно файла server.js)
const UPDATE_JSON_FILE = path.join(__dirname, './src/json/note.json');
// URL на сервере, в которую будем кидать POST-запрос
const UPDATE_JSON_ENDPOINT = '/api/update_json';

// конфигурирование обработчиков сервера и запуск на заданном порту
const server = express();

server.use(cors());

const rawParser = bodyParser.raw({type: '*/*'});
server.post(UPDATE_JSON_ENDPOINT, rawParser, (req, res) => {
  const data = req.body instanceof Buffer ? req.body : Buffer.alloc(0);
  fs.writeFile(UPDATE_JSON_FILE, data, (err) => {
    if (!err) {
      console.log(`Wrote ${Buffer.byteLength(data)} bytes`);
      res.status(200).send('Success!');
    } else {
      console.log(err.toString());
      res.status(500).send(err.toString());
    }
  });
});
server.get(UPDATE_JSON_ENDPOINT, (req, res) => { res.status(400).send('POST requests only!'); });

const port = process.env.PORT || DEFAULT_PORT;
console.log(`Listening on port ${port}`);
server.listen(port);