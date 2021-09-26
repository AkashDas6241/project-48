var  mario, mario_running, mario_collided;
var ground, invisibleGround, groundImg;
var bgImg;
var brick, brickImg, brickGroup;
var score = 0
var ob1,obstacle, obstacleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameOverImg;
var restart, restartImg;
var sound;
var die, jump;

function preload(){
    mario_running = loadAnimation("mario00.png", "mario01.png", "mario03.png");
    mario_collided = loadImage("collided.png")

    groundImg = loadImage("ground2.png");

    bgImg = loadImage("bg.png");

    brickImg = loadImage("brick.png");

    ob1 = loadAnimation("obstacle1.png", "obstacle2.png", "obstacle3.png", "obstacle4.png" );

    gameOverImg = loadImage("gameOver.png");

    restartImg = loadImage("restart.png");

    sound = loadSound("checkPoint.mp3");

    die = loadSound("die.mp3");

    jump = loadSound("jump.mp3");
}

function setup(){
    createCanvas(600,350);
    mario = createSprite(50,295,20,50);
    mario.addAnimation("running", mario_running);
    mario.addAnimation("collided", mario_collided);
    mario.scale = 2;

    ground = createSprite(200,330,400,20);
    ground.addImage(groundImg);
   
    invisibleGround = createSprite(300,300,600,10);
    invisibleGround.visible = false;
    
    brickGroup = new Group();

    obstacleGroup = new Group();

    gameOver = createSprite(300,150);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300,200);
    restart.addImage(restartImg);

}
function draw(){
    background(bgImg);

    if(gameState === PLAY){
        ground.velocityX = -6

        mario.collide(invisibleGround);

        if(keyDown ("space") && mario.y >=256){
            mario.velocityY = -12
            jump.play();
        }

        if(ground.x <0){
            ground.x = ground.width/2;
        }
        
        mario.velocityY = mario.velocityY +0.8;

        spawnBricks();
        spawnObstacle();

        for(var i = 0; i<brickGroup.length; i++){
            if(brickGroup.get(i). isTouching(mario)){
                brickGroup.get(i).remove();
                score = score+1
            }
        }
        
        gameOver.visible = false;
        restart.visible = false;

        if(mario.isTouching(obstacleGroup)){
            gameState = END;
            die.play();


        }
        if(score%5 == 0 & score > 0){
            sound.play();
        }
    }
    else if(gameState === END){

        obstacleGroup.setVelocityXEach(0);
        brickGroup.setVelocityXEach(0);
        ground.velocityX = 0;
        mario.velocityY = 5;

        mario.changeAnimation("collided", mario_collided);

        brickGroup.setLifetimeEach(-1);

        obstacleGroup.setLifetimeEach(1)

        gameOver.visible = true;
        restart.visible = true;

      
    }
    if(mousePressedOver(restart)) {
        reset();
      }

  
  
    
    textSize(20);
    fill ("black");
    text("score = " +score, 450,30);

    

    drawSprites()

}
function spawnBricks(){
    if(frameCount % 60 === 0){
        brick = createSprite(600,120,40,10);
        brick.addImage(brickImg);
        brick.velocityX = -5;
        brick.y = Math.round(random(150,200));
        brick.lifetime = 150;
        brickGroup.add(brick);
        mario.depth = brick.depth +1;
     }
}
function spawnObstacle(){
    if(frameCount % 100 === 0){
        obstacle = createSprite(600,270,10,10);
        obstacle.velocityX = -6;
        obstacle.addAnimation("enemy",ob1);
        obstacle.lifetime = 100;
        obstacleGroup.add(obstacle);

    }
}
function reset(){
    gameState = PLAY;
    mario.y = 295;
    mario.x = 50;
    console.log(mario.y);
    mario.changeAnimation("running", mario_running);
    obstacleGroup.destroyEach();
    brickGroup.destroyEach();
    score = 0;
}