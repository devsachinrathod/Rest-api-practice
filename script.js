// const ws = new WebSocket("ws://localhost:3000");
// const chatBox = document.getElementById("chat-box");
// const input = document.getElementById("msg");
import express from 'express';
const app = express();


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

function MergeTwoArraysWithsorting(arr1, arr2) {
    const mergedArray = [...arr1, ...arr2];
    for (let i = 0; i < mergedArray.length - 1; i++) {
        for (let j = 0; j < mergedArray.length - i - 1; j++) {
            if (mergedArray[j] > mergedArray[j + 1]) {
                // Swap
                const temp = mergedArray[j];
                mergedArray[j] = mergedArray[j + 1];
                mergedArray[j + 1] = temp;
            }
        }
    }

    return mergedArray;
}


const array1 = [5, 3, 8, 1];
const array2 = [7, 2, 6, 4];
const mergedAndSortedArray = MergeTwoArraysWithsorting(array1, array2);
console.log(mergedAndSortedArray); // Output: [1, 2, 3, 4, 5, 6, 7, 8]