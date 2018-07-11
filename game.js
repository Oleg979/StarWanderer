//Двигать и поворчивать корабль при клике
document.onclick = e => {
  e.preventDefault();

  if (e.ctrlKey) {
    let x = e.pageX;
    let y = e.pageY;

    let laser = document.createElement("img");
    laser.src = "imgs/lasers/laser1.png";
    laser.classList.add("laser");
    laser.style.transition = "none";
    laser.style.display = "unset";

    laser.style.top = myShip.offsetTop + 40 + "px";
    laser.style.left = myShip.offsetLeft + "px";
    laser.style.visibility = "visible";

    updateFuel(+fuel.style.width.split("%")[0] - 0.3);

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

    setTimeout(() => {
      laser.style.visibility = "hidden";
      laser.style.display = "none";
      $(".game")[0].removeChild(laser);
    }, 1000);

    setTimeout(() => {
      laser.style.transition = "all 1s ease";
      laser.style.top = y + "px";
      laser.style.left = x + "px";
    }, 5);

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
    e.target.classList.contains("progress-bar") ||
    e.target.classList.contains("progress") ||
    e.target == document.getElementsByClassName("coords")[0]
  )
    return;

  if (!e.target.classList.contains("planet")) {
    dialogNode.style.display = "none";
  }

  journalNode.style.display = "none";

  document.querySelector("#ambient").play();

  let x = e.pageX;
  let y = e.pageY;

  updateFuel(+fuel.style.width.split("%")[0] - 0.2);

  myShip.style.top = y - 50 + "px";
  myShip.style.left = x - 50 + "px";

  if (
    +myShip.style.top.split("px")[0] >=
    document.documentElement.clientHeight +
      document.documentElement.scrollTop -
      250
  ) {
    document.documentElement.scrollTop += 250;
    myShip.style.top = +myShip.style.top.split("px")[0] + 100 + "px";
    myShip.style.transform = "rotate(" + 360 + "deg)";
  } else if (
    +myShip.style.top.split("px")[0] <=
    0 + document.documentElement.scrollTop + 150
  ) {
    document.documentElement.scrollTop -= 250;
    myShip.style.top = +myShip.style.top.split("px")[0] - 100 + "px";
    myShip.style.transform = "rotate(" + 180 + "deg)";
  } else if (
    +myShip.style.left.split("px")[0] >=
    document.documentElement.clientWidth +
      document.documentElement.scrollLeft -
      250
  ) {
    document.documentElement.scrollLeft += 250;
    myShip.style.left = +myShip.style.left.split("px")[0] + 100 + "px";
    myShip.style.transform = "rotate(" + 270 + "deg)";
  } else if (
    +myShip.style.left.split("px")[0] <=
    0 + document.documentElement.scrollLeft + 150
  ) {
    document.documentElement.scrollLeft -= 250;
    myShip.style.left = +myShip.style.left.split("px")[0] - 100 + "px";
    myShip.style.transform = "rotate(" + 90 + "deg)";
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

//Создать планеты и корабли
for (let i = 0; i < planetsCount; i++) {
  createPlanet();
  createShip();
}

planets.map(planet => (planet.quest = getRandomQuest(planet)));

//Инициализировать начальные значения
moneyNode.innerHTML = 1000 + "$";
updateFuel(100);
document.ondblclick = e => e.preventDefault();
close.onclick = () => (dialogNode.style.display = "none");

/////////////////////////////////////////////////////////////////////////////

//Операции с планетой
$(".planet").on({
  //Показать всплывающее окно над планетой
  mouseenter: function() {
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

/////////////////////////////////////////////////////////////////////////////

//Каждое мгновение обновлять координаты корабля
setInterval(() => {
  const [x, y] = getShipCoords();
  panelCoords.innerHTML = "X: " + x + "<br/>Y: " + y;
}, 1);

//Проскроллить наверх
document.onload = () => {
  document.documentElement.scrollTo(0);
  document.documentElement.scrollLeft = 0;
};

/////////////////////////////////////////////////////////////////////////////
