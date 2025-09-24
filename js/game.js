/*****************************************/
/*              Little Game              */
/*****************************************/

// Functions are hoisted.  Interpreter put declartions at top prior to execution/invoke.
game();

function game() {
    generateGameScreen();
    spawnCharactersRandomly();
    shootCharacter();

    function generateGameScreen(){ // Necessary function for a game restart
        const gameScreenId = document.getElementById("little-game");

        // Remove Previous Game Screen along with old characters if necessary, for a game restart
        document.querySelector(".little-game") ? document.querySelector(".little-game").remove() : null;

        const gameScreen = document.createElement("div");
        gameScreen.classList.add("little-game");


        // <img src="/game-assets/gunsight.png" alt="" class="gunsight">

        const img = document.createElement("img");
        img.src = "/game-assets/gunsight.png";
        img.classList.add("gunsight");

        gameScreen.append(img);

        gameScreenId.append(gameScreen);
    }


    // Spawn Characters Randomly on Game Screen
    function spawnCharactersRandomly() {
        // Create references
        const gameScreen = document.querySelector(".little-game");

        // A collection of characters (image files from assets) I want to print on game screen randomly
        const characters = { // In case I want to retrieve specific character
            jabba: "/game-assets/characters/jabba.png",
            jarjar: "/game-assets/characters/jarjar.png",
            stormtrooper: "/game-assets/characters/stormtrooper.png"
            //yoda: "/assets/characters/yoda.png"
        }
        const charactersArr = Object.values(characters); // Converted to array so I can determine length and loop on.

        function generateRandomCharacter() {
            //const randomCharacter = charactersArr[Math.floor(Math.random() * charactersArr.length)];

            return charactersArr[Math.floor(Math.random() * charactersArr.length)]; // I rid of constant above for garbage collection
        }

        /* Add random character to game screen with modified positioning via CSS using DOM Scripting */
        // "yoda" parameter is undefined, generating/adding other characters instead until only one yoda is defined (The one that needs saving!!)
        function spawnCharacterOnGameScreen(yoda = undefined) {
            //console.log(yoda);
            // Create character reference
            const character = document.createElement("img");
            character.classList.add("character"); // specific character styles

            character.src = yoda ? yoda : generateRandomCharacter(); // Ternary operator to define character either random "creature" or yoda.  Yoda is added to the game once

            // Control character position
            // Top Range: 0%-70%
            // Left Range: 0%-90%
            const generateTopPos = Math.floor(Math.random() * 70).toString() + "%"; // Number.toString() - MDN Docs
            const generateLeftPos = Math.floor(Math.random() * 90).toString() + "%";

            character.style.top = generateTopPos;
            character.style.left = generateLeftPos;

            if (yoda) { // Additional styles for baby yoda to be more noticeable to gamer and positions yoda behind enemies
                character.classList.add("yoda");
            }

            gameScreen.append(character)
        }

        /* Invoke function, adds character to game screen one at a time. We can determine how many characters can be added to the game screen */
        for (let i = 0; i < 9; i++) {
            spawnCharacterOnGameScreen();
        }

        spawnCharacterOnGameScreen("/game-assets/characters/yoda.png"); // Add baby yoda to game screen once
    }

    /**********************************************************************************************************************************************************************************/

    // Depending on which character are shot, execute logic.  If Baby Yoda (hostage) are shot by mistake, end game.
    function shootCharacter() {
        // Create reference to game screen
        const gameScreen = document.querySelector(".little-game");
        //console.log(gameScreen)

        // Remove character that's clicked on game screen
        gameScreen.addEventListener("click", (event) => { // "event" is triggered by user's actions like clicking on character
            document.querySelector(".gunsight") ? document.querySelector(".gunsight").remove() : ""; // Remove gunsight idle animation when user starts playing

            const yoda = document.querySelector(".yoda");
            const character = event.target; // event.target is just like a reference that we can apply DOM methods on

            if (character.classList.value.includes("character")) { // This prevent deleting actual game, this ensures element clicked on game screen has a class ".character" removing actual character from game instead.
                if (character.classList.value.includes("yoda")){ // Check if character clicked has ".yoda" distinct class, if selected character is baby yoda, then execute necessary logic.
                    end(false);
                } else {
                    console.log(character.classList)
                }
                
                //character.src = "/game-assets/explode.gif";
                character.classList.add("removed"); // Add class with custom animation for when character is defeated

                setTimeout(() => { // Wait for animation to finish, remove character from game screen
                  character.remove();  
                }, 500);
            }
        })
    }

    // Character narrative
    function characterNarrative(){
        const narrative = {
            you: ["Baby Yoda!!! NOOOOOOOO!!!!!!", "I'll save you! Baby Yoda!", "Of course! Let's get the hell outta here!"],
            babyYoda: ["Oh, finally you're here. (whispering) You've gotta get me outta here. (whispering)", "You're going to save me, right?", "Oh I can't belive it's over. Thanks."],
            enemies: ["grumbles", "yells"]
        }
    }


}

function end(win = false){ // Adds parameter? - determine win or loss
    //console.log(gameStatus)

    /* 
    if (!win){
        alert("Baby Yoda!!! NOOOOOOOO!!!!!!");
    } else {
        alert("Congratulations! Replay?")
    }
    */


    game(); // restart game
}