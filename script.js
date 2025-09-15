/*******************/
/* Job Title Typer */
/*******************/
const jobTitlePara = document.querySelector(".job-title");

const jobTitle = "spiring Frontend Developer";
jobTitlePara.textContent = "A";

const lastChar = document.createElement("span");
lastChar.textContent = "_";
lastChar.style.color = "rgb(0, 250, 21)";

let intervalCount = 0;

let intervalID = setInterval(() => { // This is just like a loop, executes code block per delay.
    if (jobTitle.length !== intervalCount) {
        jobTitlePara.textContent += jobTitle[intervalCount];
        intervalCount++;
    } else {
        // call this function to type last character with slower interval delay. Clears current interval.
        lastCharTyper();
        clearInterval(intervalID);
        intervalID = null;
    }
}, 150);

function lastCharTyper() {
    setInterval(() => {
        // Alternate by typing and deleting last character "_" - acts like an animation
        if (jobTitlePara.textContent.includes("_")) {
            jobTitlePara.textContent = jobTitlePara.textContent.replace("_", "");
        } else {
            jobTitlePara.append(lastChar);
        }
    }, 500);
}