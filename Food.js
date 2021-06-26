class food{
    constructor(){
        this.image = loadImage("Milk.png")
    }

    getFoodStock(){
        db.ref('Food').on("value",function(data){foodS = data.val();}) 
    }
    updateFoodStock(x){
        db.ref('/').update({Food:x})
    }
    display(){
        var x=10,y=150;
        imageMode(CENTER);
        if(foodS!=0){
            for(var i=0;i<foodS;i++){
              if(i%10==0){
                x=100;
                y=y+50;
              }
              image(this.image,x,y,50,50);
              x=x+30;
            }
          }

    }
}