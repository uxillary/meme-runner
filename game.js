const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let x = 150; // Character X Position
let y = 300; // Character Y Position
let dy = 0;  // Vertical Speed
const gravity = 1; // Gravity
let jumping = false;

let cloudX1 = 800;
let cloudX2 = 1100;

let birdX = 900;

let cloudImage = new Image();
cloudImage.src = 'img/cloud1.png';  // Replace 'cloud.png' with the path to your cloud image.

document.addEventListener("keydown", moveCharacter);

function moveCharacter(event) {
  switch (event.keyCode) {
    case 37: // Left Arrow
      x -= 5;
      break;
    case 39: // Right Arrow
      x += 5;
      break;
    case 38: // Up Arrow
    case 32: // Spacebar
      if (!jumping) {
        dy = -15;
        jumping = true;
      }
      break;
  }
}

function drawPerson(x, y) {
  // Head and Body for simplicity
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(x, y, 30, 50);
}

function drawCloud(x, y, width, height) {
  ctx.fillStyle = "grey";
  ctx.fillRect(x, y, width, height);
}

function drawBird(x, y) {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2);
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw moving clouds and bird
  drawCloud(cloudX1, 50, 80, 40);
  ctx.drawImage(cloudImage, cloudX2, 30);
  drawBird(birdX, 100);

  // Draw character
  drawPerson(x, y + dy);

  // Background motion
  cloudX1 -= 1;
  cloudX2 -= 1;
  birdX -= 2;
  if (cloudX1 < -100) cloudX1 = 900;
  if (cloudX2 < -100) cloudX2 = 1100;
  if (birdX < -50) birdX = 900;

  // Character jump physics
  if (y + dy < 300) {
    dy += gravity;
  } else {
    y = 300;
    dy = 0;
    jumping = false;
  }
}

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
