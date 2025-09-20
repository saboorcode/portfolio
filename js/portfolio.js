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

            /* 
                <div class="project-box">
                <div class="front-box">
                    <div class="project-img"><img src="/assets/projects/hdr.png"></div>
                    <p class="project-name">HD Requester</p>
                </div>

                <div class="back-box">
                    <p>Project Name</p>

                    <p>HTML, CSS, JS</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque vero magni molestias id velit
                        quibusdam esse eligendi itaque consectetur omnis, ut assumenda similique quasi accusamus,
                        temporibus
                        nostrum iusto facilis? Animi praesentium eaque repudiandae iure recusandae libero rem fugiat
                        porro
                        quidem. Aliquid a blanditiis autem ab suscipit corrupti quas, sunt consectetur.</p>

                    <p>
                        <a href="" target="_blank">Source Code</a>
                        <a href="" target="_blank">Website</a>
                    </p>
                </div>
            </div>
            */

            /* This was a lot but I did this as DOM API practices */
            // Creating references and use DOM API to create project boxes. Add the project boxes to HTML document.
            //console.log(entry)
            const projectBox = document.createElement("div");
            const projectFrontBox = document.createElement("div");
            const projectBackBox = document.createElement("div");
            const projectImgDiv = document.createElement("div");
            const projectImg = document.createElement("img");
            const projectName = document.createElement("p");

            const projectBackBoxProjectName = document.createElement("p");
            const projectBackBoxTechStack = document.createElement("p");
            const projectBackBoxProjectDesc = document.createElement("p");
            const projectBackBoxProjectLinks = document.createElement("p");

            const projectBoxLink = document.createElement("a");
            projectBoxLink.textContent = "Link";

            projectBoxLink.setAttribute("href", entry.links[0]); // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
            projectBoxLink.setAttribute("target", "_blank");
            projectImg.setAttribute("src", entry.image);

            projectBox.classList.add("project-box"); // .project-box class is defined in portfolio.css with specific style rules. Same as below.
            projectFrontBox.classList.add("front-box");
            projectBackBox.classList.add("back-box");
            projectImgDiv.classList.add("project-img");
            projectName.classList.add("project-name");

            projectName.textContent = entry.projectName;

            projectBackBoxProjectName.textContent = entry.projectName;
            projectBackBoxTechStack.textContent = entry.techStack;
            projectBackBoxProjectDesc.textContent = entry.projectDesc;

            // Tying it together. Appending children elements to its parent.
            projectBackBoxProjectLinks.append(projectBoxLink);
            projectImgDiv.append(projectImg);

            projectFrontBox.append(projectImgDiv, projectName);
            projectBackBox.append(projectBackBoxProjectName, projectBackBoxTechStack, projectBackBoxProjectDesc, projectBackBoxProjectLinks);

            projectBox.append(projectFrontBox, projectBackBox);

            projectContainer.append(projectBox);
    }

    function rotateProjectBoxAndDisplayProjDesc(){
        const projectBoxRef = document.querySelectorAll('.project-box');

        for (const projectBoxRefEle of projectBoxRef){
            //console.log(projectBoxRefEle)

            projectBoxRefEle.addEventListener("click", (event) => {// An event is triggered by user's click and this gives us a specific project box that user clicked on.
                const projectBoxClicked = event.currentTarget;
                const projectBoxRotatedBoolean = projectBoxClicked.classList.value.includes('rotated');

                if (!projectBoxRotatedBoolean){ // Check if project box has rotated - take actions by user's click
                    projectBoxClicked.classList.add('project-box-rotate', 'rotated');
                } else {
                    projectBoxClicked.classList.remove('project-box-rotate', 'rotated');
                }
            });
        }
    }

    //rotateProjectBoxAndDisplayProjDesc();
}