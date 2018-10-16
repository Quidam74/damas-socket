
let canvas = document.querySelector("#myCanvas")
let c = canvas.getContext("2d")
let w = canvas.width
let h = canvas.height
let object = Array(0)
let coin;
let gameOver = false
let win = false
let nbWin = 0.
let nblose = 0.

document.addEventListener("DOMContentLoaded", function(event) {
	
	init()

})

function init(){
	console.log(nbWin/(nbWin+nblose)*100)
	object = Array(0)
	
	c.beginPath()
	c.clearRect(0,0,w,h)
	c.fillStyle = "red"
	c.strokeStyle = "red"
	
	for (var i = 30- 1; i >= 0; i--) {
		let a = Math.round(Math.random()*w)
		let b = Math.round(Math.random()*h)
		let d = Math.round(Math.random()*20+10)
		object.push({posX:a,posY:b,rayon:d})
		c.beginPath()
		c.arc(a,b,d,0,8*Math.PI)
		c.fill()	
	}

	let a = Math.round(Math.random()*w)
	let b = Math.round(Math.random()*h)
	let d = 50;
	c.fillStyle = "yellow"
	coin= {posX:a,posY:b,rayon:d}
	c.beginPath()
	c.arc(a,b,d,0,8*Math.PI)
	c.fill()	

	

	c.beginPath()

	c.lineWidth = 15;
	c.moveTo(0,0)
	c.lineTo(0,h)
	c.moveTo(0,h)
	c.lineTo(w,h)
	c.moveTo(w,h)
	c.lineTo(w,0)
	c.moveTo(w,0)
	c.lineTo(0,0)
	c.moveTo(0,0)
	c.stroke()
	
	drawing=false
	
	canvas.addEventListener("mousedown",function(event){
		drawing=true
		c.beginPath();
		c.moveTo(event.clientX,event.clientY)
	})
	canvas.addEventListener("mouseup",function(event){
		//drawing= false
	})
	canvas.addEventListener("mousemove",function(event){

		if(drawing){
			if(Math.sqrt(Math.pow(event.clientX - coin.posX,2) + Math.pow(coin.posY - event.clientY,2))< coin.rayon)
				win = true

			if(Math.round(event.clientY)==0+10 ||Math.round(event.clientX)==0+10 ||Math.round(event.clientX)==w-10 ||Math.round(event.clientY)==h-10)
			{
				gameOver = false
				init()
			}

			for(let boule in object)
			{
				index = boule
				if(Math.sqrt(Math.pow(event.clientX - object[index].posX,2) + Math.pow(object[index].posY - event.clientY,2))< object[index].rayon)
					gameOver=true
			}
			if(gameOver){
				gameOver = false
				init()
				console.log("lose")
				nblose++
			}
			if(win)
			{
				win = false
				init()
				console.log("win")
				nbWin++
			}



			c.strokeStyle ="black"
			c.lineTo(event.clientX,event.clientY)
			c.stroke()


		}
	})
}