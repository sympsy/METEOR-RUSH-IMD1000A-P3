const countdownLength = 3
const shipStaticImage = "./images/gameplay/ship_static.png"
const shipDynamicImage = "./images/gameplay/ship_dynamic.png"

let gameIsActive = false
let playerChar = null

let playerStepSize = 10 // Not making it constant incase I add a power up or something
let currentLeft = 0 // Making these global in case I want to print them later
let currentTop = 0

document.addEventListener("DOMContentLoaded", function () {
    console.log("startup");
    window.addEventListener('keydown', moveSelection)

    let gameWrapper = document.getElementById("gameWrapper")
    let gameplayWrapper = document.getElementById("gameplayWrapper")
    let leaderboardWrapper = document.getElementById("leaderboardWrapper")

    let titlePage = document.getElementById("titlePage")
    let startButton = document.getElementById("startButton")
    let instructionsButton = document.getElementById("instructionsButton")
    let settingsButton = document.getElementById("settingsButton")

    let instructionsPage = document.getElementById("instructionsPage")
    let settingsPage = document.getElementById("settingsPage")
    let okayButtons = document.getElementsByClassName("okayButton1")

    console.log("startup complete");

    for (let i = 0; i < okayButtons.length; i++) {
        okayButtons[i].onclick = function () {
            titlePage.style.display = "flex"
            settingsPage.style.display = "none"
            instructionsPage.style.display = "none"
        }
    }

    function hideAllPages() {
        titlePage.style.display = "none"
        settingsPage.style.display = "none"
        instructionsPage.style.display = "none"
    }

    startButton.onclick = function () {
        hideAllPages()
        gameplayWrapper.style.display = "flex"
        runGame()
    }

    instructionsButton.onclick = function () {
        hideAllPages()
        instructionsPage.style.display = "flex"
    }

    settingsButton.onclick = function () {
        hideAllPages()
        settingsPage.style.display = "flex"
    }
});

function runGame() {
    if (gameIsActive) {
        return
    }
    gameIsActive = true
    let countdown = document.getElementById("countdown")
    countdown.innerHTML = countdownLength
    console.log("starting loop")

    let delay = 0;

    for (let i = countdownLength; i > 0; i = i - 1) {
        console.log("oopng")
        console.log(i)
        setTimeout(() => {
            countdown.innerHTML = i
        }, delay);
        delay += 1000;
    }

    setTimeout(() => {
        countdown.innerHTML = "GO!"
    }, delay);
    delay += 1000
    setTimeout(() => {
        countdown.innerHTML = ""

        playerChar = document.getElementById("playerChar")
        playerChar.style.display = "block"

        meteor = document.getElementById("meteor")
        meteor.style.display = "block"
        //console.log(parseInt(window.getComputedStyle(playerChar).left))
        // .. getComputedStyle will return the computed style of left, which includes the value set by your CSS (50%), but translated into pixels based on the element's parent.
        // .. we need this because javascript can't read the stylesheet
    }, delay);

}

function arrowKeyPressed(side) {
    currentLeft = parseInt(window.getComputedStyle(playerChar).left || "0"); // we use the or operator "||" here to make it default to 0 if something goes wrong
    //currentRight = parseInt(playerChar.style.right || "0"); <-- I tried using this too but it doesn't work because the px is relative to whichever side.
    // .. meaning that if you set left to 50, it will be 50 away from the left. If you then also set right to 50, it will move 50 from the right side.
    // .. left and right are independent of eachother and are relative to their parent
    currentTop = parseInt(window.getComputedStyle(playerChar).top || "0");

    let gameplayWrapper = document.getElementById("gameplayWrapper")
    let gameBounds = gameplayWrapper.getBoundingClientRect()
    let playerBounds = playerChar.getBoundingClientRect()

    if (side == "left" && currentLeft - (playerBounds.width / 2) - playerStepSize >= 0) {

        playerChar.style.left = `${currentLeft - playerStepSize}px`; // You must use "` `" instead of regular string quotes when formatting unlike python 

    } else if (side == "right" && currentLeft + (playerBounds.width / 2) + playerStepSize <= gameBounds.width) {

        playerChar.style.left = `${currentLeft + playerStepSize}px`;

    } else if (side == "up" && currentTop - (playerBounds.height / 2) - playerStepSize >= 0) {

        playerChar.style.top = `${currentTop - playerStepSize}px`;

    } else if (side == "down" && currentTop + (playerBounds.height / 2) + playerStepSize <= gameBounds.height) {

        playerChar.style.top = `${currentTop + playerStepSize}px`;

    }

    //playerChar.src = shipStaticImage // need to go back after
}

function moveSelection(input) {
    if (gameIsActive && playerChar != null) {
        switch (input.keyCode) {
            case 37:
                console.log("left arrow")
                //playerChar.src = shipDynamicImage
                arrowKeyPressed("left")
                break
            case 39:
                console.log("right arrow")
                //playerChar.src = shipDynamicImage
                arrowKeyPressed("right")
                break
            case 38:
                console.log("up arrow")
                arrowKeyPressed("up")
                break
            case 40:
                console.log("down arrow")
                arrowKeyPressed("down")
                break
        }
    }
}