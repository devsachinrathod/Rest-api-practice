// const ws = new WebSocket("ws://localhost:3000");
// const chatBox = document.getElementById("chat-box");
// const input = document.getElementById("msg");

// ws.onopen = () => {
//   console.log("✅ Connected to WebSocket");
// };

// ws.onmessage = (event) => {
//   const msg = document.createElement("div");
//   msg.textContent = event.data;
//   chatBox.appendChild(msg);
//   chatBox.scrollTop = chatBox.scrollHeight;
// };

// function sendMessage() {
//   const message = input.value.trim();
//   if (message) {
//     ws.send(message);
//     input.value = "";
//   }
// }


const obj = new Object({
    name:"sachin",
    age: 24,
    mobile: 1234567890

})
console.log(obj);

console.log("with stringfy",JSON.stringify(obj));