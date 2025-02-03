let buffer;

let textDrawers = [];

let logoBW, logoColor, tpgImg, ctImg, dots;

let characterObj;
let characterArray = [];
let dataLoaded = false;

let tournamentInfo = {
  object: undefined,
  tournament: "tpg",
  game: "ultimate",
  date: "2025-01-31",
};

let generateBt, saveBt;

let bodyFt, numberFt, prefixFt;

let playerDataArray = [];

function preload() {
  characterObj = loadJSON("top8-gen/characters.json", handleData);
  
  logoBW = loadImage("top8-gen/images/logoBW.png");
  logoColor = loadImage("top8-gen/images/logoColor.png");
  tpgImg = loadImage("top8-gen/images/tpg.png");
  ctImg = loadImage("top8-gen/images/ct.png");
  dots = loadImage("top8-gen/images/dots.png");
  
  bodyFt = loadFont("top8-gen/fonts/XHeighting-RIT.ttf");
  numberFt = loadFont("top8-gen/fonts/karnakpro-condensedblack.ttf");
  prefixFt = loadFont("top8-gen/fonts/acumin-pro-extra-condensed-light-italic.otf");
  
}

function setup() {
  createCanvas(792, 792);
  
  saveBt = createButton("Save Image");
  saveBt.size(300);
  saveBt.mousePressed(saveImage);
  
  buffer = createGraphics(792 * 3, 792 * 3);
  buffer.angleMode(DEGREES);
  
}

function draw() {
  buffer.background(255);
  if (dataLoaded) {
    tournamentInfo.object.update();
    
    
    //color field
    let bgColor;
    let bigSpacing = "";
    
    switch (tournamentInfo.game) {
        case "ultimate":
          bgColor = "#f79421";
          bigSpacing = " ";
          break;
        case "melee":
          bgColor = "#f37436";
          break;
        case "64":
          bgColor = "#fcb636";
          break;
        default:
          bgColor = "#f79421";
        bigSpacing = " ";
          break;
      }
    
    buffer.fill(bgColor);
    buffer.noStroke();
    buffer.rect(60, 60, (792 - 40) * 3, (792 - 60) * 3);
    
    buffer.image(dots, 0, 0)

    //big text
    
    buffer.push();
    buffer.translate(265, 260);
    buffer.rotate(-90);
    
    
    buffer.textFont(bodyFt);
    buffer.textSize(450);
    buffer.textAlign(RIGHT, CENTER);
    buffer.noFill();
    buffer.stroke(0);
    buffer.strokeWeight(3);
    buffer.text(tournamentInfo.game + bigSpacing, 0, 0);
    
    buffer.rotate(90);
    
    buffer.pop();
    
    //black borders
    buffer.fill(0);
    buffer.noStroke();
    buffer.rect(60, 60, (792 - 40) * 3, 120);
    buffer.rect(60, (792 - 60) * 3, (792 - 40) * 3, 120);
    
    
    //top text
    buffer.fill(255);
    buffer.textSize(60);
    
    buffer.textFont(bodyFt);
    buffer.textAlign(CENTER, CENTER);
    buffer.text("``` Rit Smash Club Presents ```", (792 / 2) * 3, 110);
  
    
    
    
    //bottom text

    buffer.textSize(60);
    
    buffer.textFont(bodyFt);
    buffer.textAlign(LEFT, CENTER);
    buffer.text(tournamentInfo.date + " ", 180, (792 - 43) * 3);
    
    let url;
    if (tournamentInfo.object.tourneySelect.value() === "The Prowling Grounds") {
        url = "start.gg/tpgseries";
    } else {
      url = "start.gg/ctseries";
    }
    
    buffer.textAlign(RIGHT, CENTER);
    buffer.text(" " + tournamentInfo.object.entrantsInp.value() + " Entrants", (792 - 60) * 3, (792 - 43) * 3);
    
    let bottomLeftWidth = textWidth(tournamentInfo.date + " ");
    let bottomRightWidth = textWidth(" " + tournamentInfo.object.entrantsInp.value() + " Entrants");
    let bottomCenterWidth = textWidth(" " + url + " ");
    
    buffer.textAlign(CENTER, CENTER);
    buffer.text(url, (792 / 2) * 3, (792 - 43) * 3);
    
    
    //place bars
    
    buffer.push();
    buffer.shearY(-2);
    buffer.translate(0, 40)
    
    buffer.fill(0);
    buffer.noStroke();
    
    buffer.rect(366 * 3, 88 * 3, 386 * 3, 42 * 3);
    buffer.rect(366 * 3, 346 * 3, 386 * 3, 42 * 3);
    
    buffer.rect(182 * 3, 416 * 3, 175 * 3, 42 * 3);
    buffer.rect(379 * 3, 416 * 3, 175 * 3, 42 * 3);
    buffer.rect(577 * 3, 416 * 3, 175 * 3, 42 * 3);
    
    
    buffer.rect(182 * 3, 575 * 3, 274 * 3, 42 * 3);
    buffer.rect(478 * 3, 575 * 3, 274 * 3, 42 * 3);
    
    buffer.fill(255);
    buffer.textSize(60);
    
    buffer.textFont(bodyFt);
    buffer.textAlign(CENTER, CENTER);
    
    buffer.text("``` The Champion ```",366 * 3, 88 * 3, 386 * 3, 38 * 3);
    
    let p1Char = playerDataArray[0].characterInp.selector.value();
    let title;
    characterObj.characters.forEach((element) => {
      if (element.name === p1Char) {
        title = element.title;
      }
    });
    
    buffer.text(title, 366 * 3, 346 * 3, 386 * 3, 38 * 3);
    
    buffer.text("``` second ```", 182 * 3, 416 * 3, 175 * 3, 42 * 3);
    buffer.text("``` third ```",379 * 3, 416 * 3, 175 * 3, 42 * 3);
    buffer.text("``` fourth ```",577 * 3, 416 * 3, 175 * 3, 42 * 3);
    
    
    buffer.text("``` fifth ```",182 * 3, 575 * 3, 274 * 3, 42 * 3);
    buffer.text("``` seventh ```",478 * 3, 575 * 3, 274 * 3, 42 * 3);
    
    buffer.pop();
    
    
    //photo places
    buffer.push();
    buffer.shearY(-2);
    buffer.translate(0, 40);
    
    buffer.fill(255);
    buffer.noStroke();
    
    buffer.rect(366 * 3, 130 * 3, 386 * 3, 125 * 3);
    
    buffer.rect(182 * 3, 458 * 3, 175 * 3, 57 * 3);
    buffer.rect(379 * 3, 458 * 3, 175 * 3, 57 * 3);
    buffer.rect(577 * 3, 458 * 3, 175 * 3, 57 * 3);
    
    
    buffer.rect(182 * 3, 617 * 3, 274 * 3, 57 * 3);
    buffer.rect(478 * 3, 615 * 3, 274 * 3, 57 * 3);
    buffer.pop();
    
    
    // text drawers
    for (let i = 0; i < textDrawers.length; i++) {
      textDrawers[i].display();
    }
    
    //  series number
    
    buffer.textFont(numberFt);
    buffer.textAlign(CENTER, CENTER);
    buffer.fill(0);
    buffer.textSize(363);
    buffer.text(tournamentInfo.seriesNumber, 195 * 3, 127 * 3, 135 * 3, 145 * 3);
    
    buffer.textFont(bodyFt);
    buffer.textSize(78);
    buffer.text("````````", 195 * 3, 255 * 3, 135 * 3, 17 * 3);
    
    
    // logo
    
    if (tournamentInfo.object.tourneySelect.value() === "The Prowling Grounds") {
        buffer.image(tpgImg, 195 * 3, 93 * 3);
    } else {
      buffer.image(ctImg, 195 * 3, 93 * 3);
    }
    
    buffer.image(logoBW, 188 * 3, 281 * 3);
    buffer.push();
    // buffer.colorMode(HSL);
    switch (tournamentInfo.game) {
        case "ultimate":
          buffer.tint(247, 148, 33);
          break;
        case "melee":
          buffer.tint(243, 116, 54);
          break;
        case "64":
          buffer.tint(252, 182, 54);
          break;
      }
    
    buffer.image(logoColor, 188 * 3, 281 * 3);
    
    buffer.pop();
    
  }
  
  image(buffer, 0, 0, 792, 792);
  
}


function handleData() {
  characterObj.characters.forEach((element) => characterArray.push(element.name));
  
  tournamentInfo.object = new InfoInput();
  
  for (let i = 0; i < 8; i++) {
    playerDataArray.push(new PlayerInput(i + 1));
    playerDataArray[i].characterInp.update();
  }
  
  
  // text drawers
  textDrawers[0] = new PlayerTextDrawer(0, 200, 366 * 3, (84 + 42 + 125) * 3, 365 * 3, 87 * 3);
  textDrawers[1] = new PlayerTextDrawer(1, 60, 182 * 3, (416 + 42 + 57) * 3, 175 * 3, 42 * 3);
  textDrawers[2] = new PlayerTextDrawer(2, 60, 379 * 3, (416 + 42 + 57) * 3, 175 * 3, 42 * 3);
  textDrawers[3] = new PlayerTextDrawer(3, 60, 577 * 3, (416 + 42 + 57) * 3, 175 * 3, 42 * 3);
  
  textDrawers[4] = new PlayerTextDrawer(4, 60, 182 * 3, (575 + 42 + 57) * 3, 125 * 3, 42 * 3);
  textDrawers[5] = new PlayerTextDrawer(5, 60, 328 * 3, (575 + 42 + 57) * 3, 125 * 3, 42 * 3);
  textDrawers[6] = new PlayerTextDrawer(6, 60, 478 * 3, (575 + 42 + 57) * 3, 125 * 3, 42 * 3);
  textDrawers[7] = new PlayerTextDrawer(7, 60, 625 * 3, (575 + 42 + 57) * 3, 125 * 3, 42 * 3);
  
  
  dataLoaded = true;
  
  
}

class InfoInput {
  constructor() {
    this.tourneySelect = createSelect();
    this.tourneySelect.option("The Prowling Grounds");
    this.tourneySelect.option("Crouching Tigers");
    this.tourneySelect.size(300);
    
    
    this.gameSelect = createSelect();
    this.gameSelect.option("ultimate");
    this.gameSelect.option("melee");
    this.gameSelect.option("64");
    this.gameSelect.size(300);
    
    this.gamePrev = tournamentInfo.game;
    
    this.dateInp = createInput("2025-01-31", "date");
    this.dateInp.size(300);
    
    this.datePrev = tournamentInfo.date;
    
    this.entrantsInp = createInput("50", "number");
    this.entrantsInp.size(300);
    
    this.seriesInp = createInput("101", "number");
    this.seriesInp.size(300);
    
    
  }
  
  update() {
    
    
    tournamentInfo.game = this.gameSelect.value();
    tournamentInfo.entrantsInp = this.entrantsInp.value();
    tournamentInfo.seriesNumber = this.seriesInp.value();
    
    
     if (this.dateInp.value() != this.datePrev) {
       
       let newDate = new Date(this.dateInp.value() + "T00:00:00");
       
       let dateString = newDate.toDateString();
       
       dateString = dateString.slice(4);
       
       let dayNum = dateString.slice(4, 6);
       dayNum = dayNum.replace(/^0+/, '');
       
       dateString = dateString.slice(0,3) + ". " + dayNum + "," + dateString.slice(6);
       
       console.log(dateString);
       
       tournamentInfo.date = dateString;
       
       this.datePrev = this.dateInp.value();
     }
    
    
    if (tournamentInfo.game != this.gamePrev) {
      
      for (let i = 0; i < 8; i++) {
        playerDataArray[i].characterInp.update();
    }
      
      this.gamePrev = tournamentInfo.game;
    }
  }
}

class PlayerInput {
  constructor(place) {
    
    // set data variables
    this.place = place;
    this.tag = "";
    this.prefix = "";
    this.character = "";
    
    // create and append elements 
    this.div = createDiv("<h2>Player " + this.place + "</h2>");
    this.div.id("player" + this.place);
    this.div.class("player-data");
    
    this.prefixInp = createInput("Prefix");
    this.prefixInp.size(300);
    this.prefixInp.parent(this.div);
    
    this.tagInp = createInput("Player Tag");
    this.tagInp.size(300);
    this.tagInp.parent(this.div);
    
    this.characterInp = new CharacterInput();
    this.characterInp.selector.size(300);
    this.characterInp.selector.parent(this.div);
    
    
  }
}

class CharacterInput {
  constructor() {
    this.selector = createSelect();
    
    for (let i = 0; i < characterArray.length; i++) {
      this.selector.option(characterArray[i]);
    }
  }
  update() {
    characterObj.characters.forEach((element) => {
      let include = true;
      switch (tournamentInfo.game) {
        case "ultimate":
          include = element.ultimate;
          break;
        case "melee":
          include = element.melee;
          break;
        case "64":
          include = element.s64;
          break;
        default:
          include = element.ultimate;
          break;
      }
      
      if (include) {
        this.selector.enable(element.name);
      } else {
        this.selector.disable(element.name);
      }
  });
  
  }
}

class PlayerTextDrawer {
  constructor(index, size, x, y, w, h) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.offset = 0;
    this.initSize = size;
    this.size = size;
  }
  
  display() {
    let tag = playerDataArray[this.index].tagInp.value();
    let prefix = playerDataArray[this.index].prefixInp.value();
    
    tag.replace(/ /g, '\u00a0');
    prefix.replace(/ /g, '\u00a0');
    
    if (prefix != "") {
      prefix = prefix + " ";
    }
    
    
    
    buffer.push();
    let pWidth = prefixFt.textBounds(prefix, this.x, this.y, this.size).w;
    let tWidth = bodyFt.textBounds(tag, this.x, this.y, this.size).w;
    
    if ((pWidth + tWidth) > this.w) {
      this.size -= 1;
    } else if ((pWidth + tWidth) < this.w - 10) {
      this.size = this.initSize;
    }
    
    let offset = (this.w - (pWidth + tWidth)) / 2;
    
    buffer.shearY(-2);
    buffer.translate(offset, 40);
    
    buffer.textSize(this.size);
    buffer.fill(0);
    
    buffer.textAlign(LEFT, CENTER);
    
    buffer.textFont(prefixFt);
    
  
    buffer.text(prefix, this.x, this.y, this.w, this.h + 10);
    
    
    buffer.textFont(bodyFt);
    buffer.text(tag, this.x + (pWidth), this.y, this.w, this.h);
    
    buffer.pop();
    
    // buffer.push();
    // buffer.stroke("red");
    // buffer.noFill();
    // buffer.strokeWeight(3)
    // buffer.rect(this.x, this.y, tWidth, this.h);
    // buffer.pop();
    
  }
}

function saveImage() {
  let filename = tournamentInfo.object.tourneySelect.value() + "_" + tournamentInfo.seriesNumber + "_" + tournamentInfo.game + "_Top8.png";
  filename.replace(/ /g, "_");
  save(buffer, filename);
}