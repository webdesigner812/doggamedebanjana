var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var view

var dog


//Game States
var PLAY=1;
var END=0;
var gameState=1;

var coinsnd,hitsnd,bgmusic

function preload(){
  pathImg = loadImage("road1.jfif");
  boyImg = loadImage("dog.png");
  cashImg = loadImage("food.png");
  diamondsImg = loadImage("treats.png");
  jwelleryImg = loadImage("gold.png");
  swordImg = loadImage("alien.png");
  //endImg =loadAnimation("gameOver.png");
  coinsnd = loadSound("coinsnd.wav");
  hitsnd = loadSound("hit.wav")

  view = loadImage("view 4.jpg")

  dog= loadImage("scoredog.png")
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4+3*treasureCollection/100


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("dogRunning",boyImg);
boy.scale=0.7;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(view);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 350){
    path.y = height/2;
  }
  
createCash();
createDiamonds();
createJwellery();    
createSword();    

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+5;
      coinsnd.play()
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+10;
      coinsnd.play();
      
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 2;
      coinsnd.play();
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        hitsnd.play();
        /*boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;*/
        //boy.visible=false;
        
        //cashG.destroyEach();
        //diamondsG.destroyEach();
        //jwelleryG.destroyEach();
        //swordGroup.destroyEach();
        
        /*cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);*/

        // swal({
        //   title: "Good job!",
        //   text: "You clicked the button!",
        //   icon: "success",
        //   button: "Aww yiss!",
        // });

        gameOver();
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }

}

function createCash() {
  if (World.frameCount % 100 == 0) {
  var cash = createSprite(Math.round(random(width/2-100, width-400),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.2;
  cash.velocityY = 5;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(width/2-100, width-400),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.2;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(width/2-100, width-300),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.3;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 230 == 0) {
  var sword = createSprite(Math.round(random(width/2-100, width-400),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.3;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

function gameOver(){
  swal({
    imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ3DLjdhLhKPOUQQp2q_6EQKkIs-WdXGms5A&usqp=CAU",
    imageSize:"100x100",
    title:"good Job!",
    text: `Your Score ${"\n"}${treasureCollection}`, 
    button: "Tap to play again",


  });
}