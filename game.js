
var buttonColours = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started = false;

//Start the game
$(document).on("keypress",function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
})

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
   
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").on("click",function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        var wrongAnswer = new Audio("./wrong.mp3");
        wrongAnswer.play();
        startOver();
    }
}
// restart 
function startOver(){
    level = 0;
    gamePattern=[];
    started = false;
}
 // to play sound
function playSound(name){
    var name = new Audio("./"+name+".mp3");
    name.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}