/*** INITIALIZE GAME ***/

// Array of possible colors
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];

// To start game
var level = 0;
var gameStarted = false;

/*** START THE GAME WITH KEYBOARD ***/
$(document).on("keydown", function(){
 
    if(gameStarted === false){   
        $("#level-title").text("Level: " + level);
        nextSequence();
        gameStarted = true;
    }
});
// Get the next color in the sequence
function nextSequence() {

    // Start by resetting user's selections
    userClickedPattern = [];

    var num = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[num];
    gamePattern.push(randomColor);

    level++;
    $("#level-title").text("Level: " + level);

    // Fade in/out the color & play sound
    $("#" + randomColor).fadeOut(100).fadeIn(100);
    makeSound(randomColor);
    
}

function makeSound(colorIn){
    var audio = new Audio("sounds/" + colorIn + ".mp3");
    audio.play();
}

function animateTile(colorIn){
    $("#"+colorIn).addClass("pressed");
    setTimeout(() => {
        $("#"+colorIn).removeClass("pressed");
    }
    ,100);
}

// GET button user pressed & CHECK ANSWER
$(".btn").on("click", function() {

    if(gameStarted === false){
        return;
    }

    console.log(colorPressed);
    var colorPressed = $(this).attr("id");
    // ADD SELECTION TO ARRAY
    userClickedPattern.push(colorPressed);

    // Sound functions & animation
    makeSound(colorPressed);
    animateTile(colorPressed);

    // CHECK ANSWER HERE AFTER THEY CLICK
    // Since nextSequence reset array, checking starts at 0
    checkAnswer(userClickedPattern.length - 1);


})

function checkAnswer(currentLevel){
    
    // Check color pick if correct (checks latest pick)
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Correct answer");
        // Check if they've gone through all selections
        if(userClickedPattern.length === gamePattern.length){
            // Then call nextSequence() for next color after short delay
            setTimeout(function() {
                nextSequence();    
            }, 1000);
        }
    }else {
        console.log("Incorrect answer!!!");
        gameOver();
    }
}

function gameOver() {
    $("#level-title").html("GAME OVER! <br>Press any key to restart");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;

    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 500);
}