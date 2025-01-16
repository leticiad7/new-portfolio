// Welcome.js - Controls for Welcome Page

// Cycle through different languages for "WELCOME"
const welcomeText = document.getElementById("welcome-text");
const languages = [
    "WELCOME", 
    "ようこそ", // Japanese
    "BIENVENUE", 
    "أهلاً وسهلاً", // Arabic
    "BEM VINDO", 
    "WILLKOMMEN", 
    "BIENVENIDO", 
    "환영합니다", // Korean
    "欢迎",      // Simplified Chinese
    "स्वागत है",  // Hindi
    "добро пожаловать", // Russian
    "BIENVENUTO", 
    "VÄLKOMMEN",
    "TIKILLUARIT", // Greenlandic
    "HOŞGELDİNİZ", // Turkish
];

let currentIndex = 0;
let timer = 0;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("p5-canvas-container");
    textAlign(CENTER, CENTER);
    textFont("Arial");
    textSize(80);
    fill(255);
}

function draw() {
    background(0);
    text(languages[currentIndex], width / 2, height / 2);

    // Pulsating effect
    textSize(80 + sin(frameCount * 0.05) * 10);

    // Change language every 2 seconds
    timer++;
    if (timer > 120) { // Assuming 60 fps
        currentIndex = (currentIndex + 1) % languages.length;
        timer = 0;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


let currentLanguageIndex = 0;

function updateWelcomeText() {
    welcomeText.textContent = languages[currentLanguageIndex];
    currentLanguageIndex = (currentLanguageIndex + 1) % languages.length;
}

// Change text every 2 seconds
setInterval(updateWelcomeText, 2000);

// Redirect based on device selection
function redirectTo(device) {
    if (device === "desktop.html") {
        window.location.href = "desktop.html";
    } else if (device === "mobile") {
        window.location.href = "mobile.html";
    }
}
