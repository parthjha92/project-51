var PLAY = 1;
var END = 0;
var gameState = PLAY;

var runner, runner_running
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  runner_running = loadAnimation("newRunner_01.gif","newRunner_02.gif","newRunner_03.gif","newRunner_04.gif","newRunner_05.gif","newRunner_06.gif","newRunner_07.gif","newRunner_08.gif");
//  runner_collided = loadAnimation("runner_collided.png");
  
  groundImage = loadImage("background.gif");
  
 // cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle.png");

  obstacle1.scale=0.2
  restartImg = loadImage("restart.jpg")
  gameOverImg = loadImage("gameOver.jpg")
  
 // jumpSound = loadSound("jump.mp3")
 // dieSound = loadSound("die.mp3")
  //checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  

  
 
 // runner.addAnimation("collided", runner_collided);
  
 runner2 = createSprite(150,180,20,50);
 // runner.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  runner = createSprite(150,180,20,50);
   
 runner.addAnimation("running", runner_running);
 runner.scale= 0.5
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
 restart.addAnimation("a",restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  runner.setCollider("rectangle",0,0,runner.width,runner.height);
  runner.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  setFrameRate(100);
  
  if(gameState === PLAY){
    //move the 
    gameOver.visible = false;
    restart.visible = false;
    //change the runner animation
     // runner.changeAnimation("running", runner_running);
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    console.log(frameCount)
    console.log(getFrameRate());
    if(score>0 && score%100 === 0){
  //     checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& runner.y >= 100) {
        runner.velocityY = -12;
    //    jumpSound.play();
    }
    
    //add gravity
    runner.velocityY = runner.velocityY + 0.8
  
    //spawn the clouds
   
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(runner)){
        //runner.velocityY = -12;
    //    jumpSound.play();
        gameState = END;
     //   dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     //change the runner animation
      //runner.changeAnimation("collided", runner_collided);
       

     
      ground.velocityX = 0;
      runner.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
 
   
  if(mousePressedOver(restart)){
 
  reset();
  
  
  }
  
   
   }
  
 
  //stop runner from falling down
  runner.collide(invisibleGround);
  
  
  
  

  drawSprites();
}

function reset(){
  gameState = PLAY
  gameOver.visible=false
  restart.visible= false
  obstaclesGroup.destroyEach();
   score=0
}



function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,1,1);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacle1);
    //generate random obstacles
   /* var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }*/
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

