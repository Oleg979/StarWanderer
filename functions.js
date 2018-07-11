//Получить рандомную картинку планеты
const getRandomPlanet = () =>
  "imgs/planets/planet" + (Math.floor(Math.random() * 40) + 1) + ".png";

//Получить рандомную картинку корабля
const getRandomShip = () =>
  "imgs/ships/ship" + (Math.floor(Math.random() * 10) + 1) + ".png";

//Получить рандомный квест
const getRandomQuest = planet => {
  const needPlanet =
    planets[Math.floor(Math.random() * (planets.length - 1)) + 1];
  return {
    name: "Message to planet " + needPlanet.name,
    desc:
      "I need you to receive a very important message to our allies. Their city is located on planet " +
      "<span style='color:grey' class='record-title'>" +
      needPlanet.name +
      "</span>" +
      ". You can find this planet on <span style='color:grey' class='record-title'>X:" +
      needPlanet.cX +
      " Y:" +
      needPlanet.cY +
      "</span>. Do this as soon as possible! I will pay you when it's done.",
    reward: 500,
    from: planet,
    to: needPlanet
  };
};

// Получить рандомные координаты
const getRandomCoordinates = () => [
  Math.floor(Math.random() * (getWindowWidth() + 1)),
  Math.floor(Math.random() * (getWindowHeight() + 1))
];

//Создать планету и поместить на карту
const createPlanet = () => {
  let planet = document.createElement("img");

  let [x, y] = getRandomCoordinates();
  planet.style.top = y + "px";
  planet.style.left = x + "px";

  planet.classList.add("planet");
  planet.alt = namegen(1)[0];
  planet.dataset.id = planets.length;

  let img = Math.floor(Math.random() * 37) + 1;
  let rand;
  if (img <= 29) rand = Math.random() * 10 + 1;
  else rand = Math.random() * 3 + 1;
  planet.src = "imgs/planets/planet" + img + ".png";
  planet.style.transform = "scale(" + rand + ")";

  $(".game")[0].appendChild(planet);

  // Записать в массив планет
  planets.push({
    id: planet.dataset.id,
    name: planet.alt,
    y: planet.style.top,
    x: planet.style.left,
    cX: planet.offsetLeft,
    cY: planet.offsetTop,
    quest: null,
    race: GenName(),
    desc: GenDesc(),
    inventory: [
      {
        name: "Fuel",
        tag: "fuel",
        price: 100
      },
      {
        name: "Upgrade your ship to lvl 2",
        tag: "upgrade",
        price: 1000
      },
      {
        name: "Upgrade your ship to lvl 3",
        tag: "upgrade3",
        price: 5000
      }
    ],
    img: planet.src,
    explored: false
  });
};

//Апгрейд корабля до уровня 1
const upgradeShipLvl1 = () => {
  myShip.src = "imgs/ships/ship1.png";
  myShip.style.transition = "all 5s ease";
};

//Апгрейд корабля до уровня 2
const upgradeShipLvl2 = () => {
  myShip.src = "imgs/ships/ship2.png";
  myShip.style.transition = "all 3.5s ease";
};

//Апгрейд корабля до уровня 3
const upgradeShipLvl3 = () => {
  myShip.src = "imgs/ships/ship3.png";
  myShip.style.transition = "all 2s ease";
};

//Координаты корабля
const getShipCoords = () => [myShip.offsetLeft, myShip.offsetTop];

//Исследовать планету
const explore = planet => {
  planets.find(p => p.id == planet.dataset.id).explored = true;
  let d = new Date();
  journal.push({
    time: d.getHours() + ":" + d.getMinutes(),
    text:
      "Explored planet <span style='color:grey' class='record-title'>" +
      planet.alt +
      "</span> with coords X:" +
      planet.offsetLeft +
      " Y:" +
      planet.offsetTop
  });
  updateJournal();
};

//Исследована ли планета
const isExplored = id => planets.find(p => p.id == id).explored;

//Получить записи журнала
const getJournalLog = () =>
  journal.map(
    record =>
      "<p class='record'><b>" + record.time + "</b> " + record.text + "</p>"
  );

//Обновить журнал
const updateJournal = () => {
  journalNode.innerHTML = "";
  if (!journal.length)
    journalNode.innerHTML +=
      "<p style='color:grey; text-align: center'>Journal is empty</p>";
  getJournalLog().map(log => (journalNode.innerHTML += log));
  journalNode.scrollTop = journalNode.scrollHeight;
};

//Создать корабль
const createShip = () => {
  let ship = document.createElement("img");
  let [x1, y1] = getRandomCoordinates();
  ship.style.top = y1 + "px";
  ship.style.left = x1 + "px";

  ship.style.transform =
    "rotate(" +
    (Math.floor(Math.random() * 4) + 1) * 90 +
    "deg) scale(" +
    (Math.random() + 1) +
    ")";
  let [x2, y2] = getRandomCoordinates();

  let flag = false;

  //Асинхронно запустить корабль летать из точки в точку
  setInterval(() => {
    if (flag) {
      ship.style.top = y1 + "px";
      ship.style.left = x1 + "px";
    } else {
      ship.style.top = y2 + "px";
      ship.style.left = x2 + "px";
    }
    flag = !flag;
  }, 60000);

  ship.classList.add("ship");
  ship.src = getRandomShip();
  $(".game")[0].appendChild(ship);
};

//Открыть главную страницу планеты
const openPlanet = id => {
  const planet = planets.find(p => p.id == id);

  dialogContent.innerHTML = "";
  let title = "<h1 class='record-title'>Planet " + planet.name + "</h1>";
  let race =
    "<h3 class='record-title'>Hello, stranger! The nation of <span class='record-title' style='color:grey'>" +
    planet.race +
    "</span> greets you! What do you want?</h3>";
  let dialog =
    "<p class='answer trade'>I want to trade</p>" +
    "<p class='answer ask'>Tell me about your race</p>" +
    "<p class='answer quest'>Do you have a mission for me?</p>" +
    "<p class='answer quit'>Goodbye</p>";
  dialogContent.innerHTML += title + race + dialog;

  document.getElementsByClassName("ask")[0].onclick = () =>
    openAboutPage(planet);

  document.getElementsByClassName("trade")[0].onclick = () =>
    openTradePage(planet);

  document.getElementsByClassName("quest")[0].onclick = () =>
    openQuestPage(planet);

  document.getElementsByClassName("quit")[0].onclick = () =>
    (dialogNode.style.display = "none");
};

//Открыть страницу описания
const openAboutPage = planet => {
  dialogContent.innerHTML = "";
  let desc = "<h3 class='record-title about'>" + planet.desc + "</h3>";
  let dialog = "<p class='answer back'>Ok, I got it</p>";
  dialogContent.innerHTML += desc + dialog;

  document.getElementsByClassName("back")[0].onclick = () =>
    openPlanet(planet.id);
};

//Открыть страницу торговли
const openTradePage = planet => {
  dialogContent.innerHTML =
    `<div class='barter record-title'>
    <div class='buy record-title'>
    <h1 class='record-title offer'>What do you want to buy?</h1>` +
    (planet.inventory.length
      ? planet.inventory
          .map(
            item =>
              "<h3 class='record-title item " +
              item.tag +
              "'>" +
              item.name +
              " - <span style='color:grey'  class='record-title'>" +
              item.price +
              "</span></h3>"
          )
          .join("")
      : "<h2  class='record-title'>There is nothing to buy</h2>") +
    `</div>
  </div>
  <p class='answer back record-title'>It's all, thank you</p>`;

  $(".item").dblclick(e => {
    e.preventDefault();

    if (+e.target.innerText.split("- ")[1] > money()) {
      $(".offer").html("You don't have enough money for that!");
      return;
    }

    $(".offer").html("That's a good deal!");

    if (e.target.classList.contains("fuel")) buyFuel();
    else if (e.target.classList.contains("upgrade")) {
      lostMoney(1000);
      upgradeShipLvl2();
    } else if (e.target.classList.contains("upgrade3")) {
      lostMoney(5000);
      upgradeShipLvl3();
    }
  });

  document.getElementsByClassName("back")[0].onclick = () =>
    openPlanet(planet.id);
};

//Обновление индикатора топлива
const updateFuel = n => {
  if (n <= 0) {
    alert("Fuel is empty. You are dead.");
    location.reload();
  }

  fuel.style.width = n + "%";

  if (n > 0 && n <= 5) fuel.style.backgroundColor = "#f63a0f";
  else if (n > 5 && n <= 25) fuel.style.backgroundColor = "#f27011";
  else if (n > 25 && n <= 50) fuel.style.backgroundColor = "#f2b01e";
  else if (n > 50 && n <= 75) fuel.style.backgroundColor = "#f2d31b";
  else if (n > 75 && n <= 100) fuel.style.backgroundColor = "#86e01e";
};

//Купить топливо
const buyFuel = () => {
  lostMoney(100);
  updateFuel(100);
};

//Минус деньги
const lostMoney = sum => {
  moneyNode.classList.add("lostMoney");
  moneyNode.innerHTML = money() - sum + "$";
  setTimeout(() => moneyNode.classList.remove("lostMoney"), 500);
};

//Плюс деньги
const getMoney = sum => {
  moneyNode.classList.add("getMoney");
  moneyNode.innerHTML = +moneyNode.innerHTML.split("$")[0] + sum + "$";
  setTimeout(() => moneyNode.classList.remove("getMoney"), 500);
};

//Получить текущую сумму денег
const money = () => +moneyNode.innerHTML.split("$")[0];

//Открыть страницу квеста
const openQuestPage = planet => {
  dialogContent.innerHTML = "";
  let title = "<h1 class='record-title'>" + planet.quest.name + "</h1>";
  let textQuest =
    "<h3 class='record-title quest'>" + planet.quest.desc + "</h3>";
  let yes = "<p class='answer yes'>Yes, i'll do it</p>";
  let no = "<p class='answer back'>No, I refuse</p>";
  dialogContent.innerHTML += title + textQuest + yes + no;

  document.getElementsByClassName("back")[0].onclick = () =>
    openPlanet(planet.id);

  document.getElementsByClassName("yes")[0].onclick = () => {
    let d = new Date();
    journal.push({
      time: d.getHours() + ":" + d.getMinutes(),
      text:
        "Recevied new quest from planet <span style='color:grey' class='record-title'>" +
        planet.name +
        "</span>: " +
        planet.quest.name +
        " with coords X:" +
        planet.quest.to.cX +
        " Y:" +
        planet.quest.to.cY
    });
    updateJournal();
    quest = planet.quest;
    dialogNode.style.display = "none";

    $(`.planet[data-id=${planet.quest.to.id}]`).dblclick(e => {
      hint.hide();
      dialogNode.style.display = "flex";

      openRewardPage(e.target.dataset.id);

      $(`.planet[data-id=${planet.quest.to.id}]`).off("dblclick");
      $(`.planet[data-id=${planet.quest.to.id}]`).dblclick(e => {
        //Скрыть подсказку, показать диалог
        hint.hide();
        dialogNode.style.display = "flex";

        //Вывести информацию о планете
        openPlanet(e.target.dataset.id);

        //Если планета ещё не исследована
        if (!isExplored(e.target.dataset.id)) {
          //Исследовать её
          explore(this);
        }
      });
    });
  };
};

const openRewardPage = id => {
  dialogContent.innerHTML = "";
  let title =
    "<h1 class='record-title' style='margin-top: 80px;'>Thank you for receiveing the message! We have been waiting for you. Here is your reward:  <span style='color:grey' class='record-title'>" +
    quest.reward +
    "$</span></h1>";
  let no = "<p class='answer back'>Thank you and goodbye</p>";
  dialogContent.innerHTML = title + no;
  getMoney(quest.reward);
  let d = new Date();
  journal.push({
    time: d.getHours() + ":" + d.getMinutes(),
    text:
      "Comleted quest and got <span style='color:grey' class='record-title'>" +
      quest.reward +
      "$</span>"
  });
  updateJournal();
  quest = null;
  document.getElementsByClassName("back")[0].onclick = () => openPlanet(id);
};

/////////////////////////////////////////////////////////////////////////////

//Всего планет
const planetsCount = 200;
//Всего кораблей
const shipsCount = 200;

//Ссылки на элементы
const hint = $("#hint");
const myShip = $("#myShip")[0];
const panelCoords = $(".coords")[0];
const planetNodes = () => $(".planet");
const journalNode = $("#journal")[0];
const openJournal = $(".openJournal")[0];
const dialogNode = $("#dialog")[0];
const dialogContent = $(".content")[0];
const close = $(".close")[0];
const moneyNode = $(".money")[0];
const fuel = $(".progress-bar")[0];
//const laser = $("#myLaser")[0];

//Размеры окна
const getWindowWidth = () => 45000;
const getWindowHeight = () => 45000;

//Массив планет
var planets = [];
var journal = [];
var quest = null;

/////////////////////////////////////////////////////////////////////////////

//Запретить скролл страницы
document.onmousewheel = document.onwheel = e => {
  if (
    e.target == document.documentElement ||
    (e.deltaY <= 0 && journalNode.scrollTop == 0) ||
    (e.deltaY >= 0 &&
      journalNode.clientHeight + journalNode.scrollTop ==
        journalNode.scrollHeight)
  )
    return false;
};
