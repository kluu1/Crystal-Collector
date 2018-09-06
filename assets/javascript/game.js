$( document ).ready(function() {

    // create var and DOM references
    var randomNumber = $('#randomNumber');
    var wins = $('#wins');
    var winsCt = 0;
    var losses = $('#losses');
    var lossesCt = 0;
    var totalScore = $('#totalScore');
    var numberOfCrystals = 4;
    var scoreCounter = 0;

    // generate random number to win and display
    var numberToWin = generateNewNumber();
    randomNumber.text(numberToWin);

    // function to generate crystals
    function generateCrystals() {
        // create crystal images with class/attr and add to the page
        for (i = 0; i < numberOfCrystals; i++) {
            // generate random number between 19-120
            var crystalValue = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
            // create crystal var and add class/attr and add to page
            var imageCrystal = $("<img>");
            imageCrystal.addClass("crystal-image img-thumbnail");
            imageCrystal.attr("src", "assets/images/amethyst.png");
            imageCrystal.attr("data-crystalvalue", crystalValue);
            $("#crystals").append(imageCrystal);
        }
    }

    // function to reset the game
    function resetGame() {
        // reset total score
        scoreCounter = 0;
        totalScore.text(scoreCounter);
        // generate a new number to win
        newNumberToWin = generateNewNumber();
        randomNumber.text(newNumberToWin);
        numberToWin = newNumberToWin;
        $('#crystals').empty();
    }

    // function to generate new number
    function generateNewNumber() {
        number = Math.floor(Math.random() * (120 - 19 + 1)) + 19;
        return number;
    }

    // function to start the game
    function startGame() {
        //generate crystals
        generateCrystals();
        // setup event listner for all crystals
        $(".crystal-image").on("click", function() {
            // creat var to hold the crystals value and parse as integer
            var crystalValue = ($(this).attr("data-crystalvalue"));
            crystalValue = parseInt(crystalValue);
            // update score and display
            scoreCounter += crystalValue;
            totalScore.text(scoreCounter);
            // win and lose logic
            if (scoreCounter === numberToWin) {
                $('#win-status').text('YOU WIN!');
                winsCt++;
                wins.text(winsCt);
                resetGame();
                startGame();
            } else if (scoreCounter > numberToWin) {
                $('#win-status').text('YOU LOSE!');
                lossesCt++;
                losses.text(lossesCt);
                resetGame();
                startGame();
            }   
        });
    }

    // start the game!
    startGame();

});

