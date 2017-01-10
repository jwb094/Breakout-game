//get canvas element from html page
let canvas = document.getElementById("myCanvas");
//draw on the canvas
let canvasShape = canvas.getContext('2d');

//canvas elements
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
var dy = -2;
//hold radiius of ball
var ballRadius = 10;
//user paddle
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
// user control
let rightPressed = false;
let leftPressed = false;


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

/*
 * 39 - left cursor 37 right
 * 
 */
function keyDownHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = true;
    }
    else if (event.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode == 39) {
        rightPressed = false;
    }
    else if (event.keyCode == 37) {
        leftPressed = false;
    }
}


//function create the breakout ball
function drawBall() {
    canvasShape.beginPath();
    canvasShape.arc(x, y, ballRadius, 0, Math.PI * 2);
    canvasShape.fillStyle = "#0095DD";
    canvasShape.fill();
    canvasShape.closePath();
}

//create user pa ddle
function drawPaddle() {
    canvasShape.beginPath();
    canvasShape.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    canvasShape.fillStyle = "black";
    canvasShape.fill();
    canvasShape.closePath();
}


//function cleart the canvas
function draw() {
    canvasShape.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    /* 
    * collison detection
    * too high or too low reverse the direction of the ball 
    */

    //if ball is touching the tops
    if (y + dy < ballRadius) {
        dy = -dy;
        //else if the ball touchs botto  of the canvas 2 options
    } else if (y + dy > canvas.height - ballRadius) {
        //if ball hit left or right edges of the paddle
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            //else GAME OVER 
        } else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
    // if the center of the ball is greater than the canvas width  or less than 0
    if (x + dx > canvas.width - ballRadius || x + dx < 0) {
        dx = -dx;
    }
    //if right cursor is pressed  and less than 470px = move 7px to the right
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
        //if left cursor is pressed and greater than 0 = move 7px to the left
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

}

setInterval(draw, 10);