 //let socket = io("10.103.1.202:8080")
 let socket = io("10.7.254.113:8080")
 let canvas = document.querySelector("#myCanvas")
 let localPlayers = { }
 let c = canvas.getContext("2d")
 let w = canvas.width
 let h = canvas.height
 let go = "h"
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






	//begin canvas
	
	//let drawing = false
	/*canvas.addEventListener("mousemove",function(event){
		c.beginPath();
		c.strokeStyle ="orange"
		c.fillStyle = "blue"
		c.arc(event.clientX,event.clientY,40,0,2*Math.PI)
		c.fill()
		c.stroke()

	})*/
	/*
	canvas.addEventListener("mousedown",function(event){
		drawing=true
		c.beginPath();
		c.moveTo(event.clientX,event.clientY)
	})
	canvas.addEventListener("mouseup",function(event){
		drawing= false
	})
	canvas.addEventListener("mousemove",function(event){
		if(drawing){
			
			c.strokeStyle ="black"
			c.lineTo(event.clientX,event.clientY)
			c.stroke()
		}
	})

	let p = {x:400, y:300,sx:1,sy:1}
	let r = {x: 20, y:5}
	let  posR= Array()
	for (var i = 5 - 1; i >= 0; i--) {
		r.x=Math.random()*100
		r.y=Math.random()*100
		posR.push(r)
	}
	console.log(posR)

	setInterval(function(){
		c.clearRect(0,0,w,h)

		c.save();
		c.translate(p.x,p.y);
		
		for (var i = 5 - 1; i >= 0; i--) {
			c.beginPath();	
			c.fillStyle = "orange"
			c.arc(Math.random()*100,Math.random()*100,10,0,2*Math.PI)
			c.fill()
			c.stroke()	
		}
		

		c.restore()

		p.x+=p.sx
		p.y+=p.sy
		p.sy+=0.1
		if(p.y>h-40)
			p.sy = -p.sy*0.9
		if(p.x>w-40)
		{
			p.sx=-p.sx
		}
	}, 10);

	*/
	socket.emit("enter",{pseudo:"Quidam", color: "#6f90f3"})
	getPlayers()

	var currentStep = "drawPlayers"
	setInterval(function(){
		switch (currentStep) {
			case "drawPlayers":
			drawPlayers()
			currentStep = "moveMyPlayer"
			break;
			case "moveMyPlayer":
			moveMyPlayer()
			currentStep = "drawPlayers"
			break;
		}
	}, 10);

	document.addEventListener('keypress', function(event){
		if(event.key=="z")
			go = "h"
		if(event.key=="s")
			go = "b"
		if(event.key=="q")
			go = "g"
		if(event.key=="d")
			go = "d"
		
		console.log("aaa")

	});
	
	
});

 	function drawPlayers(){
 		
 		c.clearRect(0,0,w,h)
 		for(let pseudo in localPlayers)
 		{
 			let player = localPlayers[pseudo]
 			c.beginPath()
			c.arc(player.x*w,player.y*h,10,0,8*Math.PI)
 			c.fillStyle = player.color
 			c.fill()
 			c.beginPath()
 			c.fillText(pseudo,player.x*w-20,player.y*h-10)


 		}
 		
 	}

 	function getPlayers(){
 		socket.on("all",function(players){
 			localPlayers = players
 		})
 	}
 	function moveMyPlayer(){
 		//console.log({pseudo:"Quidam", dir:go})
 		socket.emit("turn",{pseudo:"Quidam", dir:go})
 	
 	}