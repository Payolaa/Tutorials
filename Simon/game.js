
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// Juego inicia en 0
var started = false;
var level = 0;

// Checa si tecla ha sido presionada y empieza juego
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true; 
  }
});

// Detecta clics en botones
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); 
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour); 
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Verificar respuesta
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over"); 
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); // Reinicia el juego
  }
}

// Borron y cuenta nueva
function nextSequence() {
  userClickedPattern = []; 
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); // Genera número aleatorio
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

 
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour); 
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Pone los sonidos 
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Borron y cuenta nueva del juego
function startOver() {
  level = 0; // Empieza el juego del nivel 0
  gamePattern = []; 
  started = false;
}