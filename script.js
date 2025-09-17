/*******************/
/* Theme Changer */
/*******************/
const portfolio = document.querySelector(".portfolio");
const opening = document.querySelector(".star-wars-opening");

//opening.style.display = "none";
portfolio.style.display = "none";

// Delay: 1000 = 1 second
// Terminate opening and switch to main portfolio.  Call Typer() function - See "Job Title Typer" code block below.
setTimeout(()=> {
    portfolio.style.display = "block";
    opening.style.display = "none";
    document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url("assets/bg/xwing.png") no-repeat center center / cover fixed`;
    typer();
}, 9500);


/*******************/
/* Job Title Typer */
/*******************/
// Realistic User Typing with blinking "_"
const jobTitlePara = document.querySelector(".job-title");

const jobTitle = "Aspiring Web Developer";

const lastChar = document.createElement("span");
lastChar.textContent = "_";
lastChar.style.color = "#EEDE46";

jobTitlePara.textContent = "_";

let intervalCount = 0; // Declared and initialized to keep track of character index

// Typer implementation - Realistic User Typing with blinking "_"
// setInterval() just like a loop, executes code block per delay aka iternation.
function typer(){
setInterval(() => {
    if (jobTitle.length !== intervalCount) { // Type each character until the last character
        // Utilized replace method to remove "_" and append right after typing the next character
        // It's instant it looks like "_" was not removed. Inserting substring at an index method isn't a thing.
        jobTitlePara.textContent = (jobTitlePara.textContent + jobTitle[intervalCount]).replace("_", "");
        jobTitlePara.append(lastChar);
        intervalCount++;
    } else { // Implement blinking "_" - Increases delay for realistic blinking "_"
        if (jobTitlePara.textContent.includes("_")){
            jobTitlePara.textContent = jobTitlePara.textContent.replace("_", "");
        } else {
            jobTitlePara.append(lastChar);
        }
    }
}, 200);
}