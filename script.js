var runStart = 0;
// background music

// begin
var beginId = 0;
function begin(){
    if(playerNamePass==1){
        
        document.getElementById("gameStart").style.visibility = "hidden";
        beginId = 1;
    }else{
        alert("player name requared");
    }
}


function keyCheck(event){

    // enter key - run
    if(event.which == 13){
        if(beginId==1){
            if(runWorkerId==0){
                runWorkerId = setInterval(run, 100);
                   
                runSound.play();
                
                runStart=1;
                backgroundWorkerId = setInterval(moveBackground, 100);
                 createBlockId = setInterval(createBlock, 100);
                 moveBlockId = setInterval(moveBlocks, 100);
                 scoreWorkerId = setInterval(updateScore, 100);
    
                createEnemyId = setInterval(createEnemy, 100);
                moveEnemyId = setInterval(moveEnemy, 100);
    
                createBirdId = setInterval(createBird, 100);
                moveBirdId = setInterval(moveBird, 10);
    
                skyWorkerId = setInterval(moveSky, 150);

                createSkyEnemyId = setInterval(createSkyEnemy, 100);
                moveSkyEnemyId = setInterval(moveSkyEnemy, 100)
            }
        }
    }
    // space key - jump
    if(event.which == 32){
        if(runStart==1){
            if(jumpWorkerId==0){
                
                runSound.pause();
                jumpSound.play();
                
                clearInterval(runWorkerId);
                jumpWorkerId = setInterval(jump, 100);
            }
        }
        
    } 
}

// run function
var runSound = new Audio("./run.mp3");
runSound.loop = true;

var player = document.getElementById("player");
var runWorkerId = 0;
var runImageNumber = 1;
function run(){
    runImageNumber++;
    if(runImageNumber==10){
        runImageNumber=1;
    }
    player.src= "Run ("+runImageNumber+").png";
}

// jump function
var jumpSound = new Audio("./jump.mp3");

var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMarginTop = 665;

function jump(){
    jumpImageNumber++;
    if(jumpImageNumber <= 7){
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop+"px";
    }
    if(jumpImageNumber >= 8 ){
        playerMarginTop = playerMarginTop + 30;
        player.style.marginTop = playerMarginTop+"px";
    }
    if(jumpImageNumber == 13){
        jumpImageNumber = 1;

        clearInterval(jumpWorkerId);
        jumpWorkerId=0;

        runWorkerId = setInterval(run, 100);
        runSound.play();
    }
    player.src = "Jump ("+jumpImageNumber+").png";
}



// move background
var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;

function moveBackground(){
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX+"px";
}

// score
var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;


function updateScore(){
    newScore++;
    
    score.innerHTML = " scores "+markEnemyId;
    
}


 // create block
 var createBlockId = 0;
 var blockMarginLeft = 600;
 var blockId = 1;

 function createBlock(){
     var block = document.createElement("div");
     block.className = "block";
     block.id = "block" + blockId;
     blockId++;

     var gap = Math.random()*(1000-400)+400;
     blockMarginLeft = blockMarginLeft+gap;
     block.style.marginLeft = blockMarginLeft+"px";
    

     background.appendChild(block);
 }

 // move block
 var moveBlockId = 0;
 function moveBlocks(){
     for(var i = 1; i <= blockId; i++){
         var currentBlock = document.getElementById("block"+i);
         var currentMarginLeft = currentBlock.style.marginLeft;
         var newMarginLeft = parseInt(currentMarginLeft)-20;
         currentBlock.style.marginLeft = newMarginLeft+"px";

     }
 }




// create enemy
var createEnemyId = 0;
var enemyMarginLeft = 600;
var enemyId = 1;

function createEnemy(){
    var enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.id = "enemy"+enemyId;
    enemyId++;

    var gap = Math.random()*(1000-400)+400;
    enemyMarginLeft = enemyMarginLeft+gap;
    enemy.style.marginLeft = enemyMarginLeft+"px";

    background.appendChild(enemy);

}

//  move enemy
var moveEnemyId = 0;
var markEnemyId = 0;
function moveEnemy(){
    for(var i = 1; i <= enemyId; i++){
        var currentEnemy = document.getElementById("enemy"+i);
        var currentEnemyMarginLeft = currentEnemy.style.marginLeft;
        var newEnemyMarginLeft = parseInt(currentEnemyMarginLeft)-20;
        currentEnemy.style.marginLeft = newEnemyMarginLeft+"px";

        
        var mark = 0;
        if(newEnemyMarginLeft<=103){
            if(newEnemyMarginLeft>=3){
                if(playerMarginTop>=635){
                    if(playerMarginTop<=665){
                        runSound.pause();
                        jumpSound.pause();
                        deadSound.play();
                        clearInterval(runWorkerId);
                        clearInterval(jumpWorkerId);
                        jumpWorkerId= -1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(createBlockId);
                        clearInterval(moveBlockId);
                        clearInterval(createEnemyId);
                        clearInterval(moveEnemyId);
                        clearInterval(createBirdId);
                        clearInterval(moveBirdId);
                        clearInterval(skyWorkerId);
                        overWorkerId = setInterval(over, 100);
                    }
                }else{
                    markEnemyId++;
                }
            }
        }
    }
}

// create bird
var createBirdId = 0;
var birdMarginLeft = 100;
var birdId = 1;

function createBird(){
    var bird = document.createElement("div");
     bird.className = "bird";
     bird.id = "bird"+birdId;
     birdId++;

     var gap = Math.random()*(1000-400)+400;
     birdMarginLeft = birdMarginLeft+gap;
     bird.style.marginLeft = birdMarginLeft+"px";

     background.appendChild(bird);
 }
 // move bird
 var moveBirdId = 0;
 function moveBird(){
     for(var i = 0; i <= birdId; i++){
         var currentBird = document.getElementById("bird"+i);
         var currentBirdMarginLeft = currentBird.style.marginLeft;
         var newBirdMarginLeft = parseInt(currentBirdMarginLeft)-20;
         currentBird.style.marginLeft = newBirdMarginLeft+"px";
     }
 }


// move sky
var sky = document.getElementById("sky");
var skyX = 0;
var skyWorkerId = 0;

function moveSky(){
    skyX = skyX - 20;
    sky.style.backgroundPositionX = skyX+"px";
}


// over
var deadSound = new Audio("./dead.wav");

var overWorkerId = 0;
var deadImageNumber = 1;
function over(){
    deadImageNumber++;
    if(deadImageNumber==14){
        deadImageNumber=13;


        
        player.style.marginTop = "665px";
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = "Total:"+markEnemyId;
        document.getElementById("over-player-name").innerHTML = "player name :- "+word;
    
    }
    player.src = "sad("+deadImageNumber+").png";
}
function re(){
    location.reload();
}


function help(){
    alert(`
    First give your name and click on ok button and press start button.
    Then you will be sent into the game.
    Then press enter and the game will start.
    Try to avoid the cogwheels and move. 
    You can use the space key for that.
    Each passing cogwheel has five points. 
    You can stop the background music just by clicking on the sound icon. 
    
    enjoy
    `);

}

// mute func
var backgroundSound = document.getElementById("backgroundMusic");
var soundImg = document.getElementById("soundImg");

 soundImg.onclick = function(){
    
    if(backgroundSound.paused){
        backgroundSound.play();
        backgroundSound.loop = true;
        soundImg.src = "./mute.png";
    }else{
        backgroundSound.pause();
        soundImg.src = "volume.png";
    }
        

    }

backgroundSound.play();

// player name making

var inputField = document.getElementById("input-field");
var nameSubmitBtn = document.getElementById("nameSubmitBtn");
var displayName = document.getElementById("displayName");
var word;

var playerNamePass = 0;
nameSubmitBtn.addEventListener('click', () => {
    word = inputField.value;
    
    displayName.textContent = word;

    if (word === ''){
        alert("player name requared");
    }else{
        nameSubmitBtn.style.backgroundColor = "rgba(86, 86, 86, 1);";
        nameSubmitBtn.textContent = "✘";
        playerNamePass = 1;
    }

  });

// background mute - done

