/* PORTFOLIO */

// Functions are hoisted, I'm invoking them here so I know where the invoker are.
// The interpreter appears to move the declaration to top of scope prior to code execution.
// https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
typer();
generateProjectSection();

/*******************/
/*     TYPER       */
/*******************/
function typer() {
    // Realistic Typing Animation with blinking underscore "_"
    const jobTitlePara = document.querySelector(".job-title");
    jobTitlePara.textContent = "_";
    const jobTitle = "Aspiring Frontend Web Developer";

    const underscore = document.createElement("span");
    underscore.textContent = "_";
    underscore.style.color = "#5bee6cff";


    // Typer implementation - Realistic User Typing with blinking "_"
    // setInterval() is like a loop, executes code block per delay aka iternation.
    let intervalCount = 0; // Keep track of character index. Iterator


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

/*******************/
/* PROJECT SECTION */
/*******************/
async function generateProjectSection() { // Defined async function to resolve a promise as value (project data). We need to retrieve project data before we even generate anything.
    // Access local json file "saboor_data.json" with Fetch API
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

    // All async functions return a promise - always!!
    async function getJSON() {
        const jsonFile = "/assets/json/saboor_data.json";

        try {
            const response = await fetch(jsonFile);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const jsonData = await response.json();
            
            //console.log(jsonData);
            return jsonData;
        } catch (error) {
            console.error(error.message);
        }
    }

    const projectData = await getJSON(); // Retrieve project data from "saboor_data.json" file then generate project section below this line.

    const projectContainer = document.getElementById("project");

    // Iterates through project entries and render them to HTML document.
    for (const entry of projectData.projects){
            //console.log(entry);

            /* This was a lot but I did this as DOM API practices */
            // Creating references and use DOM API to create project cards. Add the project cards to HTML document.
            //console.log(entry)
            const projectCard = document.createElement("div");
            const projectFrontCard = document.createElement("div");
            const projectBackCard = document.createElement("div");
            const projectImgDiv = document.createElement("div");
            const projectImg = document.createElement("img");
            const projectName = document.createElement("p");

            const projectBackCardProjectName = document.createElement("p");
            const projectBackCardTechStack = document.createElement("p");
            const projectBackCardProjectDesc = document.createElement("p");
            const projectBackCardProjectLinks = document.createElement("p");

            const projectCardLink = document.createElement("a");
            projectCardLink.textContent = "Link";

            projectCardLink.setAttribute("href", entry.links[0]); // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
            projectCardLink.setAttribute("target", "_blank");
            projectImg.setAttribute("src", entry.image);

            projectCard.classList.add("project-card"); // .project-card class is defined in portfolio.css with specific style rules. Same as below.
            projectFrontCard.classList.add("front-card");
            projectBackCard.classList.add("back-card");
            projectImgDiv.classList.add("project-img");
            projectName.classList.add("project-name");

            projectName.textContent = entry.projectName;

            projectBackCardProjectName.textContent = entry.projectName;
            projectBackCardTechStack.textContent = entry.techStack;
            projectBackCardProjectDesc.textContent = entry.projectDesc;

            // Tying it together. Appending children elements to its parent.
            projectBackCardProjectLinks.append(projectCardLink);
            projectImgDiv.append(projectImg);

            projectFrontCard.append(projectImgDiv, projectName);
            projectBackCard.append(projectBackCardProjectName, projectBackCardTechStack, projectBackCardProjectDesc, projectBackCardProjectLinks);

            projectCard.append(projectFrontCard, projectBackCard);

            projectContainer.append(projectCard);
    }

    function flipProjectCard(){ /* This can be done using pure CSS and hover psuedo class, however I elected to use user's click event function for better interaction */
        const projectCards = document.querySelectorAll('.project-card');

        for (const projectCardsRef of projectCards){
            projectCardsRef.addEventListener("click", (event) => {// An event is triggered by user's click and this gives us a specific project card that user clicked on.
                const projectCard = event.currentTarget;
                let projectCardFlipped = projectCard.classList.value.includes("flipped") ? true : false;
                
                if (!projectCardFlipped){
                    projectCard.classList.add('project-card-flip', 'flipped');

                    projectCard.querySelector('.front-card').classList.add('project-front-card-hide');
                    projectCard.querySelector('.back-card').classList.add('project-back-card-show');
                } else {
                    projectCard.classList.remove('project-card-flip', 'flipped');

                    projectCard.querySelector('.front-card').classList.remove('project-front-card-hide');
                    projectCard.querySelector('.back-card').classList.remove('project-back-card-show');
                }
            });
        }
    }

    flipProjectCard();
}