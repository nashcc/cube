var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');

//bottom
ctx.beginPath();
ctx.moveTo(0, 200);
ctx.lineTo(200, 200);
ctx .stroke();

//top
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(200, 0);
ctx .stroke();


//right side
ctx.beginPath();
ctx.moveTo(200, 0);
ctx.lineTo(200, 200);
ctx .stroke();


//left side
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(0, 200);
ctx .stroke();
