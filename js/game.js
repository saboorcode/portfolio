/*****************************************/
/*              Little Game              */
/*****************************************/

// Functions are hoisted.  Interpreter put declartions at top prior to execution/invoke.
game();

function game() {
    placeCharacterOnGameScreenRandomly();
    shootCharacter()

    function placeCharacterOnGameScreenRandomly() {
        // Create references
        const gameScreen = document.querySelector(".little-game");

        const characters = { // In case I want to retrieve specific character
            jabba: "/game-assets/characters/jabba.png",
            jarjar: "/game-assets/characters/jarjar.png",
            stormtrooper: "/game-assets/characters/stormtrooper.png"
            //yoda: "/assets/characters/yoda.png"
        }
        const charactersArr = Object.values(characters); // Converted to array so I can determine length and loop on.

        function generateRandomCharacter() {
            const randomCharacter = charactersArr[Math.floor(Math.random() * charactersArr.length)];

            return randomCharacter;
        }

        /* Add random character to game screen with modified positioning via CSS using DOM Scripting */
        // "yoda" parameter is undefined, generating/adding other characters instead until only one yoda is defined (The one that needs saving!!)
        function addCharacterOnGameScreen(yoda = undefined) {
            //console.log(yoda);
            // Create character reference
            const character = document.createElement("img");
            character.classList.add("character"); // specific styles

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
            addCharacterOnGameScreen();
        }

        addCharacterOnGameScreen("/game-assets/characters/yoda.png"); // Add baby yoda to game screen once
    }

    /**********************************************************************************************************************************************************************************/

    function shootCharacter() {
        // Create reference to game screen
        const gameScreen = document.querySelector(".little-game");
        //console.log(gameScreen)

        gameScreen.addEventListener("click", (event) => { // "event" is triggered by user's actions like clicking on character
            const yoda = document.querySelector(".yoda");
            const character = event.target; // event.target is just like a reference that we can apply DOM methods on

            if (character.classList.value.includes("character")) { // This prevent deleting actual game, this ensures element clicked on game screen has a class ".character" removing actual character from game instead.
                if (character.classList.value.includes("yoda")){ // Check if character element has ".yoda" distinct class, if selected character is baby yoda, then execute necessary logic.
                    end();
                } else {

                }
                
                character.remove();
            }
        })
    }
}

function end(){
    alert("Game Over!!!")
}