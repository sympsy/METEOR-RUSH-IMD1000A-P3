const countdownLength = 0

let gameIsActive = false
let playerChar = null

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
    }, delay);

}

function moveSelection(input) {
    if (gameIsActive) {
        console.log("cliiiiiicked")
        switch (input.keyCode) {
            case 37:
                console.log("left arrow")
        }
    }
}