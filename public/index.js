// let socket = new WebSocket("ws://localhost:8080/", 'echo-protocol');

// socket.onopen = function(e) {
// 	alert("[open] Connection established");
// 	alert("Sending to server");
// 	socket.send("My name is John");
// };
  
// socket.onmessage = function(event) {
// 	alert(`[message] Data received from server: ${event.data}`);
// };
  
// socket.onclose = function(event) {
// 	if (event.wasClean) {
// 	  alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
// 	} else {
// 	  // par exemple : processus serveur arrêté ou réseau en panne
// 	  // event.code est généralement 1006 dans ce cas
// 	  alert('[close] Connection died');
// 	}
// };
  
// socket.onerror = function(error) {
// 	alert(`[error]`);
// };

const socket = io();

let myinput = document.querySelector("#text")

const output = document.getElementById("output");

const form = document.querySelector('#chatForm');

if (form)
{
	form.onsubmit = function (e) {
		e.preventDefault();
		console.log("test");
		if (output && myinput)
		{
			output.insertAdjacentHTML("beforeend", `<p class="msg">${myinput.value}</p>`);
			output.scrollTop = output.scrollHeight;
			myinput.value = "";
		}
	}
}