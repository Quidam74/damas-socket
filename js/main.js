 let socket = io("10.103.1.202:8080")
 var monPseudo = document.querySelector(".chat-pseudo").value;
 var personneInChat = Array (0)
 personneInChat.push(monPseudo)
 function send(){
 	var message = document.querySelector(".chat-input").value
 	socket.emit("message",{ pseudo:monPseudo,text:message})
 }


 function listen(){
 	listenMessage()
 	listenpoke()
 	
 }


 function listenMessage(){
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
 		listeConnecter(pseudo,message)

 	})
 }
 function listenpoke(){
 	socket.on("poke",function(poke){
 		document.querySelector("."+poke.pseudo).classList.add("poked")
 		console.log(poke)

 	})
 }
 function listeConnecter(pseudo,message){

 	var existe = false
 	for (var i = personneInChat.length - 1; i >= 0; i--) {
 		if(personneInChat[i]==pseudo)
 			existe=true
 	}

 	if(!existe)
 		{		personneInChat.push(pseudo)
 			var thingToPrepend = "<p class='canPokeThem "+pseudo.replace(" ","_")+"'> "+pseudo+"</p>"
 			document.querySelector(".chat-sidePanel").innerHTML += thingToPrepend

 			document.querySelector("."+pseudo.replace(" ","_")).addEventListener("click",function(elem){
 				console.log(elem.currentTarget.innerHTML)
 				socket.emit("poke",{ pseudo:monPseudo,recipient:elem.currentTarget.innerHTML})

 			})
 			
 		}
 		

 		
 	}


 	document.addEventListener("DOMContentLoaded", function(event) {
 		var chat = document.querySelector(".chat")
 		var showChat = document.querySelector(".chat-show")
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
 			showChat.classList.remove("hide")
 		});
 		document.querySelector(".chat-show").addEventListener("click", function(event){
 			chat.classList.remove("hide")
 			showChat.classList.add("hide")
 		});

 	});


