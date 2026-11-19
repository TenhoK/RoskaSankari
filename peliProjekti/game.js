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
}

function EndGame()
{
    // TÄNNE LOPPU LOGIIKKA
    PlaySound(aaniEnd);
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
