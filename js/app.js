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
//brick fields
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
//brick column
for (column = 0; column < brickColumnCount; column++) {
    bricks[column] = [];
    // brick row
    for (row = 0; row < brickRowCount; row++) {
        bricks[column][row] = { x: 0, y: 0, status: 1 };
    }
}


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);


// functions creates the bricks
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                canvasShape.beginPath();
                canvasShape.rect(brickX, brickY, brickWidth, brickHeight);
                canvasShape.fillStyle = "red";
                canvasShape.fill();
                canvasShape.closePath();
            }
        }
    }
}

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

// function for ball hit the brick
function collisonDetection() {

    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                // if the ball is between the left and righht side of the brick
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    //brick not drawn again
                    b.status = 0;
                }
            }
        }
    }
}

//function clear the canvas
function draw() {
    canvasShape.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisonDetection();
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