/* PORTFOLIO.js */

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

let intervalCount = 0; // Declared and initialized to keep track of character index. Iterator

// Typer implementation - Realistic User Typing with blinking "_"
// setInterval() is like a loop, executes code block per delay aka iternation.
function typer() {
    setInterval(() => {
        if (jobTitle.length !== intervalCount) { // Type each character
            jobTitlePara.textContent = (jobTitlePara.textContent + jobTitle[intervalCount]).replace("_", "");
            jobTitlePara.append(underscore);
            intervalCount++;
        } else { // Blinks underscore "_" every .2 seconds after all characters are typed out.
            if (jobTitlePara.textContent.includes("_")) {
                jobTitlePara.textContent = jobTitlePara.textContent.replace("_", "");
            } else {
                jobTitlePara.append(underscore);
            }
        }
    }, 200);
}

typer();