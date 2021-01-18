
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup
var ground;
var score;
var GameState = "play"

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 400)
  
  score = 0
 
  monkey = createSprite(50, 300, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1
  
  ground = createSprite(300, 375, 1200, 50)
  ground.velocityX = -5;
  
  obstaclesGroup = new Group();
  foodGroup = new Group ();
  
}


function draw() {
  
  background("lightblue")
  
  if (GameState === "play"){
  
  if (ground.x < 0 ){
    ground.x = ground.width/2
  }
   
  if (keyDown("space")){
    monkey.velocityY = -14
  }
  
  if (monkey.y < 150) {
    monkey.velocityY = 1
  }
   
  monkey.velocityY = monkey.velocityY + 0.8
  spawnObstacles();
  spawnBananas();
  }
  monkey.collide(ground)
  drawSprites();
  textSize(26)
  text("score: "+score, 50, 50)
  
  if (foodGroup.isTouching(monkey)){
    score = score+1
  }
  
  if (obstaclesGroup.isTouching(monkey)){
    obstaclesGroup.setVelocityXEach(0)
    foodGroup.setVelocityXEach(0)
    obstaclesGroup.destroyEach();
    foodGroup.destroyEach();
    monkey.destroy();
    ground.velocityX = 0
    GameState = "end"
  }
  
if (GameState === "end"){
  textSize(26)
  text("The End", 250, 180)
}
  
}

function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(700,332,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(6 + score/100);
    obstacle.scale = 0.175;
    obstacle.lifetime = 110;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
  
function spawnBananas(){
  if (frameCount % 120 === 0){
    var banana = createSprite(700, 200, 10, 10);
    banana.y = Math.round(random(150,200));
    banana.addImage(bananaImage);
    banana.velocityX = -(6 + score/100);
    banana.scale = 0.2;
    banana.lifetime = 110;
    foodGroup.add(banana);
  }
 }




