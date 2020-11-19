var numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var numberStrs = ['❎','❎','❎','❎','❎','❎','❎','❎','❎','❎','❎','❎','❎','❎','❎','❎'];
var tempArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var newGameList = ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'];

var didFindGold = false;
var didFindMonster = false;
var didFallIPit = false;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function addValueToArray(index, value) {
    tempArray[index] = tempArray[index] + value;
}

function newGame() {
    
    numbers = shuffle(numbers);
    
    var indexOfMonster = numbers.indexOf(11);
    var indexOfGold = numbers.indexOf(7);
    var indexOfPit1 = numbers.indexOf(0);
    var indexOfPit2 = numbers.indexOf(5);
    var indexOfPit3 = numbers.indexOf(9);
    var indexOfPit4 = numbers.indexOf(15);
    
    //Findinng Adjacents
    
    var adjToMonster = []
    if (indexOfMonster+4 < 16) { //number below
        adjToMonster.push(numbers[indexOfMonster+4]);
    }
    if (indexOfMonster+1 < 16 && indexOfMonster%4 != 3) { //number right
        adjToMonster.push(numbers[indexOfMonster+1]);
    }
    if (indexOfMonster-4 >= 0) { //number Above
        adjToMonster.push(numbers[indexOfMonster-4]);
    }
    if (indexOfMonster-1 >= 0 && indexOfMonster%4 != 0) { //number left
        adjToMonster.push(numbers[indexOfMonster-1]);
    }
    
    var adjToGold = []
    if (indexOfGold+4 < 16) { //number below
        adjToGold.push(numbers[indexOfGold+4]);
    }
    if (indexOfGold+1 < 16 && indexOfGold%4 != 3) { //number right
        adjToGold.push(numbers[indexOfGold+1]);
    }
    if (indexOfGold-4 >= 0) { //number Above
        adjToGold.push(numbers[indexOfGold-4]);
    }
    if (indexOfGold-1 >= 0 && indexOfGold%4 != 0) { //number left
        adjToGold.push(numbers[indexOfGold-1]);
    }
    
    var adjToPit1 = []
    if (indexOfPit1+4 < 16) { //number below
        adjToPit1.push(numbers[indexOfPit1+4]);
    }
    if (indexOfPit1+1 < 16 && indexOfPit1%4 != 3) { //number right
        adjToPit1.push(numbers[indexOfPit1+1]);
    }
    if (indexOfPit1-4 >= 0) { //number Above
        adjToPit1.push(numbers[indexOfPit1-4]);
    }
    if (indexOfPit1-1 >= 0 && indexOfPit1%4 != 0) { //number left
        adjToPit1.push(numbers[indexOfPit1-1]);
    }
    
    var adjToPit2 = []
    if (indexOfPit2+4 < 16) { //number below
        adjToPit2.push(numbers[indexOfPit2+4]);
    }
    if (indexOfPit2+1 < 16 && indexOfPit2%4 != 3) { //number right
        adjToPit2.push(numbers[indexOfPit2+1]);
    }
    if (indexOfPit2-4 >= 0) { //number Above
        adjToPit2.push(numbers[indexOfPit2-4]);
    }
    if (indexOfPit2-1 >= 0 && indexOfPit2%4 != 0) { //number left
        adjToPit2.push(numbers[indexOfPit2-1]);
    }
    
    var adjToPit3 = []
    if (indexOfPit3+4 < 16) { //number below
        adjToPit3.push(numbers[indexOfPit3+4]);
    }
    if (indexOfPit3+1 < 16 && indexOfPit3%4 != 3) { //number right
        adjToPit3.push(numbers[indexOfPit3+1]);
    }
    if (indexOfPit3-4 >= 0) { //number Above
        adjToPit3.push(numbers[indexOfPit3-4]);
    }
    if (indexOfPit3-1 >= 0 && indexOfPit3%4 != 0) { //number left
        adjToPit3.push(numbers[indexOfPit3-1]);
    }
    
    var adjToPit4 = []
    if (indexOfPit4+4 < 16) { //number below
        adjToPit4.push(numbers[indexOfPit4+4]);
    }
    if (indexOfPit4+1 < 16 && indexOfPit4%4 != 3) { //number right
        adjToPit4.push(numbers[indexOfPit4+1]);
    }
    if (indexOfPit4-4 >= 0) { //number Above
        adjToPit4.push(numbers[indexOfPit4-4]);
    }
    if (indexOfPit4-1 >= 0 && indexOfPit3%4 != 0) { //number left
        adjToPit4.push(numbers[indexOfPit4-1]);
    }
    
    // Making values
    
    for(var i = 0; i < adjToMonster.length; i++) {
        let temp = numbers.indexOf(adjToMonster[i])
        addValueToArray(temp, 10);
        
    }
    
    for(var i = 0; i < adjToGold.length; i++) {
        let temp = numbers.indexOf(adjToGold[i])
        addValueToArray(temp, 5);
    }
    
    for(var i = 0; i < adjToPit1.length; i++) {
        let temp = numbers.indexOf(adjToPit1[i])
        addValueToArray(temp, 2);
    }
    
    for(var i = 0; i < adjToPit2.length; i++) {
        let temp = numbers.indexOf(adjToPit2[i])
        addValueToArray(temp, 2);
    }
    
    for(var i = 0; i < adjToPit3.length; i++) {
        let temp = numbers.indexOf(adjToPit3[i])
        addValueToArray(temp, 2);
    }
    
    for(var i = 0; i < adjToPit4.length; i++) {
        let temp = numbers.indexOf(adjToPit4[i])
        addValueToArray(temp, 2);
    }
    
    
    for(var i = 0; i<tempArray.length; i++) {
        
        switch(tempArray[i]) {
            case 10:
                numberStrs[i] = "👃";
                break;
            case 5:
                numberStrs[i] = "✨";
                break;
            case 2:
            case 4:
            case 6:
            case 8:
                numberStrs[i] = "🌬️";
                break;
            case 23:
            case 21:
            case 19:
            case 17:
                numberStrs[i] = "🌬️✨👃";
                break;
           case 15:
                numberStrs[i] = "👃✨";
                break;
            case 7:
            case 9:
            case 11:
            case 13:
                numberStrs[i] = "✨🌬️";
                break;
            case 18:
            case 16:
            case 14:
            case 12:
                numberStrs[i] = "👃🌬️";
                break;
           case 0:
                numberStrs[i] = "❎";
                break;
            default:
                console.log("Error# 874B3: Temp Value array value is not found. Value = " + tempArray[i]);
        } //EO Switch
    }//EO For-loop
    
    numberStrs[indexOfMonster] = "👹";
    numberStrs[indexOfGold] = "💰";
    numberStrs[indexOfPit1] = "🕳️";
    numberStrs[indexOfPit2] = "🕳️";
    numberStrs[indexOfPit3] = "🕳️";
    numberStrs[indexOfPit4] = "🕳️";
    
    /////////END OF FINDING ADJJCENT/////////
    
    //Radom opening of one box whe game starts
    var tempRandNum;
    
    do {
        tempRandNum = Math.floor(Math.random() * 16);
            //Math.floor(Math.random() * 6) + 1
    } while (tempRandNum == indexOfMonster || tempRandNum == indexOfGold || tempRandNum == indexOfPit1 || tempRandNum == indexOfPit2 || tempRandNum == indexOfPit3 || tempRandNum == indexOfPit4);
    
    for (var i = 0; i < numberStrs.length; i++) {
        document.querySelector('.btn-' + i).textContent = '❔';//numberStrs[i];
    }
    
    console.log(tempRandNum);
    
    document.querySelector('.btn-' + tempRandNum).textContent = numberStrs[tempRandNum];
    
}

newGame();

document.querySelector('.btn-0').addEventListener('click', function () {
    document.querySelector('.btn-0').textContent = numberStrs[0];
});

document.querySelector('.btn-1').addEventListener('click', function () {
    document.querySelector('.btn-1').textContent = numberStrs[1];
});

document.querySelector('.btn-2').addEventListener('click', function () {
    document.querySelector('.btn-2').textContent = numberStrs[2];
});

document.querySelector('.btn-3').addEventListener('click', function () {
    document.querySelector('.btn-3').textContent = numberStrs[3];
});

document.querySelector('.btn-4').addEventListener('click', function () {
    document.querySelector('.btn-4').textContent = numberStrs[4];
});

document.querySelector('.btn-5').addEventListener('click', function () {
    document.querySelector('.btn-5').textContent = numberStrs[5];
});

document.querySelector('.btn-6').addEventListener('click', function () {
    document.querySelector('.btn-6').textContent = numberStrs[6];
});

document.querySelector('.btn-7').addEventListener('click', function () {
    document.querySelector('.btn-7').textContent = numberStrs[7];
});

document.querySelector('.btn-8').addEventListener('click', function () {
    document.querySelector('.btn-8').textContent = numberStrs[8];
});

document.querySelector('.btn-9').addEventListener('click', function () {
    document.querySelector('.btn-9').textContent = numberStrs[9];
});

document.querySelector('.btn-10').addEventListener('click', function () {
    document.querySelector('.btn-10').textContent = numberStrs[10];
});

document.querySelector('.btn-11').addEventListener('click', function () {
    document.querySelector('.btn-11').textContent = numberStrs[11];
});

document.querySelector('.btn-12').addEventListener('click', function () {
    document.querySelector('.btn-12').textContent = numberStrs[12];
});

document.querySelector('.btn-13').addEventListener('click', function () {
    document.querySelector('.btn-13').textContent = numberStrs[13];
});

document.querySelector('.btn-14').addEventListener('click', function () {
    document.querySelector('.btn-14').textContent = numberStrs[14];
});

document.querySelector('.btn-15').addEventListener('click', function () {
    document.querySelector('.btn-15').textContent = numberStrs[15];
});
