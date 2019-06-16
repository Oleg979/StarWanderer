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

  const near = planets.indexOf(planet) < 190;
  const planet1 = near ? planets[planets.indexOf(planet) + 5] : needPlanet;

  const [x, y] = getRandomCoordinates();
  const type = Math.floor(Math.random() * 3) + 1;
  if (type == 1)
    return {
      type,
      name: "Message to planet " + planet1.name,
      desc:
        "I need you to receive a very important message to our allies. Their city is located on planet " +
        "<span style='color:grey' class='record-title'>" +
        planet1.name +
        "</span>" +
        ". You can find this planet on <span style='color:grey' class='record-title'>X:" +
        planet1.cX +
        " Y:" +
        planet1.cY +
        "</span>. Do this as soon as possible! I will pay you when it's done.",
      reward: 500,
      from: planet,
      to: planet1
    };
  else if (type == 2)
    return {
      type,
      name: "Escort diplomatic ship to planet " + needPlanet.name,
      desc:
        "Our diplomatic ship is going to negotiations with our allies. But it is a very dangerouts travel and I want you to escort the ship. The destination point is located on planet " +
        "<span style='color:grey' class='record-title'>" +
        needPlanet.name +
        "</span>" +
        ". You can find this planet on <span style='color:grey' class='record-title'>X:" +
        needPlanet.cX +
        " Y:" +
        needPlanet.cY +
        "</span>. You'll get a great reward if you succeed.",
      reward: 500,
      from: planet,
      to: needPlanet
    };
  else if (type == 3)
    return {
      type,
      name: "Destroy the enemy ships",
      desc:
        "I need you to destroy the enemy fleet. They attack our trade ships and diplomatic missions. They hide on <span style='color:grey' class='record-title'>X:" +
        x +
        " Y:" +
        y +
        "</span>. You'll get a great reward after their death.",
      reward: 800,
      from: planet,
      to: [x, y]
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
    questTaken: false,
    race: GenName(),
    desc: GenDesc(),
    inventory: [
      {
        name: "Fuel",
        tag: "fuel",
        price: 100
      },
      {
        name: "Repair my ship",
        tag: "repair",
        price: 150
      },
      {
        name: "Teleport",
        tag: "teleport",
        price: "700"
      },
      {
        name: "Upgrade my ship to lvl 2",
        tag: "upgrade",
        price: 1000
      },
      {
        name: "Upgrade my ship to lvl 3",
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
  laserPath = "imgs/lasers/laser1.png";
  myShip.style.transition = "all 5s ease";
};

//Апгрейд корабля до уровня 2
const upgradeShipLvl2 = () => {
  myShip.src = "imgs/ships/ship2.png";
  laserPath = "imgs/lasers/laser2.png";
  myShip.style.transition = "all 3.5s ease";
};

//Апгрейд корабля до уровня 3
const upgradeShipLvl3 = () => {
  myShip.src = "imgs/ships/ship3.png";
  laserPath = "imgs/lasers/laser3.png";
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

  let names = [
    "Diplomatic ship",
    "Trade ship",
    "Prisoner ship",
    "Smuggler ship",
    "Guard ship",
    "Transport ship"
  ];
  ship.dataset.kind = names[Math.floor(Math.random() * names.length)];

  ship.style.transform =
    "rotate(" +
    (Math.floor(Math.random() * 4) + 1) * 90 +
    "deg) scale(" +
    (Math.random() + 1) +
    ")";
  let [x2, y2] = getRandomCoordinates();

  let flag = true;

  setTimeout(() => {
    ship.style.top = y2 + "px";
    ship.style.left = x2 + "px";
  }, 5000);

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

  let title =
    "<img class='face' src='imgs/icons/alien.png'><h1 class='record-title'>Planet " +
    planet.name +
    "</h1>";
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
    else if (e.target.classList.contains("repair")) repair();
    else if (e.target.classList.contains("upgrade")) {
      lostMoney(1000);
      upgradeShipLvl2();
    } else if (e.target.classList.contains("upgrade3")) {
      lostMoney(5000);
      upgradeShipLvl3();
    } else if (e.target.classList.contains("teleport")) {
      document.getElementById("teleport").style.display = "initial";
      lostMoney(700);
    }
  });

  document.getElementsByClassName("back")[0].onclick = () =>
    openPlanet(planet.id);
};

//Обновление индикатора топлива
const updateFuel = n => {
  if (n <= 0) {
    document.getElementsByClassName("loadScreen")[0].style.display = "initial";
    $(".loadScreen p").html("You are out of fuel. Restarting...");
    setTimeout(() => location.reload(), 5000);
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
  if (planet.questTaken) {
    let title =
      "<h1 class='record-title' style='margin-top: 120px'>We've already given you the mission!</h1>";
    let no = "<p class='answer back'>Ok, I got it</p>";
    dialogContent.innerHTML = title + no;
    document.getElementsByClassName("back")[0].onclick = () =>
      openPlanet(planet.id);
    return;
  }
  dialogContent.innerHTML = "";
  let title = "<h1 class='record-title'>" + planet.quest.name + "</h1>";
  let textQuest =
    "<h3 class='record-title quest'>" + planet.quest.desc + "</h3>";
  let yes = "<p class='answer yes'>Yes, I'll do it</p>";
  let no = "<p class='answer back'>No, I refuse</p>";
  dialogContent.innerHTML += title + textQuest + yes + no;

  document.getElementsByClassName("back")[0].onclick = () =>
    openPlanet(planet.id);

  document.getElementsByClassName("yes")[0].onclick = () => {
    if (!train.quest) {
      train.quest = true;
      $("#next").off();
      $("#train").css("display", "flex");
      $("#phrase").html(
        "Looks like you recevied your first mission! One advice: you don't need to fly so far to complete it. Instead, you can buy teleport, just go to the Trade panel on this planet."
      );
      $("#next").html("Ok, I understood.");
      $("#next").click(() => {
        $("#train").css("display", "none");
      });
    }

    planet.questTaken = true;
    if (planet.quest.type == 2) {
      let ship = document.createElement("img");
      ship.style.top = myShip.style.top;
      ship.style.left = myShip.style.left;

      ship.classList.add("escort");
      ship.src = getRandomShip();
      escortShip = ship;
      $(".game")[0].appendChild(ship);

      $(".escort").on({
        mouseenter: function() {
          let name = "<h4>Escort ship</h4>";
          hint.html(name);
          hint.show();
        },

        mouseleave: function() {
          hint.hide();
        },
        mousemove: function(e) {
          hint.css({
            top: e.pageY - 70,
            left: e.pageX,
            backgroundColor: "#aca6a6"
          });
        }
      });
    } else if (planet.quest.type == 3) {
      let ship = document.createElement("img");
      ship.style.top = planet.quest.to[1] + "px";
      ship.style.left = planet.quest.to[0] + "px";
      ship.dataset.hp = 100;
      const laserNum = Math.floor(Math.random() * 3) + 1;
      ship.classList.add("enemy");
      ship.src = getRandomShip();
      enemyShip = ship;
      $(".game")[0].appendChild(ship);

      let div = document.createElement("div");
      div.classList.add("enemyHp");
      div.innerHTML = "<div class='enemyHp-bar'></div>";
      $(".game")[0].appendChild(div);

      ship.onmouseover = e => {
        div.style.display = "unset";
        div.childNodes[0].style.width = ship.dataset.hp + "%";
      };
      ship.onmousemove = e => {
        div.style.display = "unset";
        div.childNodes[0].style.width = ship.dataset.hp + "%";
      };
      ship.onmouseout = e => {
        div.style.display = "none";
        div.childNodes[0].style.width = ship.dataset.hp + "%";
      };

      var interv3 = setInterval(() => {
        if (ship.dataset.hp > 0)
          div.childNodes[0].style.width = ship.dataset.hp + "%";
      }, 1);

      setInterval(() => {
        if (
          myShip.offsetTop <= ship.offsetTop + 500 &&
          myShip.offsetTop >= ship.offsetTop - 500 &&
          myShip.offsetLeft <= ship.offsetLeft + 500 &&
          myShip.offsetLeft >= ship.offsetLeft - 500
        ) {
          if (!train.battle) {
            train.battle = true;
            $("#next").off();
            $("#train").css("display", "flex");
            $("#phrase").html(
              "This is your first battle, so be careful! To shoot a blaster, hold down the CTRL button and click on the place where you want to shoot."
            );
            $("#next").html("Ok, I understood.");
            $("#next").click(() => {
              $("#train").css("display", "none");
            });
          }

          let laser = document.createElement("img");
          laser.src = `imgs/lasers/laser${laserNum}.png`;
          laser.classList.add("laser");
          laser.classList.add("x2");
          laser.style.transition = "none";
          laser.style.display = "unset";

          laser.style.top = ship.offsetTop + 40 + "px";
          laser.style.left = ship.offsetLeft + "px";
          laser.style.visibility = "visible";

          let hit = false;

          var dAx = 2 * ship.offsetLeft - ship.offsetLeft;
          var dAy = ship.offsetTop - ship.offsetTop;
          var dBx = myShip.offsetLeft - ship.offsetLeft;
          var dBy = myShip.offsetTop - ship.offsetTop;
          var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);

          var deg = angle * (180 / Math.PI);
          laser.style.transform = "rotate(" + deg + "deg)";

          $(".game")[0].appendChild(laser);
          document.querySelector("#laserSound2").pause();
          document.querySelector("#laserSound2").currentTime = 0;
          document.querySelector("#laserSound2").play();

          let interv, interv2;

          setTimeout(() => {
            laser.style.visibility = "hidden";
            laser.style.display = "none";
            $(".game")[0].removeChild(laser);
            clearInterval(interv);
            clearInterval(interv2);
          }, 1000);

          setTimeout(() => {
            laser.style.transition = "all 1s ease";
            laser.style.top = myShip.offsetTop + "px";
            laser.style.left = myShip.offsetLeft + "px";
            interv = setInterval(() => {
              if (
                laser &&
                !hit &&
                laser.offsetTop >= myShip.offsetTop - 50 &&
                laser.offsetLeft <= myShip.offsetLeft + 100 &&
                laser.offsetTop >= myShip.offsetTop - 5 &&
                laser.offsetLeft <= myShip.offsetLeft + 100
              ) {
                hit = true;
                updateHp(+hp.style.width.split("%")[0] - 1);
              } else {
              }
            }, 1);
          }, 5);
        }
      }, 250);

      interv2 = setInterval(() => {
        ship.style.top =
          Math.random() *
            (planet.quest.to[1] + 500 - (planet.quest.to[1] - 700)) +
          (planet.quest.to[1] - 500) +
          "px";
        ship.style.left =
          Math.random() *
            (planet.quest.to[0] + 500 - (planet.quest.to[0] - 700)) +
          (planet.quest.to[0] - 500) +
          "px";
      }, 4000);
    }

    let d = new Date();
    journal.push({
      time: d.getHours() + ":" + d.getMinutes(),
      text:
        "Recevied new quest from planet <span style='color:grey' class='record-title'>" +
        planet.name +
        "</span>: " +
        planet.quest.name +
        " with coords X:" +
        (planet.quest.to.cX || planet.quest.to[0]) +
        " Y:" +
        (planet.quest.to.cY || planet.quest.to[1])
    });
    updateJournal();
    quest = planet.quest;
    dialogNode.style.display = "none";

    if (planet.quest.type != 3) {
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
    }
  };
};

const openRewardPage = id => {
  if (quest == null) return;
  dialogContent.innerHTML = "";
  let title =
    "<h1 class='record-title' style='margin-top: 80px;'>Thank you for " +
    (quest.type == 1
      ? "receiveing the message"
      : quest.type == 2
      ? "escorting the ship"
      : "destroying the ships") +
    "! We have been waiting for you. Here is your reward:  <span style='color:grey' class='record-title'>" +
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
  if (quest.type == 2) $(".game")[0].removeChild(escortShip);
  escortShip = null;

  if (quest.type == 3)
    document.getElementsByClassName("back")[0].onclick = () => {
      dialogNode.style.display = "none";
      if (!train.win) {
        train.win = true;
        $("#next").off();
        $("#train").css("display", "flex");
        $("#phrase").html(
          "Look like you win your first battle. Congratulations! Now you should find the nearest planet, repair the ship and refuel."
        );
        $("#next").html("What then?");
        $("#next").click(() => {
          $("#phrase").html(
            "Then you may do whatever you want. Explore the galaxy, my friend!"
          );
          $("#next").html("Thank you.");
          $("#next").off();
          $("#next").click(() => {
            $("#train").css("display", "none");
          });
        });
      }
    };
  else
    document.getElementsByClassName("back")[0].onclick = () => openPlanet(id);

  quest = null;
};

const openMenu = () => {
  dialogNode.style.display = "flex";
  dialogContent.innerHTML = "";
  let name =
    "<p class='record-title author'>game by siltstrider</p><h1 class='record-title logo'>Star Wanderer</h1>";
  let title = "<h1 class='record-title'>Main Menu</h1>";
  let dialog =
    "<p class='answer save'>Save game</p>" +
    "<p class='answer load'>Load game</p>" +
    "<p class='answer sound'>On/Off sound</p>" +
    "<p class='answer exit'>Exit game</p>";
  dialogContent.innerHTML += name + title + dialog;

  document.getElementsByClassName("exit")[0].onclick = () => window.close();
  document.getElementsByClassName("sound")[0].onclick = () => {
    sound
      ? document.querySelector("#ambient").pause()
      : document.querySelector("#ambient").play();
    sound = !sound;
  };
  document.getElementsByClassName("save")[0].onclick = () => {
    let data = {
      fuel: fuel.style.width,
      top: myShip.style.top,
      left: myShip.style.left,
      money: money(),
      journal: journal
    };
    localStorage.setItem("data", JSON.stringify(data));
    alert("Game saved!");
  };
  document.getElementsByClassName("load")[0].onclick = () => {
    let data = JSON.parse(localStorage.getItem("data"));
    journal = data.journal;
    fuel.style.width = data.fuel;
    moneyNode.innerHTML = data.money + "$";
    myShip.style.transition = "none";
    document.documentElement.style.scrollBehavior = "auto";
    myShip.style.top = data.top;
    myShip.style.left = data.left;

    document.documentElement.scrollTop = data.top.split("px")[0];
    document.documentElement.scrollLeft = data.left.split("px")[0];

    document.documentElement.style.scrollBehavior = "smooth";

    myShip.style.transition = "all 5s ease";
    dialogNode.style.display = "none";
  };
};

const openTeleport = () => {
  teleportPanel.innerHTML = `
    <input type='number' class='record-title' placeholder='   X' min='0' max='45000'>
    <input type='number' class='record-title' placeholder='   Y' min='0' max='45000'>
    <p class='answer go'>Move</p>
  `;
  document.getElementsByClassName("go")[0].onclick = () => {
    const x = document.getElementsByTagName("input")[0].value;
    const y = document.getElementsByTagName("input")[1].value;
    if (x == "" || y == "" || !x || !y) return;
    teleportPanel.style.display = "none";
    myShip.style.transition = "none";
    document.getElementById("teleport").style.display = "none";
    document.documentElement.style.scrollBehavior = "auto";
    myShip.style.top = y + "px";
    myShip.style.left = x + "px";
    document.documentElement.scrollTop = y;
    document.documentElement.scrollLeft = x;
    document.documentElement.style.scrollBehavior = "smooth";
    myShip.style.transition = "all 5s ease";
  };
};

const updateHp = health => {
  if (health <= 0) {
    document.getElementsByClassName("loadScreen")[0].style.display = "initial";
    $(".loadScreen p").html("You are dead. Restarting...");
    setTimeout(() => location.reload(), 5000);
  }
  hp.style.backgroundColor = "#f63a0f";
  hp.style.width = health + "%";
};

const repair = () => {
  lostMoney(150);
  updateHp(100);
};

const genPirates = () => {
  for (let i = 0; i < 80; i++) pirates.push([...getRandomCoordinates(), false]);
};

const createPirate = (x, y) => {
  let ship = document.createElement("img");
  ship.style.top = x + "px";
  ship.style.left = y + "px";
  ship.dataset.hp = 100;
  const laserNum = Math.floor(Math.random() * 3) + 1;
  ship.classList.add("enemy");
  ship.src = getRandomShip();
  $(".game")[0].appendChild(ship);
  pirateNodes.push(ship);

  let div = document.createElement("div");
  div.classList.add("enemyHp");
  div.innerHTML = "<div class='enemyHp-bar'></div>";
  $(".game")[0].appendChild(div);

  ship.onmouseover = e => {
    div.style.display = "unset";
    div.childNodes[0].style.width = ship.dataset.hp + "%";
  };
  ship.onmousemove = e => {
    div.style.display = "unset";
    div.childNodes[0].style.width = ship.dataset.hp + "%";
  };
  ship.onmouseout = e => {
    div.style.display = "none";
    div.childNodes[0].style.width = ship.dataset.hp + "%";
  };

  var interv3 = setInterval(() => {
    div.childNodes[0].style.width = ship.dataset.hp + "%";
  }, 1);

  let inv = setInterval(() => {
    if (ship.dataset.hp <= 0) clearInterval(inv);
    if (
      ship.dataset.hp > 0 &&
      myShip.offsetTop <= ship.offsetTop + 1300 &&
      myShip.offsetTop >= ship.offsetTop - 1300 &&
      myShip.offsetLeft <= ship.offsetLeft + 1300 &&
      myShip.offsetLeft >= ship.offsetLeft - 1300
    ) {
      if (!train.battle) {
        train.battle = true;
        $("#next").off();
        $("#train").css("display", "flex");
        $("#phrase").html(
          "This is your first battle, so be careful! To shoot a blaster, hold down the CTRL button and click on the place where you want to shoot."
        );
        $("#next").html("Ok, I understood.");
        $("#next").click(() => {
          $("#train").css("display", "none");
        });
      }

      let laser = document.createElement("img");
      laser.src = `imgs/lasers/laser${laserNum}.png`;
      laser.classList.add("laser");
      laser.classList.add("x2");
      laser.style.transition = "none";
      laser.style.display = "unset";

      laser.style.top = ship.offsetTop + 40 + "px";
      laser.style.left = ship.offsetLeft + "px";
      laser.style.visibility = "visible";

      let hit = false;

      var dAx = 2 * ship.offsetLeft - ship.offsetLeft;
      var dAy = ship.offsetTop - ship.offsetTop;
      var dBx = myShip.offsetLeft - ship.offsetLeft;
      var dBy = myShip.offsetTop - ship.offsetTop;
      var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);

      var deg = angle * (180 / Math.PI);
      laser.style.transform = "rotate(" + deg + "deg)";

      $(".game")[0].appendChild(laser);
      document.querySelector("#laserSound2").pause();
      document.querySelector("#laserSound2").currentTime = 0;
      document.querySelector("#laserSound2").play();

      let interv, interv2;

      setTimeout(() => {
        laser.style.visibility = "hidden";
        laser.style.display = "none";
        $(".game")[0].removeChild(laser);
        clearInterval(interv);
        clearInterval(interv2);
      }, 1000);

      setTimeout(() => {
        laser.style.transition = "all 1s ease";
        laser.style.top = myShip.offsetTop + "px";
        laser.style.left = myShip.offsetLeft + "px";
        interv = setInterval(() => {
          if (
            laser &&
            !hit &&
            laser.offsetTop >= myShip.offsetTop - 50 &&
            laser.offsetLeft <= myShip.offsetLeft + 100 &&
            laser.offsetTop >= myShip.offsetTop - 5 &&
            laser.offsetLeft <= myShip.offsetLeft + 100
          ) {
            hit = true;
            updateHp(+hp.style.width.split("%")[0] - 1);
          } else {
          }
        }, 1);
      }, 5);
    }
  }, 350);

  interv2 = setInterval(() => {
    if (ship.dataset.hp <= 0) clearInterval(inv);
    ship.style.top = Math.random() * (y + 500 - (y - 700)) + (y - 500) + "px";
    ship.style.left = Math.random() * (x + 500 - (x - 700)) + (x - 500) + "px";
  }, 4000);
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
const hp = $(".health-bar")[0];
var escortShip = null;
var enemyShip = null;
const teleportPanel = $("#teleportPanel")[0];

var pirates = [];
var pirateNodes = [];

var train = {
  planet: false,
  quest: false,
  battle: false,
  win: false
};

let laserPath = "imgs/lasers/laser1.png";

let sound = true;
let firstTime = true;

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

window.intervals = [];
setInterval(() => {
  window.intervals.forEach(i => clearInterval(i));
  window.intervals = [];
}, 1000);
