// PELIPROJEKTIN JAVASCRIPT TIEDOSTO

// ÄÄNET
const aaniClick = new Audio("assets/sounds/click.mp3");
const aaniScore = new Audio("assets/sounds/score.mp3");
const aaniEnd  = new Audio("assets/sounds/loppu.mp3");

// MUSA
const musiikki = new Audio("assets/sounds/musiikki.mp3");

// ITEMS
const items = [{nimi: "Banaani", tyyppi: "Bio"},
            {nimi: "Tölkki", tyyppi: "Metalli"},
            {nimi: "Pahvilaatikko", tyyppi: "Kartonki"},
            {nimi: "Lasipullo", tyyppi: "Lasi"},
            {nimi: "Muovipussi", tyyppi: "Muovi"}];

// PISTEET
let score = 0;

function StartGame()
{
    SpawnItem();
    PlayMusic();

    lastTime = performance.now();
    requestAnimationFrame(GameLoop);
}

function SpawnItem()
{
    const index = Math.floor(Math.random() * items.length);
    const item = items[index];

    const objekti = document.createElement("img"); // TEHDÄÄN UUS KUVA
    objekti.className = "item";
    objekti.src = "assets/images/" + item.kuva;
    objekti.textContent = item.nimi;

    const field = document.getElementById("playfield");
    field.appendChild(objekti); // LISÄTTÄN UUS OBJEKTI PELIKENTÄLLE

    currentItem = { objekti: objekti, x: Math.random() * (field.clientWidth - objekti.offsetWidth), y: 0, tyyppi: item.tyyppi};

    PiirräItem();
}

function PiirräItem()
{
    currentItem.objekti.style.left = currentItem.x + "px";
    currentItem.objekti.style.top = currentItem.y + "px";
}

function AddScore()
{
    score++;
    document.getElementById("score").textContent = score;
    PlaySound(aaniScore);
}

// ==================== ÄÄNI JUTTUJA =====================
const aaniClick = new Audio("assets/sounds/click.mp3");
const aaniScore = new Audio("assets/sounds/score.mp3");
const aaniEnd  = new Audio("assets/sounds/loppu.mp3");
// MUSA
const musiikki = new Audio("assets/sounds/musiikki.mp3");
function PlaySound(aani) 
{
  aani.currentTime = 0;
  aani.play();
}

function PlayMusic()
{
    musiikki.loop = true;
    musiikki.volume = 0.3;
    musiikki.play();
}

function StopMusic()
{
    //musiikki.loop = false;
    //musiikki.volume = 0.3;
    musiikki.stop();
}

// ==================== BUTTONS =====================
document.getElementById("startBtn").addEventListener("click", StartGame);
document.getElementById("pauseBtn").addEventListener("click", PauseGame);
document.getElementById("resumeBtn").addEventListener("click", ResumeGame);
document.getElementById("quitBtn").addEventListener("click", QuitGame);
document.getElementById("restartBtn").addEventListener("click", StartGame);
document.getElementById("menuBtn").addEventListener("click", ToMenu);

// TÄÄAVAA SCRRENIN JA SULKEE MUUT
function ShowScreen(nimi)
{
    for (const s of document.querySelectorAll(".screen")) {
        s.hidden = true;
    }
    document.getElementById(nimi).hidden = false;
}
//ShowScreen("menu");   // päävalikko
//ShowScreen("game");   // peli
//ShowScreen("pause");  // tauko
//ShowScreen("over");   // loppu

function UpdateHud()
{
    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
}

function PauseGame()
{
    if (tila !== "playing") return;
    tila = "paused";
    musiikki.pause();
    document.getElementById("pauseScore").textContent = score;
    ShowScreen("pause");
}

function ResumeGame()
{
    ShowScreen("game");
    tila = "playing";
    musiikki.play();
    lastTime = performance.now();
    requestAnimationFrame(GameLoop);
}

function QuitGame()
{
    EndGame();
    tila = "over";
}

function EndGame()
{
    tila = "over";
    StopMusic();
    PlaySound(aaniEnd);
    if (currentItem) { currentItem.objekti.remove(); currentItem = null; }
    document.getElementById("finalScore").textContent = score;
    ShowScreen("over");
}

function ToMenu()
{
    ShowScreen("menu");
    tila = "menu";
}