import jsQR from "jsqr";
import { qrInputs } from "./qrinputs";

var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d", { willReadFrequently: true });
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var outputData = document.getElementById("outputData");

function drawLine(begin, end, color) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = 4;
  canvas.strokeStyle = color;
  canvas.stroke();
}

// Block out the QR
function drawRect(topLeft, topRight, bottomRight, bottomLeft, color) {
  let region = new Path2D();
  region.moveTo(topLeft.x, topLeft.y);
  region.lineTo(topRight.x, topRight.y);
  region.lineTo(bottomRight.x, bottomRight.y);
  region.lineTo(bottomLeft.x, bottomLeft.y);
  region.closePath();
  canvas.fillStyle = color;
  canvas.fill(region);
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

// function hideCode() {
//   if (codesQueue.length > 0) {
//     let code = codesQueue.shift();
//     drawRect(
//       code.location.topLeftCorner,
//       code.location.topRightCorner,
//       code.location.bottomRightCorner,
//       code.location.bottomLeftCorner,
//       "#FF3B58"
//     );
//   }
// }

function tick() {
  loadingMessage.innerText = "⌛ Loading video...";
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    loadingMessage.hidden = true;
    canvasElement.hidden = false;
    outputContainer.hidden = false;

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    const halfWidth = canvasElement.width / 2;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    // var imageData = canvas.getImageData(
    //   0,
    //   0,
    //   canvasElement.width,
    //   canvasElement.height
    // );
    let leftHalfImageData = canvas.getImageData(
      0,
      0,
      halfWidth,
      canvasElement.height
    );
    canvas.strokeStyle = "#00ff00";
    canvas.strokeRect(0, 0, halfWidth, canvasElement.height);
    var leftCode = jsQR(
      leftHalfImageData.data,
      halfWidth,
      canvasElement.height,
      {
        inversionAttempts: "dontInvert",
      }
    );

    if (leftCode) {
      const prevControl = leftDataQueue.shift();
      // Draw bounding box for the detected QR code
      drawLine(
        leftCode.location.topLeftCorner,
        leftCode.location.topRightCorner,
        "#FF3B58"
      );
      drawLine(
        leftCode.location.topRightCorner,
        leftCode.location.bottomRightCorner,
        "#FF3B58"
      );
      drawLine(
        leftCode.location.bottomRightCorner,
        leftCode.location.bottomLeftCorner,
        "#FF3B58"
      );
      drawLine(
        leftCode.location.bottomLeftCorner,
        leftCode.location.topLeftCorner,
        "#FF3B58"
      );
      leftDataQueue.push("Left: " + leftCode.data); // Store detected code data
      qrInputs.qrL = leftCode.data;
      console.log(qrInputs.qrL);
    }

    // Scan the right half of the canvas
    let rightHalfImageData = canvas.getImageData(
      halfWidth,
      0,
      halfWidth,
      canvasElement.height
    );
    canvas.strokeStyle = "red";
    canvas.strokeRect(halfWidth, 0, halfWidth, canvasElement.height);
    var rightCode = jsQR(
      rightHalfImageData.data,
      halfWidth,
      canvasElement.height,
      {
        inversionAttempts: "dontInvert",
      }
    );

    if (rightCode) {
      const prevControl = rightDataQueue.shift();
      // Draw bounding box for the detected QR code
      drawLine(
        {
          x: rightCode.location.topLeftCorner.x + halfWidth,
          y: rightCode.location.topLeftCorner.y,
        },
        {
          x: rightCode.location.topRightCorner.x + halfWidth,
          y: rightCode.location.topRightCorner.y,
        },
        "#FF3B58"
      );
      drawLine(
        {
          x: rightCode.location.topRightCorner.x + halfWidth,
          y: rightCode.location.topRightCorner.y,
        },
        {
          x: rightCode.location.bottomRightCorner.x + halfWidth,
          y: rightCode.location.bottomRightCorner.y,
        },
        "#FF3B58"
      );
      drawLine(
        {
          x: rightCode.location.bottomRightCorner.x + halfWidth,
          y: rightCode.location.bottomRightCorner.y,
        },
        {
          x: rightCode.location.bottomLeftCorner.x + halfWidth,
          y: rightCode.location.bottomLeftCorner.y,
        },
        "#FF3B58"
      );
      drawLine(
        {
          x: rightCode.location.bottomLeftCorner.x + halfWidth,
          y: rightCode.location.bottomLeftCorner.y,
        },
        {
          x: rightCode.location.topLeftCorner.x + halfWidth,
          y: rightCode.location.topLeftCorner.y,
        },
        "#FF3B58"
      );
      rightDataQueue.push("Right: " + rightCode.data); // Store detected code data
      qrInputs.qrR = rightCode.data;
    }

    if (leftDataQueue.length > 0 || rightDataQueue.length > 0) {
      outputMessage.hidden = true;
      outputData.parentElement.hidden = false;
      outputData.innerText =
        "Detected QR Codes: " +
        leftDataQueue.join(", ") +
        ", " +
        rightDataQueue.join(", ");
    } else {
      outputMessage.hidden = false;
      outputData.parentElement.hidden = true;
    }
  }
  requestAnimationFrame(tick);
}
