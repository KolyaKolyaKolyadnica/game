const ODD_ROW = 6;
const EVEN_ROW = 7;

const fieldTileTpl = '<div class="map__tile"></div>';
const forestTileTpl = '<div class="map__tile forest"></div>';
const heroPositionTpl = '<div class="map__tile hero-tile"></div>';
const bossPositionTpl = '<div class="map__tile boss"></div>';

function createRandomArr(arr, length) {
  let randomArr = ['<div class="map__row">'];
  for (let i = 0; i < length; i += 1) {
    if (Math.random() > 0.5) {
      randomArr.push(fieldTileTpl);
    } else {
      randomArr.push(forestTileTpl);
    }
  }
  randomArr.push("</div>");

  arr.push(randomArr);
}

function getUnitPosition(worldMapArr, unitTpl) {
  let rowCoord;
  if (heroCoordSpawnCoefArr[heroCoordSpawnCoefArr.length - 1] % 2 === 0) {
    rowCoord = getRandomIntInclusive(0, 1);
  } else {
    rowCoord = getRandomIntInclusive(3, 4);
  }

  let colCoord;
  rowCoord % 2 === 0
    ? (colCoord = getRandomIntInclusive(1, ODD_ROW))
    : (colCoord = getRandomIntInclusive(1, EVEN_ROW));

  heroCoordSpawnCoefArr[heroCoordSpawnCoefArr.length - 1] += 1;

  return (worldMapArr[rowCoord][colCoord] = unitTpl);
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

let heroCoordSpawnCoef = 0;
export const heroCoordSpawnCoefArr = [0];
export function createRandomWorldMapTpl() {
  let worldMapArr = [];

  for (let i = 0; i < 5; i += 1) {
    if (i % 2 === 0) {
      createRandomArr(worldMapArr, ODD_ROW);
    } else {
      createRandomArr(worldMapArr, EVEN_ROW);
    }
  }

  getUnitPosition(worldMapArr, heroPositionTpl);
  getUnitPosition(worldMapArr, bossPositionTpl);

  return worldMapArr.map((arr) => arr.join("")).join("");
}
