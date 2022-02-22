const socket = io('http://localhost:8000');

//Get DOM elements in a js variables
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

var audio = new Audio('ting.mp3');
//Audio for recieving messages




//append funtion which will append event info to the container
const append = (message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
    if(position == 'left')
    {
      audio.play();
    }    

}



//ask new user for their name and let the server know.
const name = prompt("Enter your name to join")
socket.emit('new-user-joined' , name)

//if a new user join recieve the event from the server
socket.on('user-joined' , name =>{
    append(`${name} joined the chat`, 'right')
})

//if server sends a messages recieve a message.
socket.on('recieve' , data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

//if soomeone leaves the chat append the info to the container
socket.on('left' , name =>{
    append(`${name} left the chat` , 'right')
})

//if the form gets submitted send server the message.
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send' , message);
    messageInput.value = ''

 
})
