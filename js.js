const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var gameTime=0;//Переменная для отслеживания длины игры
//Player
var player={x:160,y:340,height:80,width:50,xSpeed:0,ySpeed:2};
var platform={x:0,y:canvas.height-50,width:canvas.width,height:50};
function Block(x,y,width,height,xSpeed){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.xSpeed=xSpeed;

}
function drawBlock(block){
    en=new Image();
    en.src="cactus-green.png";
    context.drawImage(en,block.x,block.y,block.width,block.height);
    
}
//enemy
var enemy=new Block(canvas.width,canvas.height-150,50,100,-2);

//create platform
function Platform(x,y,width,height,xSpeed){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.xSpeed=xSpeed;
}
function drawPlatform(block){
    img=new Image();
    img.src="platformaaa.png";
    context.drawImage(img,block.x,block.y,block.width,block.height);
    
}
var platform1=new Platform(0,canvas.height-50,canvas.width,50,-3);
var platform2=new Platform(canvas.width,canvas.height-50,canvas.width,50,-3);
function draw(){
    //Очиста предыдущих движений
    context.clearRect(0,0,canvas.width,canvas.height);
    
    //draw enemy
    drawBlock(enemy);
    //отоброжение персонажа
    pic=new Image();
    pic.src="1711703113090_Man_walking.png";
    context.drawImage(pic,player.x,player.y,player.width,player.height);

    //platform
    cpi=new Image();
    cpi.src="1712310418344_20.png";
    context.drawImage(cpi,platform.x,platform.y,platform.width,platform.height);
    drawPlatform(platform1);
    drawPlatform(platform2);

    //Отрисовка времени игры
    context.font="20px Arial";
    context.fillStyle="white";
    context.fillText("Пройдено:"+gameTime,10,30)
}
function updateGame(){
    
    //Алгоритм движения персонажа
    player.x+=player.xSpeed;
    player.y+=player.ySpeed;
    //Персонаж не падает за платформой
    if (player.y>=canvas.height-player.height-50){
        player.ySpeed=0;
        player.xSpeed=0;
    }
    //move enemy
    enemy.x+=enemy.xSpeed;

    //tp enemy
    if(enemy.x<0-enemy.width){
        enemy.x=canvas.width;
        //new data enemy
        enemy.width=Math.floor(Math.random()*100)+50;
        enemy.height=Math.floor(Math.random()*200)+50;
        enemy.y=canvas.height-50-enemy.height;
        enemy.xSpeed=(Math.floor(Math.random()*5)+3)* -1;
    }
    //движение платформ
    platform1.x+=platform1.xSpeed;
    platform2.x+=platform2.xSpeed;

    //tp platform
    if(platform1.x<0-platform1.width){
        platform1.x=platform2.width;
    }
    if(platform2.x<0-platform2.width){
        platform2.x=platform1.width;
    }

    gameTime++;//Увеличение времени игры при каждом обновление игры
}
function checkCollision(){
    if (player.x+player.width>enemy.x 
        && player.x<enemy.x+enemy.width 
        && player.y+player.height>enemy.y &&
        player.y<enemy.y+enemy.height){
        //Запуск модели
        model.style.display="block";
        document.getElementById("message").innerHTML="Проигрыш <br/> Пройдено"+gameTime+"пути";
        game.stop();
        
    }
}
var model=document.getElementById("myModel");
//Создадим функцию которая будет выводить модальное окно пока не закроем его
window.onclick=function(event){
    if(event.target==model){
        model.style.display="none";
        location.reload();
    }
}

function onKeypress(event){
    const key=event.key.toLowerCase();
        if (key==="a"){player.xSpeed= -5;}
        if (key==="d"){player.xSpeed= 5;}
        if (key===" "){player.ySpeed= -8;}
}
window.addEventListener('keydown',onKeypress);
function onKeyRelease(event){
    const key=event.key.toLowerCase();
        if (key==="a" || key==="d"){player.xSpeed= 0;}
        if (key===" "){player.ySpeed= 5;}
}
window.addEventListener('keyup',onKeyRelease);



function tick(){
    checkCollision();
    updateGame();
    draw();
    game=window.setTimeout("tick()",1000/60);
}
tick();