/*****************************************/
/*              Little Game              */
/*****************************************/

// Functions are hoisted.  Interpreter put declartions at top prior to execution/invoke. MDN Source
let narrativeInProgress = false; // Pause type of variable - This prevents from player from skipping narrative stories in progress and ending game too early.
const narrativeInProg = document.createElement("p");
narrativeInProg.classList.add("narrative-progress");
narrativeInProg.textContent = "narratives in progress";
narrativeInProg.style.display = "none";

game(); // Start game

function game() {
    generateGameScreen();
    spawnCharactersRandomly();
    shootCharacterAndNarrative()

    function generateGameScreen() { // Necessary function for a game restart
        const gameScreenId = document.getElementById("little-game");
        const narrativePara = document.createElement("p");
        narrativePara.classList.add("narrative-p"); // Added class to style in CSS later

        // Remove Previous Game Screen along with old characters if necessary, for a game restart
        document.querySelector(".little-game") ? document.querySelector(".little-game").remove() : null;

        const gameScreen = document.createElement("div");
        gameScreen.classList.add("little-game");

        const img = document.createElement("img");
        img.src = "/game-assets/gunsight.png";
        img.classList.add("gunsight");

        gameScreen.append(img);
        gameScreen.append(narrativePara);
        gameScreen.append(narrativeInProg);

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

        // Returns generated and random character with its image asset
        function generateRandomCharacter() {
            //const randomCharacter = charactersArr[Math.floor(Math.random() * charactersArr.length)];

            return charactersArr[Math.floor(Math.random() * charactersArr.length)]; // I rid of constant above for garbage collection
        }

        /* Add random character to game screen with modified positioning via CSS using DOM Scripting */
        // "yoda" parameter is undefined, generating/adding other characters instead until only one yoda is defined (The one that needs saving!!)
        function spawnCharacterOnGameScreen(yoda = undefined) { // "yoda" as fallback variable, random characters will be generated if it's undefined and yoda is spawned once if defined with baby yoda image asset
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

            gameScreen.append(character) // Adds (spawns) character to Game Screen
        }

        /* Invoke function multiple times (there's probably better way to do this), adds character to game screen one at a time. We can determine how many characters can be added to the game screen */
        for (let i = 0; i < 9; i++) {
            spawnCharacterOnGameScreen();
        }

        spawnCharacterOnGameScreen("/game-assets/characters/yoda.png"); // Add baby yoda to game screen once
    }

    /**********************************************************************************************************************************************************************************/

    // Shoot Character & Narrative
    // Depending which character are shot, execute necessary logic.  Example, Baby Yoda (hostage) are shot by mistake, end game.
    function shootCharacterAndNarrative() {
        const narrative = { // A collection of narrative quotes as hostage or player I found online - CSGO Forum
            you: ["Baby Yoda!!! NOOOOOOOO!!!!!!", "I'll save you, Baby Yoda!", "Of course! Let's get the hell outta here!"],
            babyYoda: ["Oh, finally you're here. You've gotta get me outta here. (whispering)", "You're going to save me, right?", "Oh I can't believe it's over! Thank you!!"],
            captors: ["GRUMBLES", "YELLS"]
        }

        const narrativeP = document.querySelector(".narrative-p"); // .narrative-p element (no content) is generated and appended to document in generateGameScreen() eariler
        //narrativeP.textContent = "You: " + narrative.you[0];
        narrativeP.style.display = "none";

        const gameScreen = document.querySelector(".little-game");
        let clickTotal = 0;

        // Execute logic per click. Removing characters from Game Screen, Narrative stories, Restarting Game, etc.
        // I defined narrativeInProgress as global variable - this prevents from player from skipping narrative stories in progress and ending game too early.
        gameScreen.addEventListener("click", (event) => { // "event" is triggered by user's actions like clicking on character
            if (!narrativeInProgress) {
                const character = event.target; // event.target is just like a reference that we can apply DOM methods on

                if (character.classList.value.includes("character")) { // This prevent deleting actual game, this ensures element clicked on game screen has a class ".character" removing actual character from game instead.

                    clickTotal += 1; // I keep a count of user clicks so I know when to narrative stories to player. "Oh, finally you're here" at count 1 for example

                    //console.log(clickTotal);

                    narrativeP.style.display = "block"; // Display Narrative Block
                    document.querySelector(".gunsight") ? document.querySelector(".gunsight").remove() : "";

                    /************ Baby Yoda was shot by mistake - End game *************************/
                    if (character.classList.value.includes("yoda")) { // Check if character clicked has ".yoda" distinct class, if selected character is baby yoda, then execute necessary logic.
                        narrativeInProgress = true;
                        narrativeInProg.style.display = "block";

                        narrativeP.innerHTML = "Baby Yoda: " + "y-- you wer supposed to sav.. me" + "<br>" + "You: " + narrative.you[0];

                        setTimeout(() => {
                            narrativeInProgress = false;
                            narrativeInProg.style.display = "none";

                            end();
                        }, 3500);
                        /*************** Remove Characters that was shot by player, Narrative stories, Restart Game if necessary ****/
                    } else {
                        //character.src = "/game-assets/explode.gif";
                        character.classList.add("removed"); // Apply "remove" animation to character shot by player

                        setTimeout(() => { // Wait for animation to finish, remove character from game screen
                            character.remove();
                        }, 500);

                        //console.log(character.classList)
                        // Custom Narrative by Click Count. Baby Yoda: "Oh you are here!" at the start of game for example
                        if (clickTotal === 1) {
                            narrativeInProgress = true;
                            narrativeInProg.style.display = "block";

                            // First narration
                            narrativeP.innerHTML = "Baby Yoda: " + narrative.babyYoda[0] + "<br>" + "I'm being held hostage.";

                            setTimeout(() => {
                                narrativeP.textContent = "Baby Yoda: " + narrative.babyYoda[1];


                                setTimeout(() => {
                                    narrativeP.innerHTML = "You: " + narrative.you[1] + "<br>" + "Captors: " + narrative.captors[0];

                                    narrativeInProgress = false;
                                    narrativeInProg.style.display = "none";
                                }, 3000);
                            }, 3000);
                        } else if (clickTotal === 5) {
                            narrativeInProgress = true;
                            narrativeInProg.style.display = "block";

                            narrativeP.textContent = "Captors: " + narrative.captors[1];

                            narrativeInProgress = false;
                            narrativeInProg.style.display = "none";
                        } else if (clickTotal === 9) {
                            narrativeInProgress = true;
                            narrativeInProg.style.display = "block";

                            narrativeP.innerHTML = "Baby Yoda: " + narrative.babyYoda[2] + "<br>" + "You: " + narrative.you[2];

                            setTimeout(() => {
                                setTimeout(() => {
                                    narrativeInProgress = false;
                                    narrativeInProg.style.display = "none";
                                    end();
                                }, 3000)
                            }, 1000);

                        }
                    }

                }
            } else {
                ///
            }
        })
    }
}

function end() {
    game(); // restart game
}