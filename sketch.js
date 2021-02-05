var Knife;
var PLAY=1;
var END=0;
var start;
var gameState =start;
var score=0;
var count=0; 
var Life;
var Life1;
var Life2;
//var bg;
function preload(){
  knifeImg=loadImage("sword.png")
 fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  monsterImg=loadAnimation("alien1.png","alien2.png")
  Over=loadImage("game over.PNG")
  lifeImg=loadImage("life .PNG")
  life1Img=loadImage("life -1.PNG")
  life2Img=loadImage("life -2.PNG")
  bgImg=loadImage("ninja background.png")
  knifeSound=loadSound("knifeSwooshSound.mp3")
gameSound=loadSound("Game Over.mp3")
  youwin=loadImage("you-win-1.jpg")
}
function setup(){
  createCanvas(500, 500);
  
   life=createSprite(20,45,20,20);
  life1=createSprite(45,45,20,20);
  life2=createSprite(70,45,20,20);
  Knife=createSprite(200,200,20,20);
  Knife.addImage(knifeImg); 
  Knife.scale=0.7;
  fruitGroup=new Group();
  enemyGroup=new Group();
  life.addImage(lifeImg)
   life1.addImage(life1Img)
   life2.addImage(life2Img)
  //bg=createSprite(250,250);
 // bg.addImage(bgImg)
  
}

function draw(){
background(bgImg)
  if(gameState===start){
    fill("yellow");
    textSize(16);
    textStyle(BOLDITALIC);
    text("Press space to start the Game", 135, 230);
    text("Hit 30 points to win",180,250);
    Knife.y=300;
     Knife.x=250
  }
  if(keyDown("space")&&gameState===start){
    gameState=PLAY;
  }
  //text(mouseX+","+mouseY,mouseX,mouseY);
if(gameState===PLAY){
 Knife.y=mouseY; 
 Knife.x=mouseX;
  textSize(16);
  textStyle(BOLDITALIC);
  fill("yellow")
  text("score:"+score,400,40);
  random(fruitGroup,enemyGroup) ;
 if(fruitGroup.isTouching(Knife)){
   fruitGroup.destroyEach();
   score=score+1
  knifeSound.play(); 
 }
    fruit();
  if(enemyGroup.isTouching(Knife)){
    enemyGroup.destroyEach();
    score=score-2;
    count=count+1 
    }
  enemy();
  if(count===1){
    life2.remove();
  }
   if(count===2){
    life1.remove();
  }
   if(count===3){
    life.remove();
  }
  if(count===4){
    gameState=END;
  }
  if(score===30){
    Knife.addImage(youwin);
    Knife.x=250;
    Knife.y=250; 
  fruitGroup.destroyEach();
  enemyGroup.destroyEach();
  fruitGroup.setVelocityXEach(0);
  enemyGroup.setVelocityXEach(0);
  fruitGroup.setVelocityYEach(0);
  enemyGroup.setVelocityYEach(0);
    }
} 
  else if(gameState===END){
  
  //gameOver=createSprite(200,200);
  
    fruitGroup.destroyEach();
  enemyGroup.destroyEach();
  fruitGroup.setVelocityXEach(0);
  enemyGroup.setVelocityXEach(0);
  fruitGroup.setVelocityYEach(0);
  enemyGroup.setVelocityYEach(0);
    Knife.addImage(Over);
    Knife.x=250;
    Knife.y=250; 
    gameSound.play()
}
drawSprites();
}

function fruit(){
  if(frameCount % 80===0){
   var fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    var rand=Math.round(random(1,4))
   switch(rand){
     case 1:fruit.addImage(fruit1);
            break;
     case 2:fruit.addImage(fruit2);
            break;
     case 3:fruit.addImage(fruit3);
            break;
     case 4:fruit.addImage(fruit4);
            break;
    default:break;
  }
    position = Math.round(random(1,2));
    if(position==1){
      fruit.x =600;    
      if(score % 4===0){
        fruit.velocityX=Math.round(random(-7,-20))+score;
      }
      else{
        fruit.velocityX=Math.round(random(-7,-20));
      }
    }
    if(position==2){
      fruit.x =-10; 
    if(score % 4===0){
      fruit.velocityX=Math.round(random(20,7))+score;
    } 
      else{
        fruit.velocityX=Math.round(random(20,7))
        }
       }
    fruit.y=Math.round(random(50,350));
    //fruit.velocityX=Math.round(random(20,-20));
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
}
}
function enemy(){
  if(frameCount % 200===0){
  var  monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImg);
    monster.y=Math.round(random(100,300));
   // monster.velocityX=Math.round(random(-7,-20));
    monster.setLifetime=50;
    enemyGroup.add(monster);
    position = Math.round(random(1,2));
    if(position==1){
      monster.x =600; 
      if(score % 10===0){      monster.velocityX=Math.round(random(-7,-20))+score;
    }
      else{
        monster.velocityX=Math.round(random(-7,-20)) 
      }
    }
    if(position==2){
      monster.x =-10;
      if(score % 10===0){      monster.velocityX=Math.round(random(20,7))+score;
      }
      else{
        monster.velocityX=Math.round(random(20,7))
      }
    }
  }
}  