/*******************/
/* Theme Changer */
/*******************/
const portfolio = document.querySelector(".portfolio");
const opening = document.querySelector(".star-wars-opening");

/*
opening.style.display = "none";
portfolio.style.display = "block";

document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url("assets/bg/xwing.png") no-repeat center center / cover fixed`;
typer();
*/

let userSkipTheme = false;

// Delay: 1000 = 1 second
// Terminate star wars theme opening and switch to main portfolio.  Invoke typer() function - See "Typer" code block below.
function themeSwitch() { // execute once
    portfolio.style.display = "block";
    opening.style.display = "none";
    document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url("assets/bg/xwing.png") no-repeat center center / cover fixed`;
    typer();
}

function themeSkipByUser() {
    document.addEventListener("click", () => {
        userSkipTheme = true;
        themeSwitch();
    });

    setTimeout(() => {
        if (!userSkipTheme) {
            themeSwitch();
        }
    }, 9500);
}

themeSkipByUser();

/*******************/
/* Typer */
/*******************/
// Realistic Typing Animation with blinking underscore "_"
const jobTitlePara = document.querySelector(".job-title");

const jobTitle = "Aspiring Frontend Developer";

const underscore = document.createElement("span");
underscore.textContent = "_";
underscore.style.color = "#5bee6cff";

jobTitlePara.textContent = "_";

let intervalCount = 0; // Declared and initialized to keep track of character index

// Typer implementation - Realistic User Typing with blinking "_"
// setInterval() just like a loop, executes code block per delay aka iternation.
function typer() {
    setInterval(() => {
        if (jobTitle.length !== intervalCount) { // Type each character until the last character
            // Utilized replace method to remove "_" and append right after typing the next character
            // It's instant it looks like "_" was not removed. Inserting substring at an index method isn't a thing.
            jobTitlePara.textContent = (jobTitlePara.textContent + jobTitle[intervalCount]).replace("_", "");
            jobTitlePara.append(underscore);
            intervalCount++;
        } else { // Implement blinking "_" - Increases delay for realistic blinking "_"
            if (jobTitlePara.textContent.includes("_")) {
                jobTitlePara.textContent = jobTitlePara.textContent.replace("_", "");
            } else {
                jobTitlePara.append(underscore);
            }
        }
    }, 200);
}