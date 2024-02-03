var headStr = "<krColonia>";
let headIndx = 0;

function printHomeHeader() {
  if (headIndx < headStr.length) {
    document.getElementById("headerContent").innerHTML += headStr[headIndx];
    headIndx++;
  }
  else {
    document.querySelector(".blinkCursor").style.animationPlayState = "running";
    return null;
  }
  setTimeout(printHomeHeader, 150);
}