// const socket = io('http://localhost:3000');
// const messageForm = document.getElementById('send-container');
// const messageInput = document.getElementById('message-input');
// const messageContainer = document.getElementById('message-container');

// messageForm.addEventListener('submit', onSubmit);

// function onSubmit(event)
// {
//   event.preventDefault();
//   const message = messageInput.value;
//   socket.emit('send-message', message);
//   messageInput.value = '';
//   addMessage(`You: ${message}`);
// };

// function addMessage(message)
// {
//   const messageElement = document.createElement('div')
//   messageElement.innerText = message
//   messageContainer.append(messageElement)
// }

const socket = io("http://localhost:3000");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const name = prompt("What is your name?");
socket.emit("new-user", name);
addMessage("You joined");

socket.on("connected", (name) => {
  addMessage(`${name} connected`);
});

socket.on("chat-message", (data) => {
  addMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  addMessage(`${name} connected`);
});

socket.on("disconnected", (name) => {
  addMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const message = messageInput.value;
  socket.emit("send-message", message);
  messageInput.value = "";
  addMessage(`You: ${message}`);
}

function addMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
