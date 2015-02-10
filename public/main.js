window.onload = startDemo;

function cubeNode(x,y,z) {
  this.x = x;
  this.y = y;
  this.z = z;


  //calculates the new x position of a node
  this.rotateX = function(angle) {
    var rad, cosa, sina, y, z
    rad = angle * Math.PI / 180
    cosa = Math.cos(rad)
    sina = Math.sin(rad)
    y = this.y * cosa - this.z * sina
    z = this.y * sina + this.z * cosa
    return new cubeNode(this.x, y, z)
  }

  //calculates the new y position of a node
  this.rotateY = function(angle) {
    var rad, cosa, sina, x, z
    rad = angle * Math.PI / 180
    cosa = Math.cos(rad)
    sina = Math.sin(rad)
    z = this.z * cosa - this.x * sina
    x = this.z * sina + this.x * cosa
    return new cubeNode(x,this.y, z)
  }

  //calculates the new z position of a node
  this.rotateZ = function(angle) {
    var rad, cosa, sina, x, y
    rad = angle * Math.PI / 180
    cosa = Math.cos(rad)
    sina = Math.sin(rad)
    x = this.x * cosa - this.y * sina
    y = this.x * sina + this.y * cosa
    return new cubeNode(x, y, this.z)
  }

  //uses x, y, and z coordinates to project
  this.project = function(viewWidth, viewHeight, fov, viewDistance) {
    var factor, x, y
    factor = fov / (viewDistance + this.z)
    x = this.x * factor + viewWidth / 2
    y = this.y * factor + viewHeight / 2
    return new cubeNode(x, y, this.z)
  }
}


//construct 8 nodes aka corners of the box
var node0 = new cubeNode(-1, 1, -1);
var node1 = new cubeNode(1, 1, -1);
var node2 = new cubeNode(1, -1, -1);
var node3 = new cubeNode(-1, -1, -1);
var node4 = new cubeNode(-1, 1, 1);
var node5 = new cubeNode(1, 1,  1);
var node6 = new cubeNode(1, -1, 1);
var node7 = new cubeNode(-1, -1, 1);
var nodes = [node0, node1, node2, node3, node4, node5, node6, node7];


// Define the nodes that compose each of the 6 faces. These numbers are
// indices to the nodes list defined above.
var faces = [[0,1,2,3],[1,5,6,2],[5,4,7,6],[4,0,3,7],[0,4,5,1],[3,2,6,7]]


//sets initial angle to 0
var angle = 0;

//runs the cube
function startDemo() {
  //selects canvas element
  canvas = document.getElementById("myCanvas");
  if( canvas && canvas.getContext ) {
    ctx = canvas.getContext("2d");
    //starts loop function that refreshes every 33ms
    setInterval(loop,33);
  }
}


//this function is run every 33ms
function loop() {
  var t = new Array();
  //canvas has white background
  ctx.fillStyle = "rgb(255,255,255)";
  //fill canvas with white
  ctx.fillRect(0,0,400,400);

  for( var i = 0; i < nodes.length; i++ ) {
    //
    var n = nodes[i];
    var r = n.rotateX(angle).rotateY(angle).rotateZ(angle);
    //r.project(viewWidth, viewHeight, fov, viewDistance)
    var p = r.project(400,200,128,3.5);
    //pushes new values to t array
    t.push(p)
    //console.log(t);
  }

  //box will be printed in black
  ctx.strokeStyle = "rgb(0,0,0)"

  //loops through each face
  for( var i = 0; i < faces.length; i++ ) {
    //assigns face to f
    var f = faces[i]
    //starts drawing
    ctx.beginPath()
    //draws first node of face
    ctx.moveTo(t[f[0]].x,t[f[0]].y)
    //draws  to second node of face
    ctx.lineTo(t[f[1]].x,t[f[1]].y)
    //draws to third node of face
    ctx.lineTo(t[f[2]].x,t[f[2]].y)
    //draws  to fourth node of face
    ctx.lineTo(t[f[3]].x,t[f[3]].y)
    //stops drawing and repeats for next face
    ctx.closePath()
    ctx.stroke()
  }

  //adds 2 degrees to the current angle
  angle += 2
}
