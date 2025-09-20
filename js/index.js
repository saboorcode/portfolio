/* STAR WARS ANIMATION OPENING */

/*******************/
/* Theme Changer   */
/*******************/
let userSkipTheme = false;

// User clicked on web page to skip the Star Wars animation. Invoke "location" path change. Go to portfolio.html
document.addEventListener("click", () => {
    if (!userSkipTheme) {
        userSkipTheme = true;
        location = './portfolio.html';
    }
});

// User is enjoying the Star Wars animation! invoke "location" path change after 9.5 seconds
setTimeout(() => {
    if (!userSkipTheme) {
        userSkipTheme = true;
        location = './portfolio.html';
    }
}, 9500);