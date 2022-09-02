class Hero {
  constructor({ img, name, hp, energy }) {
    this.img = img;
    this.name = name;
    this._hp = hp;
    this._energy = energy;
  }

  get hp() {
    return this._hp;
  }

  set hp(newHp) {
    this._hp = newHp;
  }

  get energy() {
    return this._hp;
  }

  set energy(newEnergy) {
    this._energy = newEnergy;
  }
}

export const warrior = new Hero({
  img: "./img/warrior.png",
  name: "warrior",
  hp: 15,
  energy: 5,
});

export const ranger = new Hero({
  img: "./img/ranger.png",
  name: "ranger",
  hp: 5,
  energy: 5,
});

export const heroesArr = [warrior, ranger];
export const heroesObj = { warrior, ranger };

export const heroesStr = heroesArr
  .map((element) => createStr(element))
  .join("");

function createStr(hero) {
  return `<div class="hero" id="${hero.name}">
            <img class="hero__avatar" src="${hero.img}" alt="${hero.name}" />
            <div class="hero__parametrs">
              <ul class="hero__list">
                <li class="hero__item_static">
                  <p>Class:</p>                
                </li>
                <li class="hero__item_static">
                  <p>HP:</p>                
                </li>
                <li class="hero__item_static">
                  <p>Energy:</p>                
                </li>
              </ul>
              <ul class="hero__list">
                <li class="hero__item_dinamic">                
                  <p>${hero.name}</p>
                </li>
                <li class="hero__item_dinamic">                
                  <p>${hero.hp}</p>
                </li>
                <li class="hero__item_dinamic">                
                  <p>${hero.energy}</p>
                </li>
              </ul>
            </div>
          </div>`;
}
