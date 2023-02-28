const myinput = document.querySelector("#text")

const output = document.getElementById("output");

const form = document.querySelector('#chatForm');

let i = 1;

form.onsubmit = function (e) {
	e.preventDefault();
	console.log("test");
	output.insertAdjacentHTML("beforeend", `<p class="msg">${myinput.value}</p>`);
	output.scrollTop = output.scrollHeight;
	myinput.value = "";
	i++;
}