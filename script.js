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
// Terminate & Switch Star Wars opening to Main Portfolio.  Invoke typer() function - See "Typer" code block below.
function themeSwitch() { // execute once
    portfolio.style.display = "block";
    opening.style.display = "none";
    document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url("assets/bg/xwing.png") no-repeat center center / cover fixed`;
    typer();

    opening.remove(); // Deleting HTML code for Star Wars animation which makes it eligble for garbage collection and free up user's memory resources
    // HTML Code deletion is confirmed in source code
}

function themeSkipByUser() { // User can skip Star Wars Opening by clicking anywhere on web page
    // Notify User at the start of Star Wars animation that skip is an option.
    const skipOptionPara = document.createElement("p");
    skipOptionPara.textContent = "Click Anywhere To Skip";
    skipOptionPara.classList.add("skipOptionPara"); // added CSS class with specific style rules so I don't spam it here with DOM API..
    opening.prepend(skipOptionPara);

    // User clicked on web page to skip the Star Wars animation. Invoke themeSwitch()
    document.addEventListener("click", () => {
        if (!userSkipTheme) {
            userSkipTheme = true;
            themeSwitch();
        }
    });

    // User is enjoying the Star Wars animation! invoke themeSwitch() after 9.5 seconds
    setTimeout(() => {
        if (!userSkipTheme) {
            userSkipTheme = true;
            themeSwitch();
        }
    }, 9500);
}

themeSkipByUser();

/*******************/
/*     Typer       */
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
            // It's instant it looks like "_" was not removed. Inserting substring at an index method isn't a thing sadly.
            jobTitlePara.textContent = (jobTitlePara.textContent + jobTitle[intervalCount]).replace("_", "");
            jobTitlePara.append(underscore);
            intervalCount++;
        } else { // Blinking "_" every .2 seconds
            if (jobTitlePara.textContent.includes("_")) {
                jobTitlePara.textContent = jobTitlePara.textContent.replace("_", "");
            } else {
                jobTitlePara.append(underscore);
            }
        }
    }, 200);
}