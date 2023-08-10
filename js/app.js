// I want to grab the canavs and I want to set it up in 2d
const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

// make the canvas
canvas.width = 600
canvas.height = 400

// set up the ball dimensions 
const ballRadius = 10
const ballDiameter = ballRadius * 2

// here I want to define the ball properties
let ballX = canvas.width / 2
let ballY = canvas.height / 2 
let ballSpeedX = 4
let ballSpeedY = 4

// I want to define the player height and width
const playerHeight = 50
const playerWidth = 50

// make the player positions and speed 
let leftPlayerY = canvas.height / 2 - playerHeight / 2
let rightPlayerY = canvas.height / 2 - playerHeight / 2
const playerSpeed = 40 

// show what the player score is and the status of the game 
let leftPlayerScore = 0
let rightPlayerScore = 0
let isResettingBall = false
let isGameStarted = false

// make a loop so the game can run 
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
    // make field
    const soccerFieldImage = document.getElementById("soccerField")
    ctx.drawImage(soccerFieldImage, 0, 0, canvas.width, canvas.height)
// make it so that the ball can bounce off the player 
    if ((ballX <= playerWidth && ballY >= leftPlayerY && ballY <= leftPlayerY + playerHeight) ||
        (ballX >= canvas.width - playerWidth && ballY >= rightPlayerY && ballY <= rightPlayerY + playerHeight)) 
    {
        ballSpeedX *= -1;
    }
    // update the score 
    if (ballX <= 0 && !isResettingBall) {
        rightPlayerScore++; // Increase the right player's score
        updateScoreDisplay();
        resetBallPosition();
    }

    if (ballX >= canvas.width  && !isResettingBall) {
        leftPlayerScore++; // Increase the left player's score
        updateScoreDisplay();
        resetBallPosition();
    }
    
    // make the player paddles 
    const leftPlayerPicture = document.getElementById("leftplayerImg")
    // console.log("leftPlayerPicture", leftPlayerPicture)
    ctx.drawImage(leftPlayerPicture, 0, leftPlayerY, playerWidth, playerHeight)

    const rightPlayerPicture = document.getElementById("rightplayerImg")
    ctx.drawImage(rightPlayerPicture, canvas.width - playerWidth, rightPlayerY, playerWidth, playerHeight)
    // ctx.fillStyle = "white"
    // ctx.fillRect(0, leftPlayerY, playerWidth, playerHeight)
    // ctx.fillRect(canvas.width - playerWidth, rightPlayerY, playerWidth, playerHeight)

    // make ball 
    const soccerBallImage = document.getElementById("soccerball")
    ctx.drawImage(soccerBallImage, ballX - ballRadius, ballY - ballRadius, ballDiameter, ballDiameter)
    // ctx.beginPath ()
    // ctx.arc(ballX, ballY, 10, 0, Math.PI * 2)
    // ctx.fill()

    
    requestAnimationFrame(gameUpdate)
}
// update the score display
const updateScoreDisplay = () => {
    const leftPlayerScoreElement = document.getElementById("leftPlayerScore")
    const rightPlayerScoreElement = document.getElementById("rightPlayerScore")

    leftPlayerScoreElement.textContent = leftPlayerScore
    rightPlayerScoreElement.textContent = rightPlayerScore
}
// rest ball position
const resetBallPosition = () => {
    isResettingBall = true
    ballX = canvas.width / 2
    ballY = canvas.height / 2
    ballSpeedX *= -1
    setTimeout(() => {
        isResettingBall = false
    }, 1000);
}
// reset game 
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
// make player controls
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
// make a play button 
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
