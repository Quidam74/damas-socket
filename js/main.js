 	let socket = io("10.103.1.202:8080")
 	var monPseudo;
 	document.addEventListener("DOMContentLoaded", function(event) {
 		var chat = document.querySelector(".chat")
 		var chat = document.querySelector(".chat-show")
 		listen()


 		document.querySelector("#chat-sendingMessage").addEventListener("keypress", function(event){
 			if(event.key == "Enter")
 			{
 				monPseudo = document.querySelector(".chat-pseudo").value
 				send()
 			}
 		});
 		document.querySelector(".chat-close").addEventListener("click", function(event){
 			chat.classList.add("hide")
 		});

 	})

 	function send(){
 		var message = document.querySelector(".chat-input").value
 		var a = socket.emit("message",{ pseudo:monPseudo,text:message})
 	}


 	function listen(){
 		socket.on("message",function(lettre){
 			var message = lettre.text
 			var pseudo =lettre.pseudo

 			document.querySelector(".chat-input").value =""
 			var classPseudo =""
 			if(pseudo == monPseudo)
 				classPseudo="chatFenetre-unMessage mon-pseudo"
 			else
 				classPseudo ="chatFenetre-unMessage"


 			var divUnMessage ="<div class='"+classPseudo+"'>"+"<p class='unMessage-pseudo'>"+pseudo+":</p>"+"<p>"+message+"</p class='unMessage-message'>"+"</div>"
 			document.querySelector(".chat-fenetre").innerHTML += divUnMessage
 			

 		})
 	}