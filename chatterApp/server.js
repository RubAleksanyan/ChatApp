const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const http = require('http').Server(app);
const config = require('./.configs.js');
const io = require('socket.io')(http);
const mongoose = require('mongoose');

const connectionUrl = `mongodb+srv://${config.username}:${config.password}@${config.dbUri}`;

mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    throw err;
  }
  console.log('db connection successful');
});

const MessageStructure = mongoose.model('message', {
  name: String,
  text: String,
});

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// let messagesStorage = [];

app.get('/messages', (req, res) => {
  // res.send(messagesStorage);
  MessageStructure.find({}, (err, allMessages) => {
    if (err) {
      throw err;
    }
    res.send(allMessages);
  });
});

app.post('/messages', (req, res) => {
  const messageObject = new MessageStructure(req.body);

  messageObject.save((err) => {
    if (err) {
      throw err;
    }
    io.emit('messageIncome', req.body);
    res.sendStatus(200);
  });

  // messagesStorage.push(req.body);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
