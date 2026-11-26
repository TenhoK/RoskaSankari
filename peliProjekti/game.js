// PELIPROJEKTIN JAVASCRIPT TIEDOSTO

// ITEMS
const items = [
    {nimi: "Banaani",       tyyppi: "Bio",      kuva: "banaani.png"},
    {nimi: "Tölkki",        tyyppi: "Metalli",  kuva: "tolkki.png"},
    {nimi: "Pahvilaatikko", tyyppi: "Kartonki", kuva: "pahvilaatikko.png"},
    {nimi: "Lasipullo",     tyyppi: "Lasi",     kuva: "lasipullo.png"},
    {nimi: "Muovipussi",    tyyppi: "Muovi",    kuva: "muovipussi.png"}
];

// PELIN TILA ETC..
let tila = "menu";          // MIKÄ TILANNE PELISSÄ ON MENOSSA
let currentItem = null;     // "objekti" MITÄ LIIKUTELLAAN PELISSÄ
let lastTime = 0;           // AIKA PÄIVITETTY VIIMEKS
let score = 0;              // PISTEET
const keys = { left: false, right: false }; // NÄPPÄIMET VASEN JA OIKEE

function StartGame()
{
    document.getElementById("logo").hidden = true; // PISTETÄÄ LOGO PIILOO
    document.getElementById("startBtn").hidden = true; // PISTETÄÄ ALOTUSNAPPI PIILOO
    document.getElementById("bins").hidden = false; // ROSKIKSET NÄKYVII
    tila = "playing"; // PISTETÄÄ PELI TILA PÄÄLLE

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

function GameLoop(aika) // PELI LOOPPI
{
    if (tila !== "playing") return; // JOS EI PELAA NII PALAA

    const time = (aika - lastTime) / 1000;
    lastTime = aika;

    const field = document.getElementById("playfield");

    if (keys.left) currentItem.x -= 450 * time; // LIIKUTTAA VASEN
    if (keys.right) currentItem.x += 450 * time; // LIIKUTTAA OIKEE
    currentItem.x = Math.max(0, Math.min(field.clientWidth - currentItem.objekti.clientWidth, currentItem.x));

    currentItem.y += 150 * time; // LIIKUTTAA ALASPÄIN
    PiirräItem();

    const lattia = document.getElementById("bins").getBoundingClientRect().top - field.getBoundingClientRect().top;

    if (currentItem.y + currentItem.objekti.offsetHeight >= lattia)
    {
        ResolveItem();
    }

    requestAnimationFrame(GameLoop);
}

function ResolveItem()
{
    const itemRect = currentItem.objekti.getBoundingClientRect();
    const keski = itemRect.left + itemRect.width / 2;

    for (const bin of document.querySelectorAll(".bin"))
    {
        const roskis = bin.getBoundingClientRect();
        const osuuAstiaan = keski >= roskis.left && keski <= roskis.right;

        if (osuuAstiaan && bin.dataset.tyyppi === currentItem.tyyppi)
        {
            AddScore();
        }
    }

    currentItem.objekti.remove();
    SpawnItem();
}

// ========== NÄPPÄIN TOIMINNOT ============
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft")  keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft")  keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
});

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
}