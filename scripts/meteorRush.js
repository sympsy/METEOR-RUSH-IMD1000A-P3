const countdownLength = 0
const waveDuration = 15000 // 30 seconds
const waveIntervalMin = 500 // Meteor spawn rate
const waveIntervalMax = 2000
let waveStepSpeed = 1
const waveDifficultyMultiplier = 0.5

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
    if (gameIsActive) return;

    let countdown = document.getElementById("countdown")
    countdown.innerHTML = countdownLength
    console.log("starting loop")

    let delay = 0

    for (let i = countdownLength; i > 0; i = i - 1) {
        console.log("oopng")
        console.log(i)
        setTimeout(() => {
            countdown.innerHTML = i
        }, delay)
        delay += 1000
    }

    setTimeout(() => {
        countdown.innerHTML = "GO!"
    }, delay)
    delay += 1000
    setTimeout(() => {
        countdown.innerHTML = ""

        playerChar = document.getElementById("playerChar")
        playerChar.style.display = "block"

        gameIsActive = true
        startWaves()
        //console.log(parseInt(window.getComputedStyle(playerChar).left))
        // .. getComputedStyle will return the computed style of left, which includes the CSS set percentage (50%), but converted into pixels based on the element's parent.
        // .. we need this because javascript can't read the stylesheet
    }, delay);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function isTouching(object1, object2) {
    let object1Bounds = object1.getBoundingClientRect()
    let object2Bounds = object2.getBoundingClientRect()

    let object1Left = parseInt(window.getComputedStyle(object1).left)
    let object1Top = parseInt(window.getComputedStyle(object1).top)
    let object2Left = parseInt(window.getComputedStyle(object2).left)
    let object2Top = parseInt(window.getComputedStyle(object2).top)

    if (
        ((object1Left < object2Left) && (object1Left > object2Left - object1Bounds.width)) && ((object1Top < object2Top) && (object1Top > object2Top - object1Bounds.height))
    ) {
        //console.log("touching you boy")
        return true
    } else {
        return false
    }
}

function startWaves() {
    if (gameIsActive) {

        function spawnMeteor() {
            if (!gameIsActive) return

            let gameplayWrapper = document.getElementById("gameplayWrapper")
            let newMeteor = document.createElement("img");
            newMeteor.src = "./images/gameplay/meteor.png"
            newMeteor.id = "meteor";

            newMeteor.style.display = "block";
            newMeteor.style.position = "absolute";
            newMeteor.style.right = `${getRndInteger(4, 96)}%`

            gameplayWrapper.appendChild(newMeteor)

            newMeteor.style.top = `${0 - (newMeteor.getBoundingClientRect().height / 2)}px`

            let waveInterval = getRndInteger(waveIntervalMin, waveIntervalMax)

            function moveMeteor() {
                if (gameIsActive) {
                    let currentTop = parseInt(window.getComputedStyle(newMeteor).top || 0)
                    if (parseInt(currentTop || 0) < gameplayWrapper.getBoundingClientRect().height + (newMeteor.getBoundingClientRect().height / 2)) {
                        newMeteor.style.top = `${currentTop + waveStepSpeed}px`
                        if (isTouching(newMeteor, playerChar)) {
                            gameIsActive = false
                            gameOver()
                        }
                        setTimeout(moveMeteor, 10)
                    } else {
                        newMeteor.remove()
                    }
                } else {
                    newMeteor.remove()
                }
            }

            moveMeteor()
            setTimeout(spawnMeteor, waveInterval)
        }

        spawnMeteor()
    }
}

function gameOver() {
    let countdown = document.getElementById("countdown")
    countdown.innerHTML = ":C"
}

function arrowKeyPressed(side) {
    currentLeft = parseInt(window.getComputedStyle(playerChar).left || "0") // we use the or operator "||" here to make it default to 0 if something goes wrong
    //currentRight = parseInt(playerChar.style.right || "0"); <-- I tried using this too but it doesn't work because the px is relative to whichever side.
    // .. meaning that if you set left to 50, it will be 50 away from the left. If you then also set right to 50, it will move 50 from the right side.
    // .. left and right are independent of eachother and are relative to their parent
    currentTop = parseInt(window.getComputedStyle(playerChar).top || "0")

    let gameplayWrapper = document.getElementById("gameplayWrapper")
    let gameBounds = gameplayWrapper.getBoundingClientRect()
    let playerBounds = playerChar.getBoundingClientRect()

    if (side == "left" && currentLeft - (playerBounds.width / 2) - playerStepSize >= 0) {

        playerChar.style.left = `${currentLeft - playerStepSize}px` // You must use "` `" instead of regular string quotes when formatting unlike python 

    } else if (side == "right" && currentLeft + (playerBounds.width / 2) + playerStepSize <= gameBounds.width) {

        playerChar.style.left = `${currentLeft + playerStepSize}px`

    } else if (side == "up" && currentTop - (playerBounds.height / 2) - playerStepSize >= 0) {

        playerChar.style.top = `${currentTop - playerStepSize}px`

    } else if (side == "down" && currentTop + (playerBounds.height / 2) + playerStepSize <= gameBounds.height) {

        playerChar.style.top = `${currentTop + playerStepSize}px`

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
            case 65:
                console.log("left arrow")
                //playerChar.src = shipDynamicImage
                arrowKeyPressed("left")
                break
            case 68:
                console.log("right arrow")
                //playerChar.src = shipDynamicImage
                arrowKeyPressed("right")
                break
            case 87:
                console.log("up arrow")
                arrowKeyPressed("up")
                break
            case 83:
                console.log("down arrow")
                arrowKeyPressed("down")
                break
        }
    }
}