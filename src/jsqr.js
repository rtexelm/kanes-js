import jsQR from "jsqr";
// import { qrInputs } from "./qrinputs";

var video = document.createElement("video");
var canvasElementLeft = document.getElementById("leftCanvas");
var canvasLeft = canvasElementLeft.getContext("2d", {
  willReadFrequently: true,
});
var canvasElementRight = document.getElementById("rightCanvas");
var canvasRight = canvasElementRight.getContext("2d", {
  willReadFrequently: true,
});
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var outputData = document.getElementById("outputData");

function drawLine(ctx, begin, end, color) {
  ctx.beginPath();
  ctx.moveTo(begin.x, begin.y);
  ctx.lineTo(end.x, end.y);
  ctx.lineWidth = 4;
  ctx.strokeStyle = color;
  ctx.stroke();
}

// Block out the QR
function drawRect(ctx, topLeft, topRight, bottomRight, bottomLeft, color) {
  let region = new Path2D();
  region.moveTo(topLeft.x, topLeft.y);
  region.lineTo(topRight.x, topRight.y);
  region.lineTo(bottomRight.x, bottomRight.y);
  region.lineTo(bottomLeft.x, bottomLeft.y);
  region.closePath();
  ctx.fillStyle = color;
  ctx.fill(region);
}

// Use facingMode: environment to attemt to get the front camera on phones
navigator.mediaDevices
  .getUserMedia({ video: { facingMode: "environment" } })
  .then(function (stream) {
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();
    requestAnimationFrame(tick);
  });

const leftDataQueue = Array.from({ length: 10 });
const rightDataQueue = Array.from({ length: 10 });

export const qrInputs = {
  qrL: null,
  qrR: null,
};

function tick() {
  loadingMessage.innerText = "⌛ Loading video...";
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    loadingMessage.hidden = true;
    canvasElementLeft.hidden = false;
    canvasElementRight.hidden = false;
    outputContainer.hidden = false;

    const halfVideoWidth = video.videoWidth / 2;

    canvasElementLeft.height = video.videoHeight;
    canvasElementRight.height = video.videoHeight;
    canvasElementLeft.width = halfVideoWidth;
    canvasElementRight.width = halfVideoWidth;

    // Draw the video frame to the canvases
    // Left Side
    canvasLeft.drawImage(
      video,
      0,
      0,
      canvasElementLeft.width,
      canvasElementLeft.height,
      0,
      0,
      canvasElementLeft.width,
      canvasElementLeft.height
    );

    // Right Side
    canvasRight.drawImage(
      video,
      canvasElementRight.width,
      0,
      canvasElementRight.width,
      canvasElementRight.height,
      0,
      0,
      canvasElementRight.width,
      canvasElementRight.height
    );

    canvasLeft.strokeStyle = "#00ff00";
    canvasLeft.strokeRect(
      0,
      0,
      canvasElementLeft.width,
      canvasElementLeft.height
    );

    canvasRight.strokeStyle = "red";
    canvasRight.strokeRect(
      0,
      0,
      canvasElementRight.width,
      canvasElementRight.height
    );

    // Scan the left half of the canvas
    let leftHalfImageData = canvasLeft.getImageData(
      0,
      0,
      canvasElementLeft.width,
      canvasElementLeft.height
    );

    var leftCode = jsQR(
      leftHalfImageData.data,
      halfVideoWidth,
      canvasElementLeft.height,
      {
        inversionAttempts: "dontInvert",
      }
    );

    if (leftCode) {
      const prevControl = leftDataQueue.shift();
      // Draw bounding box for the detected QR code
      drawLine(
        canvasLeft,
        leftCode.location.topLeftCorner,
        leftCode.location.topRightCorner,
        "#00ff00"
      );
      drawLine(
        canvasLeft,
        leftCode.location.topRightCorner,
        leftCode.location.bottomRightCorner,
        "#00ff00"
      );
      drawLine(
        canvasLeft,
        leftCode.location.bottomRightCorner,
        leftCode.location.bottomLeftCorner,
        "#00ff00"
      );
      drawLine(
        canvasLeft,
        leftCode.location.bottomLeftCorner,
        leftCode.location.topLeftCorner,
        "#00ff00"
      );
      leftDataQueue.push("Left: " + leftCode.data); // Store detected code data
      qrInputs.qrL = leftCode.data;
    }

    // Scan the right half of the canvas
    let rightHalfImageData = canvasRight.getImageData(
      0,
      0,
      canvasElementRight.width,
      canvasElementRight.height
    );

    var rightCode = jsQR(
      rightHalfImageData.data,
      halfVideoWidth,
      canvasElementRight.height,
      {
        inversionAttempts: "dontInvert",
      }
    );

    if (rightCode) {
      const prevControl = rightDataQueue.shift();
      // Draw bounding box for the detected QR code
      drawLine(
        canvasRight,

        {
          x: rightCode.location.topLeftCorner.x,
          y: rightCode.location.topLeftCorner.y,
        },
        {
          x: rightCode.location.topRightCorner.x,
          y: rightCode.location.topRightCorner.y,
        },
        "#FF3B58"
      );
      drawLine(
        canvasRight,
        {
          x: rightCode.location.topRightCorner.x,
          y: rightCode.location.topRightCorner.y,
        },
        {
          x: rightCode.location.bottomRightCorner.x,
          y: rightCode.location.bottomRightCorner.y,
        },
        "#FF3B58"
      );
      drawLine(
        canvasRight,
        {
          x: rightCode.location.bottomRightCorner.x,
          y: rightCode.location.bottomRightCorner.y,
        },
        {
          x: rightCode.location.bottomLeftCorner.x,
          y: rightCode.location.bottomLeftCorner.y,
        },
        "#FF3B58"
      );
      drawLine(
        canvasRight,
        {
          x: rightCode.location.bottomLeftCorner.x,
          y: rightCode.location.bottomLeftCorner.y,
        },
        {
          x: rightCode.location.topLeftCorner.x,
          y: rightCode.location.topLeftCorner.y,
        },
        "#FF3B58"
      );
      rightDataQueue.push("Right: " + rightCode.data); // Store detected code data
      qrInputs.qrR = rightCode.data;
    }

    // if (leftDataQueue.length > 0 || rightDataQueue.length > 0) {
    //   outputMessage.hidden = true;
    //   outputData.parentElement.hidden = false;
    //   outputData.innerText =
    //     "Detected QR Codes: [" +
    //     leftDataQueue.join(", ") +
    //     "], [" +
    //     rightDataQueue.join(", ") +
    //     "]";
    // } else {
    //   outputMessage.hidden = false;
    //   outputData.parentElement.hidden = true;
    // }
    outputContainer.hidden = true;
    outputMessage.hidden = true;
    outputData.parentElement.hidden = true;
  }
  requestAnimationFrame(tick);
}
