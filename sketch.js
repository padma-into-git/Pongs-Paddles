//create the ball, playerPaddle and computerPaddle as sprite objects
var ball, playerPaddle, computerPaddle
let paddleHitSound, wallhitSound, failTone, imgBall, imgRobot, imgPlayer, imgPlayerFall;
//variable to store different state of game
var gameState = "serve";

//variables to keep the score
var compScore = 0;
var playerScore = 0; 

function preload(){
  paddleHitSound =  loadSound('sounds/paddlehit.mp3');
  wallHitSound = loadSound('sounds/wallhit.mp3');
  failTone = loadSound('sounds/hit.mp3');
  imgBall = loadImage('images/ball.jpg',200,200);
  imgPlayer = loadImage('images/player.jpg',10,10);
  imgRobot = loadImage('images/robot.jpg',0,10);
  imgPlayerFall = loadImage('images/playerfall.jpg',0,10);
}

function setup() {

  ball = createSprite(200,200,10,10);
  ball.addAnimation('explode', imgBall);
  playerPaddle = createSprite(380,200,10,70);
  playerPaddle.addAnimation('explode', imgPlayer);
  computerPaddle = createSprite(10,200,10,70);
  computerPaddle.addAnimation('explode', imgRobot);
}

function draw() {
  //clear the screen
  background("white");
  
  if(ball.isTouching(computerPaddle) || ball.isTouching(playerPaddle)){
    paddleHitSound.play();
  }
  //place info text in the center
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
   
  //display scores
  text(compScore, 170,20);
  text(playerScore, 230,20);
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  computerPaddle.y = ball.y;
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  createEdgeSprites();
  

  
  // ball.bounceOff(topEdge);
  // ball.bounceOff(bottomEdge);
  if(ball.y < 0 || ball.y > 400){
    wallHitSound.play();
    ball.velocityY = ball.velocityY*-1;
  }
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
 
  
  //serve the ball when space is pressed
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    playerPaddle.addAnimation('explode', imgPlayer);
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    
    failTone.play();
    
    if(ball.x > 400) {
      compScore = compScore + 1;
      playerPaddle.addAnimation('explode', imgPlayerFall);
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore === 5 || compScore === 5){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}
