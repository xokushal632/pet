var dog,sadDog,happyDog;
var db,foodS,foodStock;
var button1,button2,lastFed,feed=0,foodGr;
var fedTime,f1,timef;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,500);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  db = firebase.database();

  //create food object
  foodGr = new food();

  //create feed button and addfood button
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}

function draw() {
  background(46,139,87);

    //display bottle
  foodGr.display();
  
  //read initial value from db(feedTime)
  fedTime=db.ref('FeedTime');
  fedTime.on("value",function(data){
    timef=data.val();
    console.log("first read "+timef);
  });
 
//read initial value from db(food)

  foodGr.getFoodStock();


  fill("red");
  text("Food: "+foodS,250,400);
  
  //condition to display time
  
  if (timef>=12){
    text("Last Feed : "+timef%12 + " PM",350,30);
  }
  else if (timef === 0){
    text("Last Feed :12 AM",350,30);
  }
  else {

    text("Last Feed : "+timef + " AM",350,30);

  }

  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  
  //condition to decrement the bottles if we press feed the dog button
  if(foodS=== 0){
    foodGr.updateFoodStock(0);
  }else{
    foodS--;
    foodGr.updateFoodStock(foodS);
  }

  //updating feedtime in db
  timef=hour();
  fedTime=db.ref('/');
  fedTime.update({
   FeedTime : timef
  });
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  //console.log(foodS);
  //update value in db of Food
  db.ref('/').update({
    Food:foodS
  })
}


