// import { create } from "handlebars";
import { heroesStr } from "./js/01-hero-class.js";
import {
  createRandomWorldMapTpl,
  heroCoordSpawnCoefArr,
} from "./js/02-create-map.js";

const refs = {
  menu: document.querySelector(".menu"),
  map: document.querySelector(".map"),
  arena: document.querySelector(".arena"),
  heroes: document.querySelector(".heroes"),
  // base: document.querySelector(".base"),
  gameOver: document.querySelector(".game-over"),
};
console.log(refs.gameOver);

let curHero;
let playerTop = null;
let playerLeft = null;
let timer;
let enemyOnMap;

openMenu();

function openMenu() {
  refs.menu.classList.add("active");
  refs.map.classList.remove("active");
  refs.arena.classList.remove("active");
  refs.heroes.innerHTML = heroesStr;

  const allHeroes = document.querySelectorAll(".hero").forEach((hero) => {
    hero.addEventListener("click", chooseHero);
  });
}

function chooseHero(e) {
  curHero = e.currentTarget.id;
  createNewWorldMap();
  createNewHero();
  openWorldMap();
}
function createNewHero() {
  refs.map.insertAdjacentHTML(
    "beforebegin",
    `<div class='player'><img class="player__avatar" src="./img/${curHero}.png" alt="${curHero}" /></div>`
  );

  const palyerOnMapEl = document.querySelector(".player");
  const palyerStartTileEl = document.querySelector(".hero-tile");

  playerTop = palyerStartTileEl.offsetTop + 18;
  playerLeft = palyerStartTileEl.offsetLeft + 18;

  palyerOnMapEl.style.transform = `translate(${playerLeft}px, ${playerTop}px)`;
}
function createNewWorldMap() {
  refs.map.innerHTML = `${createRandomWorldMapTpl()}`;

  console.log("Уровень - ", heroCoordSpawnCoefArr.length);
}
function openWorldMap() {
  refs.menu.classList.remove("active");
  refs.map.classList.add("active");
  refs.arena.classList.remove("active");

  document.addEventListener("keyup", getPlayerControlOnMap);
}

function getPlayerControlOnMap(e) {
  const palyerOnMapEl = document.querySelector(".player");

  if (e.code === "KeyW") {
    getPlayerMove(-52, -104, palyerOnMapEl);
  }
  if (e.code === "KeyE") {
    getPlayerMove(52, -104, palyerOnMapEl);
  }
  if (e.code === "KeyD") {
    getPlayerMove(104, 0, palyerOnMapEl);
  }
  if (e.code === "KeyX") {
    getPlayerMove(52, 104, palyerOnMapEl);
  }
  if (e.code === "KeyZ") {
    getPlayerMove(-52, 104, palyerOnMapEl);
  }
  if (e.code === "KeyA") {
    getPlayerMove(-104, 0, palyerOnMapEl);
  }
}
function getPlayerMove(x, y, palyerOnMapEl) {
  playerLeft += x;
  playerTop += y;

  palyerOnMapEl.style.transform = `translate(${playerLeft}px, ${playerTop}px)`;

  document.removeEventListener("keyup", getPlayerControlOnMap);
  setTimeout(openArena, 1500);
}
function openArena() {
  refs.menu.classList.remove("active");
  refs.map.classList.remove("active");
  refs.arena.classList.add("active");

  const palyerOnMapEl = document
    .querySelector(".player")
    .classList.add("hidden");

  pressStart();
}
function pressStart() {
  refs.arena.innerHTML = `<div class="base">Start!</div>`;
  refs.arena.addEventListener("click", getStartBattle);
}
function getStartBattle(e) {
  if (e.target.className !== "base") {
    return;
  }
  refs.arena.removeEventListener("click", getStartBattle);
  e.target.textContent = "";
  e.target.addEventListener("mouseout", getStartTimer);

  enemyOnMap = createEnemy().length;
}
function getStartTimer(e) {
  timer = setTimeout(() => {
    gameOver();
    console.log("You loose!");
  }, 1000);

  e.target.addEventListener("mouseover", getStopTimer);
}
function getStopTimer() {
  clearTimeout(timer);
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
function createEnemy() {
  const numberOfEnemies = getRandomIntInclusive(3, 5);

  for (let i = 0; i < numberOfEnemies; i += 1) {
    refs.arena.insertAdjacentHTML("beforeend", `<div class="enemy"></div>`);
  }

  const enemyArr = document.querySelectorAll(".enemy");

  enemyArr.forEach((el) => {
    const coordinates = getCoordAroundBase(30, 65);

    el.style.position = "absolute";
    el.style.top = `${coordinates.top}%`;
    el.style.left = `${coordinates.left}%`;

    el.addEventListener("click", destroyEnemy);
  });

  return enemyArr;
}
function destroyEnemy(e) {
  e.target.style.display = "none";
  enemyOnMap -= 1;

  if (enemyOnMap === 0) {
    clearTimeout(timer);
    openWorldMap();
    const palyerOnMapEl = document
      .querySelector(".player")
      .classList.remove("hidden");
    refs.arena.innerHTML = "";
  }
}
function getCoordAroundBase(baseLocationStart, baseLocationEnd) {
  let top = getRandomIntInclusive(5, 90);
  let left = getRandomIntInclusive(5, 90);

  if (
    top > baseLocationStart &&
    top < baseLocationEnd &&
    left > baseLocationStart &&
    left < baseLocationEnd
  ) {
    return getCoordAroundBase(baseLocationStart, baseLocationEnd);
  }

  return { top, left };
}
function gameOver() {
  refs.gameOver.classList.remove("hidden");
  document.addEventListener("click", startNewGame);
}
function startNewGame() {
  document.location.reload();
}
