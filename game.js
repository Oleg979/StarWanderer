document.onkeypress = e => {
  if (
    document.activeElement == document.getElementsByTagName("input")[0] ||
    document.activeElement == document.getElementsByTagName("input")[1]
  )
    return;
  e.preventDefault();
  if (e.which == 32) openMenu();
};
//Двигать и поворчивать корабль при клике
document.onclick = e => {
  e.preventDefault();

  if (e.ctrlKey) {
    let x = e.pageX;
    let y = e.pageY;

    let laser = document.createElement("img");
    laser.src = laserPath;
    laser.classList.add("laser");
    laser.style.transition = "none";
    laser.style.display = "unset";

    laser.style.top = myShip.offsetTop + 40 + "px";
    laser.style.left = myShip.offsetLeft + "px";
    laser.style.visibility = "visible";

    updateFuel(+fuel.style.width.split("%")[0] - 0.5);

    var dAx = 2 * myShip.offsetLeft - myShip.offsetLeft;
    var dAy = myShip.offsetTop - myShip.offsetTop;
    var dBx = x - myShip.offsetLeft;
    var dBy = y - myShip.offsetTop;
    var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);

    var deg = angle * (180 / Math.PI);
    laser.style.transform = "rotate(" + deg + "deg)";

    $(".game")[0].appendChild(laser);
    document.querySelector("#laserSound").pause();
    document.querySelector("#laserSound").currentTime = 0;
    document.querySelector("#laserSound").play();

    let hit = false;
    let interv;

    setTimeout(() => {
      laser.style.visibility = "hidden";
      laser.style.display = "none";
      $(".game")[0].removeChild(laser);
      clearInterval(interv);
    }, 1000);

    setTimeout(() => {
      laser.style.transition = "all 1s ease";
      laser.style.top = y + "px";
      laser.style.left = x + "px";

      interv = setInterval(() => {
        if (
          enemyShip &&
          laser &&
          !hit &&
          laser.offsetLeft >= enemyShip.offsetLeft - 50 &&
          laser.offsetLeft <= enemyShip.offsetLeft + 100 &&
          laser.offsetTop >= enemyShip.offsetTop - 5 &&
          laser.offsetTop <= enemyShip.offsetTop + 100
        ) {
          hit = true;
          enemyShip.dataset.hp = +enemyShip.dataset.hp - 5;
          if (enemyShip.dataset.hp <= 0) {
            setTimeout(() => {
              enemyShip.src = "imgs/explosions/exp1.png";
              document.querySelector("#explosionSound").pause();
              document.querySelector("#explosionSound").currentTime = 0;
              document.querySelector("#explosionSound").play();
              enemyShip.style.transition = "all 4s ease";
              enemyShip.classList.add("destroy");
              $(".enemyHp").css("display", "none");
              clearInterval(interv);
            }, 500);
            setTimeout(() => {
              if (
                enemyShip &&
                enemyShip.parentNode ==
                  document.getElementsByClassName("game")[0]
              )
                $(".game")[0].removeChild(enemyShip);
              enemyShip = null;
              dialogNode.style.display = "flex";
              openRewardPage();
              $(".enemyHp").css("display", "none");
            }, 2500);
          }
        }
      }, 1);

      window.intervals.push(interv);

      pirateNodes.forEach(pirate => {
        let inv = setInterval(() => {
          if (
            pirate.dataset.hp > 0 &&
            laser &&
            !hit &&
            laser.offsetLeft >= pirate.offsetLeft - 50 &&
            laser.offsetLeft <= pirate.offsetLeft + 100 &&
            laser.offsetTop >= pirate.offsetTop - 5 &&
            laser.offsetTop <= pirate.offsetTop + 100
          ) {
            hit = true;
            pirate.dataset.hp = +pirate.dataset.hp - 10;
            if (pirate.dataset.hp <= 0 && pirate) {
              dead = true;
              setTimeout(() => {
                pirate.src = "imgs/explosions/exp1.png";
                document.querySelector("#explosionSound").pause();
                document.querySelector("#explosionSound").currentTime = 0;
                document.querySelector("#explosionSound").play();
                pirate.style.transition = "all 4s ease";
                pirate.classList.add("destroy");
                pirateNodes = pirateNodes.filter(p => p.dataset.hp > 0);
                $(".enemyHp").css("display", "none");
                clearInterval(inv);
              }, 500);
              setTimeout(() => {
                if (
                  pirate.parentNode ==
                  document.getElementsByClassName("game")[0]
                ) {
                  getMoney(100);
                  $(".game")[0].removeChild(pirate);
                }

                $(".enemyHp").css("display", "none");
              }, 2500);
            }
          }
        }, 1);
        window.intervals.push(inv);
      });
    }, 5);

    ////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////

    return;
  }
  if (
    e.target == document.getElementsByClassName("panel")[0] ||
    e.target == document.getElementsByClassName("openJournal")[0] ||
    e.target == document.getElementsByClassName("close")[0] ||
    e.target == document.getElementById("journal") ||
    e.target == document.getElementById("dialog") ||
    e.target.classList.contains("record") ||
    e.target.classList.contains("record-title") ||
    e.target.classList.contains("content") ||
    e.target.classList.contains("answer") ||
    e.target.classList.contains("money") ||
    e.target.classList.contains("right") ||
    e.target.classList.contains("progress-bar") ||
    e.target.classList.contains("progress") ||
    e.target.classList.contains("health") ||
    e.target.classList.contains("health-bar") ||
    e.target.classList.contains("face") ||
    e.target == document.getElementById("teleport") ||
    e.target == document.getElementById("teleportPanel") ||
    e.target == document.getElementById("next") ||
    e.target == document.getElementById("train") ||
    e.target == document.getElementById("phrase") ||
    e.target == document.getElementById("tr1") ||
    e.target == document.getElementById("tr2") ||
    e.target == document.getElementsByClassName("coords")[0]
  )
    return;

  if (!e.target.classList.contains("planet")) {
    dialogNode.style.display = "none";
  }

  journalNode.style.display = "none";
  teleportPanel.style.display = "none";

  firstTime ? document.querySelector("#ambient").play() : null;
  firstTime = false;

  let x = e.pageX;
  let y = e.pageY;

  updateFuel(+fuel.style.width.split("%")[0] - 0.2);

  myShip.style.top = y - 50 + "px";
  myShip.style.left = x - 50 + "px";

  if (escortShip) {
    escortShip.style.top = myShip.offsetTop - 100 + "px";
    escortShip.style.left = myShip.offsetLeft - 100 + "px";
  }

  if (
    +myShip.style.top.split("px")[0] >=
    document.documentElement.clientHeight +
      document.documentElement.scrollTop -
      250
  ) {
    document.documentElement.scrollTop += 250;
    myShip.style.top = +myShip.style.top.split("px")[0] + 100 + "px";
    myShip.style.transform = "rotate(" + 360 + "deg)";
    if (escortShip) {
      escortShip.style.top = +escortShip.style.top.split("px")[0] + 100 + "px";
      escortShip.style.transform = "rotate(" + 360 + "deg)";
    }
  } else if (
    +myShip.style.top.split("px")[0] <=
    0 + document.documentElement.scrollTop + 150
  ) {
    document.documentElement.scrollTop -= 250;
    myShip.style.top = +myShip.style.top.split("px")[0] - 100 + "px";
    myShip.style.transform = "rotate(" + 180 + "deg)";
    if (escortShip) {
      escortShip.style.top = +escortShip.style.top.split("px")[0] - 100 + "px";
      escortShip.style.transform = "rotate(" + 180 + "deg)";
    }
  } else if (
    +myShip.style.left.split("px")[0] >=
    document.documentElement.clientWidth +
      document.documentElement.scrollLeft -
      250
  ) {
    document.documentElement.scrollLeft += 250;
    myShip.style.left = +myShip.style.left.split("px")[0] + 100 + "px";
    myShip.style.transform = "rotate(" + 270 + "deg)";
    if (escortShip) {
      escortShip.style.top = +escortShip.style.top.split("px")[0] + 100 + "px";
      escortShip.style.transform = "rotate(" + 270 + "deg)";
    }
  } else if (
    +myShip.style.left.split("px")[0] <=
    0 + document.documentElement.scrollLeft + 150
  ) {
    document.documentElement.scrollLeft -= 250;
    myShip.style.left = +myShip.style.left.split("px")[0] - 100 + "px";
    myShip.style.transform = "rotate(" + 90 + "deg)";
    if (escortShip) {
      escortShip.style.top = +escortShip.style.top.split("px")[0] - 100 + "px";
      escortShip.style.transform = "rotate(" + 90 + "deg)";
    }
  }
};

//Открыть журнал
openJournal.onclick = e => {
  journalNode.style.display =
    journalNode.style.display == "flex" ? "none" : "flex";
  journalNode.scrollTop = journalNode.scrollHeight;
  updateJournal();
};

/////////////////////////////////////////////////////////////////////////////

genPirates();

//Создать планеты и корабли
for (let i = 0; i < planetsCount; i++) {
  createPlanet();
  createShip();
}

planets.sort(
  (a, b) =>
    Math.sqrt(a.cX * a.cX + a.cY * a.cY) - Math.sqrt(b.cX * b.cX + b.cY * b.cY)
);

planets.forEach(planet => (planet.quest = getRandomQuest(planet)));

//Инициализировать начальные значения
moneyNode.innerHTML = 1500 + "$";
updateFuel(100);
updateHp(100);
document.ondblclick = e => e.preventDefault();
close.onclick = () => (dialogNode.style.display = "none");

/////////////////////////////////////////////////////////////////////////////

//Операции с планетой
$(".planet").on({
  //Показать всплывающее окно над планетой
  mouseenter: function() {
    if (!train.planet) {
      train.planet = true;
      $("#next").off();
      $("#train").css("display", "flex");
      $("#phrase").html(
        "Hey again, Captain! You've just discovered a new planet. My radars show it is inhabited by race of aliens. You should double click on this planet to start dialog with them!"
      );
      $("#next").html("What should I ask them?");
      $("#next").click(() => {
        $("#phrase").html(
          "I think you should learn more about their race. Also you can trade with them and ask for a mission."
        );
        $("#next").html("Ok, I'll do it.");
        $("#next").off();
        $("#next").click(() => {
          $("#train").css("display", "none");
        });
      });
    }

    let name = "<h3>" + this.alt + "</h3>";
    let desc =
      "<p>" +
      (isExplored(this.dataset.id) ? "Explored" : "Unexplored") +
      " planet</p>";
    hint.html(name + desc);
    hint.show();
  },
  //Убрать всплывающее окно
  mouseleave: function() {
    hint.hide();
  },
  //Сохранять окно при движении мыши
  mousemove: function(e) {
    hint.css({
      top: e.pageY,
      left: e.pageX + 20,
      backgroundColor: !isExplored(this.dataset.id) ? "#217eca" : "#aca6a6"
    });
  },
  //При клике на планету
  dblclick: function(e) {
    //Скрыть подсказку, показать диалог
    hint.hide();
    dialogNode.style.display = "flex";

    //Вывести информацию о планете
    openPlanet(this.dataset.id);

    //Если планета ещё не исследована
    if (!isExplored(this.dataset.id)) {
      //Исследовать её
      explore(this);
    }
  }
});

//Подсказка при наведении на деньги
$(".money").on({
  mouseenter: function() {
    let name = "<h4>Your money</h4>";
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

//Подсказка при наведении на панель топлива
$(".progress").on({
  mouseenter: function() {
    let name = "<h4>Your fuel: " + fuel.style.width + "</h4>";
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

$(".health").on({
  mouseenter: function() {
    let name = "<h4>Your health: " + hp.style.width + "</h4>";
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

$(".coords").on({
  mouseenter: function() {
    let name = "<h4>Your coords</h4>";
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

$("#teleport").on({
  click: function() {
    teleportPanel.style.display =
      teleportPanel.style.display == "flex" ? "none" : "flex";
    openTeleport();
  }
});

$(".ship").on({
  mouseenter: function() {
    let name = "<h4>" + this.dataset.kind + "</h4>";
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

/////////////////////////////////////////////////////////////////////////////

//Каждое мгновение обновлять координаты корабля
setInterval(() => {
  const [x, y] = getShipCoords();
  pirates.forEach(p => {
    if (
      !p[2] &&
      myShip.offsetTop <= p[1] + 1000 &&
      myShip.offsetTop >= p[1] - 1000 &&
      myShip.offsetLeft <= p[0] + 1000 &&
      myShip.offsetLeft >= p[0] - 1000
    ) {
      console.log("pirate!");
      p[2] = true;
      createPirate(p[0], p[1]);
    }
  });
  panelCoords.innerHTML = "X: " + x + "<br/>Y: " + y;
}, 1);

//Проскроллить наверх
$(document).ready(() => {
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
    document.documentElement.style.scrollBehavior = "smooth";
    document.getElementsByClassName("loadScreen")[0].style.display = "none";
  }, 5000);
});

/////////////////////////////////////////////////////////////////////////////

let pl = planets[0];

$("#phrase").html(
  "Hey, Captain! Can you hear me? You've been sent here to explore this remoted part of galaxy. Your mission is to find inhabited planets and speak to its residents."
);
$("#next").html("Understood. How can I move my ship?");
$("#train").css("display", "flex");

$("#next").click(() => {
  $("#phrase").html(
    "You can just click your left mouse button! Then your ship will move directly to this place. But remember: you have limited quantity of fuel. So you need to refuel from time to time."
  );
  $("#next").html("I got it. Where should I begin?");
  $("#next").off();
  $("#next").click(() => {
    $("#phrase").html(
      "My radars show that nearest planet is called " +
        pl.name +
        ". It's located on X: " +
        pl.cX +
        " Y: " +
        pl.cY +
        ". I think you should start there!"
    );
    $("#next").html("Thank you, I'm on my way.");
    $("#next").off();
    $("#next").click(() => {
      $("#train").css("display", "none");
    });
  });
});
