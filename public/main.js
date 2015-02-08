
//construct 8 nodes aka corners of the box
var node0 = [-100, -100, -100];
var node1 = [-100, -100,  100];
var node2 = [-100,  100, -100];
var node3 = [-100,  100,  100];
var node4 = [ 100, -100, -100];
var node5 = [ 100, -100,  100];
var node6 = [ 100,  100, -100];
var node7 = [ 100,  100,  100];
var nodes = [node0, node1, node2, node3, node4, node5, node6, node7];


//define the edges from one node to the next
var edge0  = [0, 1];
var edge1  = [1, 3];
var edge2  = [3, 2];
var edge3  = [2, 0];
var edge4  = [4, 5];
var edge5  = [5, 7];
var edge6  = [7, 6];
var edge7  = [6, 4];
var edge8  = [0, 4];
var edge9  = [1, 5];
var edge10 = [2, 6];
var edge11 = [3, 7];
var edges  = [edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11];


//select canvas
var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');

//move canvas (0,0) point to center of cube
ctx.translate(200, 200);

var cubeRotate = function(theta){
  var sinTheta = Math.sin(theta);
  var cosTheta = Math.cos(theta);

  for(var n=0; n<nodes.length; n++){
    var node = nodes[n];
    var x = node[0];
    var y = node[1];
    node[0] = x*cosTheta - y*sinTheta;
    node[1] = y*cosTheta + x*sinTheta;
  }
};

cubeRotate(90);

var draw = function(){
  //draw the cube
  for (var e = 0; e < edges.length; e++) {
    var n0 = edges[e][0];
    var n1 = edges[e][1];
    var node0 = nodes[n0];
    var node1 = nodes[n1];

  /*
    //the next two lines draw the cube face on
    ctx.moveTo(node0[0], node0[1]);
    ctx.lineTo(node1[0], node1[1]);
    ctx.stroke();
    //the next three lines draw the vertices for the face on
    ctx.beginPath();
    ctx.arc(node0[0], node0[1], 5, 0, 2 * Math.PI, true);
    ctx.fill();

  */
    //the next three lines draw the cube at an angle so you can see 3D shape
    ctx.moveTo(node0[0]+node0[2]/2, node0[1]+node0[2]/2);
    ctx.lineTo(node1[0]+node1[2]/2, node1[1]+node1[2]/2);
    ctx.stroke();
    //the next three lines draw the vertices for the angled cube
    ctx.beginPath();
    ctx.arc(node0[0]+node0[2]/2, node0[1]+node0[2]/2, 5, 0, 2 * Math.PI, true);
    ctx.fill();
  }
};

draw();
