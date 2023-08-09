const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

canvas.width = 600
canvas.height = 400

let ballX = canvas.width / 2
let ballY = canvas.height / 2 
let ballSpeedX = 2
let ballSpeedY = 2

let leftPlayerY = canvas.height / 2 - 50
let rightPlayerY = canvas.height / 2 - 50
const playerSpeed = 20 
const playerHeight = 50
const playerWidth = 10

let leftPlayerScore = 0
let rightPlayerScore = 0

let isResettingBall = false
let isGameStarted = false

const gameUpdate = () => {
    if (leftPlayerScore >= 5 || rightPlayerScore >=5){
        displayWinMessage()
        return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ballX += ballSpeedX
    ballY += ballSpeedY

    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY *= -1;
    }
    if ((ballX <= playerWidth && ballY >= leftPlayerY && ballY <= leftPlayerY + playerHeight) ||
        (ballX >= canvas.width - playerWidth && ballY >= rightPlayerY && ballY <= rightPlayerY + playerHeight)) 
    {
        ballSpeedX *= -1;
    }
    if (ballX <= 0 && !isResettingBall) {
        rightPlayerScore++; // Increase the right player's score
        updateScoreDisplay();
        resetBallPosition();
    }

    if (ballX >= canvas.width && !isResettingBall) {
        leftPlayerScore++; // Increase the left player's score
        updateScoreDisplay();
        resetBallPosition();
    }
    // make the player paddles 
    ctx.fillStyle = "white"
    ctx.fillRect(0, leftPlayerY, playerWidth, playerHeight)
    ctx.fillRect(canvas.width - playerWidth, rightPlayerY, playerWidth, playerHeight)

    // make ball 
    ctx.beginPath ()
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2)
    ctx.fill()

    requestAnimationFrame(gameUpdate)
}
const updateScoreDisplay = () => {
    const leftPlayerScoreElement = document.getElementById("leftPlayerScore")
    const rightPlayerScoreElement = document.getElementById("rightPlayerScore")

    leftPlayerScoreElement.textContent = leftPlayerScore
    rightPlayerScoreElement.textContent = rightPlayerScore
}
const resetBallPosition = () => {
    isResettingBall = true
    ballX = canvas.width / 2
    ballY = canvas.height / 2
    ballSpeedX *= -1
    setTimeout(() => {
        isResettingBall = false
    }, 1000);
}
const resetGame = () => {
    console.log("Resstting game")
    leftPlayerScore = 0
    rightPlayerScore = 0
    isResettingBall = false
    isGameStarted = false
    updateScoreDisplay()
    const winMessageElement = document.getElementById("winMessage")
    winMessageElement.textContent = ''
    console.log("game reset")
}
const displayWinMessage = () => {
    const winMessageElement = document.getElementById("winMessage")
    winMessageElement.textContent = leftPlayerScore >= 5 ? "Player 1 WON!!" : "Player 2 WINS!!"
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && rightPlayerY > 0) {
        rightPlayerY -= playerSpeed
    }
    if (e.key === "ArrowDown" && rightPlayerY < canvas.height - playerHeight) {rightPlayerY += playerSpeed
    }
    if (e.key === "w" && leftPlayerY > 0) {
        leftPlayerY -= playerSpeed
    }
    if (e.key === "s" && leftPlayerY < canvas.height - playerHeight) {
        leftPlayerY += playerSpeed
    }
})
const playButton = document.getElementById("playButton")
playButton.addEventListener("click", () => {
    console.log("play button")
    if (!isGameStarted) {
        resetGame()
        console.log("game starting")
        gameUpdate()
        isGameStarted = true
    }
})