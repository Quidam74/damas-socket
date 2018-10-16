<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Form</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>

	<main class="chat">
		<header class="chat-header"><h1 class="chat-titre">Mon chat génial</h1><div class="chat-close"></div></header>
		<div class="chat-fenetre"></div>
		<div class="chat-form"><input class="chat-pseudo" type="text" name="pseudo" value="Quidam"><input id="chat-sendingMessage" class="chat-input" type="text" name="message"></div>
	</main>
	<script src='js/socket.io.min.js'></script>
	<script src='js/main.js'></script>
	
</body>
</html>