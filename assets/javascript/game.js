$( document ).ready(function() {
    // create var and DOM references
    var crystals = ['assets/images/red.png','assets/images/blue.png','assets/images/yellow.png','assets/images/green.png'];
    var clickSound = document.getElementById("clickSound");
    var jingleSound = document.getElementById("jingleSound");
    var randomNumber = $('#randomNumber');
    var wins = $('#wins');
    var winsCt = 0;
    var losses = $('#losses');
    var lossesCt = 0;
    var totalScore = $('#totalScore');
    var numberOfCrystals = 4;
    var scoreCounter = 0;
    var numberToWin = 0;;
    // create game object 
    var game = {
        // function to generate new crystals
        generateCrystals: function() {
            for (i = 0; i < numberOfCrystals; i++) {
                // generate random number between 1 and 12 then assign to crystalValue
                var crystalValue = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
                // create crystal var and add class/attr then add to page
                var imageCrystal = $("<img>");
                imageCrystal.addClass("crystal-image");
                imageCrystal.attr("src", crystals[i]);
                imageCrystal.attr("data-crystalvalue", crystalValue);
                $("#crystals").append(imageCrystal);
            }
        },
        // function to generate new number between 19 and 120
        generateNewNumber: function() {
            number = Math.floor(Math.random() * (120 - 19 + 1)) + 19;
            return number;
        },
        // function to reset the game
        resetGame: function() {
            // reset total score
            scoreCounter = 0;
            totalScore.text(scoreCounter);
            // generate a new number to win
            newNumberToWin = game.generateNewNumber();
            randomNumber.text(newNumberToWin);
            numberToWin = newNumberToWin;
            $('#crystals').empty();
        },
         // function to play sound
         sound: function(soundFile) {
            soundFile.loop = false;
            soundFile.play();
        },
        // function to start the game
        startGame: function() {
            numberToWin = game.generateNewNumber();
            randomNumber.text(numberToWin);
            game.generateCrystals();
            // setup event listner for all crystals
            $(".crystal-image").on("click", function() {
                // play click sound when clicked
                game.sound(clickSound);
                // create var to hold the crystals value and parse as integer
                var crystalValue = ($(this).attr("data-crystalvalue"));
                crystalValue = parseInt(crystalValue);
                // update score and display
                scoreCounter += crystalValue;
                totalScore.text(scoreCounter);
                // win and lose logic
                if (scoreCounter === numberToWin) {
                    game.sound(jingleSound);
                    $('#win-status').text('YOU WIN!');
                    winsCt++;
                    wins.text(winsCt);
                    game.resetGame();
                    game.startGame();
                } else if (scoreCounter > numberToWin) {
                    game.sound(jingleSound);
                    $('#win-status').text('YOU LOSE!');
                    lossesCt++;
                    losses.text(lossesCt);
                    game.resetGame();
                    game.startGame();
                }   
            });
        }
    }
    game.startGame();
});

