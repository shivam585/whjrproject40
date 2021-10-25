/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score
var bear,beari

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("ruthvij1.png","ruthvij2.png","ruthvij3.png");
  kangaroo_collided = loadAnimation("ruthvij1.png");
  jungleImage = loadImage("bg.png");
  shrub1 = loadImage("soda.png");
  shrub2 = loadImage("cola.png");
  shrub3 = loadImage("frenchfries.png");
  obstacle1 = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
 jumpSound = loadSound("jump.wav");
collidedSound = loadSound("collided.wav");
beari=loadImage("cartoonbear.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);


  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.5
  jungle.x = width /2;

  bear=createSprite(20,400,50,50)
  bear.scale=0.5
  bear.addImage(beari);

  kangaroo = createSprite(50,400,20,50);
  kangaroo.addAnimation("running", kangaroo_running);
  kangaroo.addAnimation("collided", kangaroo_collided);
  kangaroo.scale = 0.6;
  kangaroo.setCollider("rectangle",-20,0,100,200)
 // kangaroo.debug=true

  invisibleGround = createSprite(400,450,1600,10);
  invisibleGround.visible = false;

  
  gameOver = createSprite(400,300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,340);
  restart.addImage(restartImg);
  
  gameOver.scale = 1;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background("green");

  // kangaroo.x=camera.positionX-270;
  // kangaroo.x=Camera.position.x-270;
 kangaroo.x=camera.position.x-270;
//bear.x=camera.position.x-250;

 // kangaroo.x=Camera.Position.X-270;


   
  if (gameState===PLAY){

    jungle.velocityX=-3

 

    if(jungle.x<100)
    {
       jungle.x=400

    }

    if(kangaroo.isTouching(shrubsGroup)){
      score=score+1
    }

   


   //console.log(kangaroo.y)
    if(keyDown("space")&& kangaroo.y>270) {
      jumpSound.play();
      kangaroo.velocityY = -16;
    }
  
    kangaroo.velocityY = kangaroo.velocityY + 0.8
    spawnShrubs();
    spawnObstacles();

    kangaroo.collide(invisibleGround);
 
    
    if(obstaclesGroup.isTouching(kangaroo)){
     collidedSound.play();
      gameState = END;
    }
    if(shrubsGroup.isTouching(kangaroo)){

      shrubsGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    gameOver.x=camera.position.x;
    restart.x=camera.position.x;
    gameOver.visible = true;
    restart.visible = true;
    
    kangaroo.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    bear.velocityX=4

    kangaroo.changeAnimation("collided",kangaroo_collided);
    
  bear.collide(kangaroo)
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)) {
      reset();
  }
    
  }
  if (gameState === WIN) {
    jungle.velocityX = 0;
    kangaroo.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    kangaroo.changeAnimation("collided",kangaroo_collided);

    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
  }



  
  drawSprites();

  if(gameState===PLAY)
  fill("red")
  textSize(80)
  textFont("Algerian")
text("save me from this bear",200,200)



textSize(40);
stroke(3);
fill("blue")
text("Score: "+ score,camera.position.x,50);

if(score===5){
  gameState=WIN

  fill("yellow")
  stroke("black")
  textSize(150)
  textFont("Algerian")
text("YOU WON",300,300)
}





}

function spawnShrubs() {

  if (frameCount % 80 === 0) {

    // var shrub = createSprite(camera.position+500,330,40,10);
    var shrub = createSprite(camera.position.x+700,370,40,10);
   // var shrub = createSprite(camera.positionX+500,330,40,10);
    // var shrub = createSprite(Camera.position.x+500,330,40,10);

    shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
    //  shrub.scale=3
              break;
      case 2: shrub.addImage(shrub2);
    //  shrub.scale=3
              break;
      case 3: shrub.addImage(shrub3);
    //  shrub.scale=3
              break;
      default: break;
    }
         
    shrub.scale = 0.2;
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    shrubsGroup.add(shrub);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {

    // var obstacle = createSprite(camera.Position.X+400,330,40,40);
    // var obstacle = createSprite(Camera.Position.x+400,330,40,40);
     var obstacle = createSprite(camera.position.x+400,430,40,40);
    // var obstacle = createSprite(camera.position.x.400,330,40,40);

    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.15;   
 
    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle);
    
  }
}

function reset(){
  gameState = PLAY;

  bear.x=20
  bear.velocityX=0
  gameOver.visible = false;
  restart.visible = false;
  kangaroo.visible = true;
  kangaroo.changeAnimation("running",
               kangaroo_running);
  obstaclesGroup.destroyEach();
  shrubsGroup.destroyEach();
  score = 0;
}