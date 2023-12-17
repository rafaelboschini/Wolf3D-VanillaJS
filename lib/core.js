const canvas = document.getElementById("myCanvas");
const mapScale = 4;
let screenWidth =
  window.innerWidth > 1000
    ? 1000
    : window.innerWidth < 500
    ? 500
    : window.innerWidth;
let screenHeight = screenWidth * (700 / 1024); // keep proportion
const screenStrips = [];
const stripWidth = 2;
const fov = (60 * Math.PI) / 180;
const fovHalf = fov / 2;
const numRays = Math.ceil(screenWidth / stripWidth);
const viewDistance = screenWidth / 2 / Math.tan(fov / 2);
const twoPI = Math.PI * 2;
const numTextures = 15;
const debug = false;

let mapWidth = 0;
let mapHeight = 0;
let selectedMap = 0;
let ctx = null;
let showingPopup = false;

// Clears the canvas for redrawing
function cleanCanvas() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

// Sets the room title based on the selected map
function setRoomTitle() {
  document.querySelector(".mapname").innerText = maps[selectedMap].name;
}

// Draws the overview map based on the current player position
function drawMap() {
  cleanCanvas();

  for (var y = 0; y < mapHeight; y++) {
    for (var x = 0; x < mapWidth; x++) {
      var wall = map[y][x];
      if (wall > 0) {
        ctx.beginPath();
        ctx.fillStyle = "#000"; // Map border
        ctx.fillRect(x * mapScale, y * mapScale, mapScale, mapScale);
        ctx.closePath();
      }
    }
  }

  drawPlayer();
}
// Draws the player's position and orientation
function drawPlayer() {
  ctx.beginPath();
  ctx.fillRect(player.x * mapScale - 2, player.y * mapScale - 2, 4, 4);

  ctx.fillStyle = "#0000FF";
  ctx.moveTo(player.x * mapScale, player.y * mapScale);

  ctx.lineTo(
    (player.x + Math.cos(player.rotation) * 4) * mapScale,
    (player.y + Math.sin(player.rotation) * 4) * mapScale
  );

  ctx.stroke();
  ctx.closePath();
}
// Casts rays to render the 3D view of the game
function castRays() {
  var stripIndex = 0;
  for (var i = 0; i < numRays; i++) {
    /*position of the radius on the screen*/
    var rayScreenPosition = (-numRays / 2 + i) * stripWidth;
    var rayViewDistance = Math.sqrt(
      rayScreenPosition * rayScreenPosition + viewDistance * viewDistance
    );
    var rayAngle = Math.asin(rayScreenPosition / rayViewDistance);

    castSingleRay(player.rotation + rayAngle, stripIndex++);
  }
}

// Casts a single ray to determine its interactions with the map
function castSingleRay(rayAngle, stripIndex) {
  /* Determines that the angle is between 0 and 360 degrees */
  rayAngle %= twoPI;
  if (rayAngle < 0) rayAngle += twoPI;

  /* Gets the user's address based on the quadrant in which it is */
  var right = rayAngle > twoPI * 0.75 || rayAngle < twoPI * 0.25;
  var up = rayAngle < 0 || rayAngle > Math.PI;
  var wallType = 0;
  var angleSin = Math.sin(rayAngle);
  var angleCos = Math.cos(rayAngle);

  /* distance to the target block */
  var distance = 0;

  /* coordinates of the place where the radius */
  var xHit = 0;
  var yHit = 0;

  /* What part of the texture do we use? */
  var textureX;

  /* coordinates of the blocks */
  var wallX;
  var wallY;
  var wallIsHorizontal = false;

  /* tangent of the inclination angle */
  var slope = angleSin / angleCos;
  var dXVer = right ? 1 : -1;
  var dYVer = dXVer * slope;

  /* Initial horizontal position, starting from one of the walls of the block */
  var x = right ? Math.ceil(player.x) : Math.floor(player.x);

  /* Initial vertical position */
  var y = player.y + (x - player.x) * slope;

  /*
	Horizontal check: first find the horizontal extremity of the block, 
	then scroll the blocks of the map for walls.
	*/
  while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
    var wallX = Math.floor(x + (right ? 0 : -1));
    var wallY = Math.floor(y);

    // is wall?
    if (map[wallY][wallX] > 0) {
      var distanceX = x - player.x;
      var distanceY = y - player.y;

      /* Distance between block and player */
      var distance = distanceX * distanceX + distanceY * distanceY;

      /* Obtains the type of block (it will be necessary to define the texture that will be used) */
      wallType = map[wallY][wallX];
      textureX = y % 1; // ٩(̾●̮̮̃̾•̃̾)۶

      /* If the player is looking to the left, use a different texture */
      if (!right) textureX = 1 - textureX;

      /* Save the coordinates from where the ray struck the block */
      xHit = x;
      yHit = y;
      wallIsHorizontal = true;
      break;
    }

    x += dXVer;
    y += dYVer;
  }

  /*
	Vertical check: same horizontal check procedure,
	but we checked if the block was not already found in a
	previous check. If it was, we only got the lowest
	distance
	*/
  var slope = angleCos / angleSin;
  var dYHor = up ? -1 : 1;
  var dXHor = dYHor * slope;

  var y = up ? Math.floor(player.y) : Math.ceil(player.y);
  var x = player.x + (y - player.y) * slope;

  while (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) {
    var wallY = Math.floor(y + (up ? -1 : 0));
    var wallX = Math.floor(x);

    if (map[wallY][wallX] > 0) {
      var distanceX = x - player.x;
      var distanceY = y - player.y;
      var blockDistance = distanceX * distanceX + distanceY * distanceY;

      if (!distance || blockDistance < distance) {
        distance = blockDistance;
        xHit = x;
        yHit = y;
        wallType = map[wallY][wallX];
        textureX = x % 1;
        if (up) textureX = 1 - textureX;
      }

      break;
    }

    x += dXHor;
    y += dYHor;
  }

  if (distance) {
    var strip = screenStrips[stripIndex];
    distance = Math.sqrt(distance);

    /* Corrects fisheye effect */
    distance = distance * Math.cos(player.rotation - rayAngle);

    /* Gets the actual distance from the wall */
    var height = Math.round(viewDistance / distance);
    var width = height * stripWidth;

    /* Top of screen */
    var top = Math.round((screenHeight - height) / 2);
    strip.style.height = height + "px";
    strip.style.top = top + "px";

    if (debug) {
      strip.span.style.border = "solid 2px red";

      strip.span.style.height = Math.floor(height * numTextures) + "px";
      strip.span.style.width = Math.floor(width * 2) + "px";
      strip.span.style.top = -Math.floor(height * (wallType - 1)) + "px";
    } else {
      strip.img.style.height = Math.floor(height * numTextures) + "px";
      strip.img.style.width = Math.floor(width * 2) + "px";
      strip.img.style.top = -Math.floor(height * (wallType - 1)) + "px";
    }

    var texX = Math.round(textureX * width);
    if (texX > width - stripWidth) {
      texX = width - stripWidth;
    }

    if (debug) {
      strip.span.style.left = -texX + "px";
    } else {
      strip.img.style.left = -texX + "px";
    }
  }
}

// Moves the player based on user input and handles collisions
function move() {
  var moveStep = player.speed * player.moveSpeed;

  player.rotation += (player.direction * player.rotationSpeed * Math.PI) / 180;
  var newX = player.x + Math.cos(player.rotation) * moveStep;
  var newY = player.y + Math.sin(player.rotation) * moveStep;

  // Detect collision
  if (isBlocking(newX, newY)) {
    // Verify is has popup to show
    const popMessage = hasInfoToShow(newX, newY);
    if (popMessage != null) {
      if (!showingPopup) {
        openPopup(popMessage[0].title, popMessage[0].content);
      }
      showingPopup = true;
    }

    return;
  }
  showingPopup = false;
  const gateId = isGate(newX, newY);

  if (gateId != null) {
    map = maps[gateId].map;
    selectedMap = gateId;

    setRoomTitle();
  } else {
    player.x = newX;
    player.y = newY;
  }
}

// Checks if a given position is blocking the player's movement
function isBlocking(x, y) {
  if (y < 0 || y > mapHeight || x < 0 || x > mapWidth) return true;
  if (map[Math.floor(y)][Math.floor(x)] != 0) return true;
}

function hasInfoToShow(x, y) {
  const infoToShow = maps[selectedMap].popup.filter((item) => {
    return (
      Math.floor(x) == item.position[0] && Math.floor(y) == item.position[1]
    );
  });

  if (infoToShow.length > 0) {
    return infoToShow;
  }

  return null;
}

// Checks if a given position corresponds to a gate for map transition
function isGate(x, y) {
  var selectedIdx = null;

  maps[selectedMap].doorgate.forEach((item) => {
    if (
      Math.floor(x) == item.position[0] &&
      Math.floor(y) == item.position[1]
    ) {
      selectedIdx = item.linkedidx;

      player.x = item.playerpos.x;
      player.y = item.playerpos.y;
      player.rotation = item.playerpos.rotation;

      return;
    }
  });

  return selectedIdx;
}

// Reads keyboard input to control player movement
function readKeys() {
  document.onkeydown = function (e) {
    e = e || window.event;

    switch (e.keyCode) {
      case 38:
        player.speed = 1;
        break;
      case 40:
        player.speed = -1;
        break;
      case 37:
        player.direction = -1;
        break;
      case 39:
        player.direction = 1;
        break;
    }
  };
  document.onkeyup = function (e) {
    e = e || window.event;

    switch (e.keyCode) {
      case 38:
      case 40:
        player.speed = 0;
        break;
      case 37:
      case 39:
        player.direction = 0;
        break;
    }
  };
}

// Creates a strip element for rendering the 3D view
function createStripElement(type) {
  const strip = document.createElement("div");
  strip.style.position = "absolute";
  strip.style.left = "0px";
  strip.style.width = stripWidth + "px";
  strip.style.height = "0px";
  strip.style.overflow = "hidden";

  if (type === "debug") {
    const divBlock = document.createElement("span");
    divBlock.style.position = "absolute";
    divBlock.style.left = "0px";
    strip.appendChild(divBlock);
    strip.span = divBlock;
  } else {
    const img = new Image();
    img.src = "image/walls.png";
    img.style.position = "absolute";
    img.style.left = "0px";
    strip.appendChild(img);
    strip.img = img;
  }

  return strip;
}

// Initializes the screen elements for rendering
function initScreen() {
  const screen = document.getElementById("screen");

  for (let i = 0; i < screenWidth; i += stripWidth) {
    const strip = createStripElement(debug ? "debug" : "image");
    strip.style.left = i + "px";
    strip.style.backgroundColor = debug ? "white" : "";

    screenStrips.push(strip);
    screen.appendChild(strip);
  }
}

// Initializes the game and sets up the game loop
function init() {
  map = maps[selectedMap].map;

  mapWidth = map[0].length;
  mapHeight = map.length;
  canvas.width = mapWidth * mapScale;
  canvas.height = mapHeight * mapScale;

  canvas.style.width = mapWidth * mapScale + "px";
  canvas.style.height = mapHeight * mapScale + "px";

  ctx = canvas.getContext("2d");

  setRoomTitle();
  initScreen();

  // Game LOOP
  setInterval(() => {
    drawMap();
    readKeys();
    move();

    drawPlayer();
    castRays();
  }, 1000 / 30);
}

function openPopup(title, content) {
  document.querySelector(".popup-title").innerText = title;
  document.querySelector(".popup-text").innerHTML = content;
  document.getElementById("overlay").style.display = "block";
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popup").style.display = "none";
}
