canvas = document.getElementById('rossGram1');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
ctx.fillStyle = "Black";
ctx.font = "40px Courier";
ctx.textAlign = "center";
ctx.fillText("Happy Birthday Ross! - Enjoy this birthday gram!", width / 2, height / 2 - 100);
ctx.font = "20px Courier";
ctx.fillText("Click the Start Button to start up your gram - an animated happy birthday message. NOW WITH BALLOONS!", width / 2, height / 2);
var firstFrame = 0;
var cList = [];
var red = 200;
var blue = 180;
var green = 80;
var spawnRateConfetti = 80;
var subtractNum = 100;
var jY = 5;
var intervalId=null;

function Confetti(x, y, yVel, color, ball) {
  this.x = x;
  this.y = y;
  this.yVel = yVel;
  this.color = color
  this.ball = ball
}

Confetti.prototype.draw = function() {
  ctx.fillStyle = this.color;
  if (this.ball) {
    ctx.fillStyle="rgb(255, 0, 120)";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, 50, 75, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, 49, 74, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y+70);
    ctx.lineTo(this.x, this.y+150);
    ctx.stroke();
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.font = "30px Courier"
    ctx.fillText("Ross", this.x, this.y);
    this.y -= this.yVel;
    this.yVel+=1;
  } else {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI, false);
    ctx.fill();
    this.y -= this.yVel;
    this.yVel -= 1;
  }
  //ctx.fillRect(this.x, this.y, 50, 50);
}

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max-min))
}

function spawnConfetti() {
  if (firstFrame % spawnRateConfetti === 0) {
    cList.push(new Confetti(randInt(100, 1400), 500, 20, "rgb(" + randInt(0, 255) + "," + randInt(0, 255) + "," + randInt(0, 255) + ")", false));
  }
}

function animation() {
  ctx.fillStyle = "Purple";
  ctx.fillRect(0, 0, width, height)
  if (firstFrame < 1401) {
    ctx.textAlign = "left";
    ctx.font = "100px Courier";
    ctx.fillStyle = "Red";
    ctx.fillText("Ross", 20 + firstFrame, 100);
    ctx.fillStyle = "Orange";
    ctx.fillText("Ross", 1200 - firstFrame, 200);
    ctx.fillStyle = "Green";
    ctx.fillText("Ross", 20 + firstFrame, 300);
    ctx.fillStyle = "Blue";
    ctx.fillText("Ross", 1200 - firstFrame, 400);
  } else if (firstFrame < 1501) {
    ctx.textAlign = "center";
    ctx.font = firstFrame - 1400 + "px Courier";
    ctx.fillStyle = "Black"
    ctx.fillText("Happy Birthday!", width / 2, height / 2);
  } else {
    spawnConfetti();
    for (var i = 0; i < cList.length; i++) {
      cList[i].draw();
    }
    for (var i = 0; i < cList.length; i++) {
      if(cList[i].y<-300){
        cList.splice(i, 1);
      }
      else if(cList[i].y>599){
        cList.splice(i, 1);
      }
    }
    ctx.textAlign = "center";
    ctx.font = "100px Courier";
    ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
    if (red < 255) {
      red += randInt(-5, 5)
    } else {
      randInt(-10, -1)
    };
    if (red < 0) red = 200;
    if (green < 255) {
      green += randInt(-5, 5)
    } else {
      randInt(-10, -1)
    };
    if (green < 0) green = 180;
    if (blue < 255) {
      blue += randInt(-5, 5)
    } else {
      randInt(-10, -1)
    };
    if (blue < 0) blue = 80;
    ctx.fillText("Happy Birthday!", width / 2, height / 2);
  }
  firstFrame += 10;
}

function animateParty() {
  if(intervalId==null) intervalId = setInterval(animation, 30);
}

function crankUp() {
  if (spawnRateConfetti > 40) {
    spawnRateConfetti -= 10;
  }
  for (var i = 0; i < 201; i++) {
    cList.push(new Confetti(randInt(100, 1400), 500, randInt(5, 30), "rgb(" + randInt(0, 255) + "," + randInt(0, 255) + "," + randInt(0, 255) + ")", false));
  }
  for (var i = 0; i < 30; i++){
    subtractNum = randInt(100, 500);
    jY = randInt(3, 15);
    cList.push(new Confetti(subtractNum, 500, jY, "", true));
    cList.push(new Confetti(1500-subtractNum, 500, jY, "", true));
  }

}
