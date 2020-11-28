var diesound,jumpsound,checkpoint
var restart,restartimage
var gameover,gameoverimage
var trexcol
var play=1
var end=0
var gamestate=play
var cloudgroup,obstaclegroup 
var o1,o2,o3,o4,o5,o6,obstacle
var score=0
var invisibleground
var cloud,cloudimage
var groundImage,ground
var edge
var trex ,trex_running;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
groundImage=loadImage("ground2.png")
cloudimage=loadImage("cloud.png")
o1=loadImage("obstacle1.png")
  o2=loadImage("obstacle2.png")
  o3=loadImage("obstacle3.png")
  o4=loadImage("obstacle4.png")
  o5=loadImage("obstacle5.png")
  o6=loadImage("obstacle6.png")
trexcol=loadAnimation("trex_collided.png")
gameoverimage=loadImage("gameOver.png")
restartimage=loadImage("restart-text-seal-print-distress-texture-tag-placed-corners-blue-vector-rubber-dirty-scratched-textured-stamp-138610814.jpg")
diesound=loadSound("mixkit-arcade-retro-game-over-213.wav")
jumpsound=loadSound("salamisound-5189814-sfx-jump-4-game-computer.mp3")
checkpoint=loadSound("smb_vine.wav")
}

function setup(){
  createCanvas(1000,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.scale=0.8
  edge=createEdgeSprites()
  trex.addAnimation("running", trex_running);
trex.addAnimation("Col",trexcol)
  ground=createSprite(200,180,400,20)
ground.addImage(groundImage)
invisibleground=createSprite(200,190,400,10)
invisibleground.visible=false
obstaclegroup=createGroup()
  cloudgroup=createGroup()
trex.setCollider("circle",0,0,30)
  trex.debug=false
gameover=createSprite(280,100,50,50)
  gameover.scale=0.8
gameover.addImage(gameoverimage)
gameover.visible=false
restart=createSprite(280,60,50,50)
 restart.scale=0.2
  restart.addImage(restartimage)
  restart.visible=false
}

function draw(){
  //console.log(trex.y)
  var r=Math.round(random(1,100))
  background("brown")
  if(gamestate===play){
  if(score>0&& score % 200===0){
   checkpoint.play()  
    
  }
    obstacles()
  if(keyDown("space")&&trex.y>=90){
   trex.velocityY=-18
    jumpsound.play()   
  }
 trex.velocityY=trex.velocityY+1.5 
    ground.velocityX=-(4+3*score/100)
  clouds()  
   if(ground.x<0){
     ground.x=ground.width/2  
  }  
  score=score+Math.round((getFrameRate()/60))  
   if(obstaclegroup.isTouching(trex)){
    gamestate=end 
   diesound.play() 
   } 
  }
  else if(gamestate===end){
 ground.velocityX=0
  obstaclegroup.setVelocityXEach(0) 
   cloudgroup.setVelocityXEach(0) 
    obstaclegroup.setLifetimeEach(-1)
 cloudgroup.setLifetimeEach(-1)
  trex.changeAnimation("Col",trexcol)
  trex.velocityY=0
  gameover.visible=true
  restart.visible=true
  }
  if(mousePressedOver(restart)){
     reset()
     
     }
  trex.collide(edge[2])
  trex.collide(invisibleground)
  drawSprites();
  
  text("Your"+ " Score "+score,300,20)
}
function clouds(){
if(frameCount % Math.round(random(30,60))===0){
 cloud=createSprite(1000,70,10,10)  
cloud.velocityX=-(3+score/100)
cloud.addImage(cloudimage)
cloud.y=Math.round(random(10,90))
cloud.scale=random(0.5,1.5)
cloud.lifetime=600
  trex.depth=cloud.depth
  trex.depth=trex.depth+3
cloudgroup.add(cloud)
}

  
}
function obstacles(){
 if(frameCount % Math.round(random(80,110))===0){
obstacle=createSprite(1000,165,20,20) 
   obstacle.velocityX=-(4+score/100) 
   obstacle.scale=0.8
   obstacle.lifetime=600
  obstaclegroup.add(obstacle) 
   var a=Math.round(random(1,6))
   switch(a){
     case 1: obstacle.addImage(o1);
    break;
       case 2: obstacle.addImage(o2);
    break;
       case 3: obstacle.addImage(o3);
    break;
       case 4: obstacle.addImage(o4);
    break;
       case 5: obstacle.addImage(o5);
    break;
       case 6: obstacle.addImage(o6);
    break;
    default:break;
   
   }
   
   
 } 
  
}
function reset(){
  gamestate=play
  obstaclegroup.destroyEach()
  cloudgroup.destroyEach()
gameover.visible=false
restart.visible=false
  score=0
  trex.changeAnimation("running", trex_running)
}
