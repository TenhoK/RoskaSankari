// PELIPROJEKTIN JAVASCRIPT TIEDOSTO

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
}

function PauseGame()
{
    // TÄNNE PAUSE LOGIIKKA
}

function SpawnItem()
{
    const index = items.Math.floor(Math.random() * items.length);
    const item = items[index];

    const objekti = document.createElement("div");
    objekti.className = "item";
    objekti.textContent = item.nimi;
    objekti.dataset.tyyppi = item.tyyppi;

    objekti.style.left = "50%";
    objekti.style.top = "0px";

    document.getElementById("playfield");
}

function AddScore()
{
    score++;
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

function QuitGame()        // Lopeta-nappi taukovalikossa
{
    EndGame();
}

function EndGame()
{
    tila = "over";
    StopMusic();
    PlaySound(aaniEnd);
    if (currentItem) { currentItem.el.remove(); currentItem = null; }
    document.getElementById("finalScore").textContent = score;
    ShowScreen("over");
}

function ToMenu()
{
    ShowScreen("menu");
}