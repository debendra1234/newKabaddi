var player1,player2;
var p1Animation,p2Animation;
var database;
var gameState = 0; 
var position={};
function preload(){
    p1Animation = loadAnimation("assets/assets/player1a_flip.png","assets/assets/player1b_flip.png","assets/assets/player1a_flip.png");
    p2Animation = loadAnimation("assets/assets/player2a.png","assets/assets/player2b.png","assets/assets/player2a.png");
}
function setup(){
    database = firebase.database();
//root reference is given by forward slash
    database.ref('/').set({
        'gameState' : 0
    });

createCanvas(600,600);
player1=createSprite(450,300,10,10);
player1.addAnimation("dancing",p1Animation);
player1.scale=0.5;

player2=createSprite(150,300,10,10);
player2.addAnimation("singing",p2Animation);
player2.scale=0.5;


//.on is addListener -> it reads from the database

position.x=450;
position.x=300;



}


function draw (){

    background("white");
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
       console.log(gameState);
    });

    

    if (keyDown(LEFT_ARROW)){
      writePosition(-5,0);
    }
    if (keyDown(RIGHT_ARROW)){
        //writePosition(5,0);
    }
    drawLine();
    drawLine1();
    drawLine2();   
    drawSprites();

}
function drawLine(){
    
for(var i = 0; i<=600; i = i + 20 ){
line(300,i,300,i+10);

}

}
function drawLine1 (){
    stroke("red");
    strokeWeight(4);
    for(var i=0;i<=600;i=i+20){
        line(500,i,500,i+10);
    }
}
function drawLine2 (){
    stroke("yellow");
    strokeWeight(4);
    for(var i=0;i<=600;i=i+20){
        line(100,i,100,i+10);
        

    }
}

function writePosition(x,y){
    database.ref('/player1/position').update({
        'x': position.x + x,
        'y': position.y + y
    })
}
function showError(){
    console.log("ERROR IN WRITING/Reading IN THE DATABASE");
}