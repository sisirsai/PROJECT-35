var dog , happyDog , dogImg , database , foodS , foodStock;

function preload()
{

happyDog  =  loadImage("images/dogImg1.png");
dogImg   =  loadImage("images/dogImg.png");

}

function setup() {
  createCanvas(500 , 500);

  dog = createSprite(width/2,height/2 + 10,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.23;

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(happyDog);
    
      }

  drawSprites();

  
textSize(20);
stroke("darkgreen");
fill("lavender");
text("Food Remaining : " + foodS,40,400);

textSize(10);
stroke("darkgreen");
fill("lavender");
text("NOTE : Press UP ARROW TO FEED THE PET A BOTTLE FULL OF DRAGO MILK!!!!",70,10);

}

function readStock(data)
{

foodS = data.val();

}

function writeStock(x)
{

  if(x<0)
  {
    x = 0;

  }else{

    x = x-1;

  }

database.ref("/").update({
  Food:x})

}
