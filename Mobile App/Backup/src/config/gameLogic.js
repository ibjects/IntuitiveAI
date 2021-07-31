
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var numberStrs = ['❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎'];
var tempArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var foundMonster = 0;
var foundGold = 0;
var foundPit = 0;
var currentScore = 0;
var finalScore = 0;
var userip;

var didFMonster = false;
var didFGold = false;
var didFInPit = false;

var userGamePlayPattern = [];
var userGamePlayPatternIndex = [];

const shuffleArray = (array) => {

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

const addValueToArray = (index, value) => {
    tempArray[index] = tempArray[index] + value;
}

function newGame() {
    numberStrs = ['❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎'];
    tempArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    finalScore = 0;

    didFMonster = false;
    didFGold = false;
    didFInPit = false;

    userGamePlayPattern = -[];
    userGamePlayPatternIndex = [];

    numbers = shuffleArray(numbers);

    var indexOfMonster = numbers.indexOf(11);
    var indexOfGold = numbers.indexOf(7);
    var indexOfPit1 = numbers.indexOf(0);
    var indexOfPit2 = numbers.indexOf(5);
    var indexOfPit3 = numbers.indexOf(9);
    var indexOfPit4 = numbers.indexOf(15);

    //Finding Adjacents

    var adjToMonster = []
    if (indexOfMonster + 4 < 16) { //number below
        adjToMonster.push(numbers[indexOfMonster + 4]);
    }
    if (indexOfMonster + 1 < 16 && indexOfMonster % 4 != 3) { //number right
        adjToMonster.push(numbers[indexOfMonster + 1]);
    }
    if (indexOfMonster - 4 >= 0) { //number Above
        adjToMonster.push(numbers[indexOfMonster - 4]);
    }
    if (indexOfMonster - 1 >= 0 && indexOfMonster % 4 != 0) { //number left
        adjToMonster.push(numbers[indexOfMonster - 1]);
    }

    var adjToGold = []
    if (indexOfGold + 4 < 16) { //number below
        adjToGold.push(numbers[indexOfGold + 4]);
    }
    if (indexOfGold + 1 < 16 && indexOfGold % 4 != 3) { //number right
        adjToGold.push(numbers[indexOfGold + 1]);
    }
    if (indexOfGold - 4 >= 0) { //number Above
        adjToGold.push(numbers[indexOfGold - 4]);
    }
    if (indexOfGold - 1 >= 0 && indexOfGold % 4 != 0) { //number left
        adjToGold.push(numbers[indexOfGold - 1]);
    }

    var adjToPit1 = []
    if (indexOfPit1 + 4 < 16) { //number below
        adjToPit1.push(numbers[indexOfPit1 + 4]);
    }
    if (indexOfPit1 + 1 < 16 && indexOfPit1 % 4 != 3) { //number right
        adjToPit1.push(numbers[indexOfPit1 + 1]);
    }
    if (indexOfPit1 - 4 >= 0) { //number Above
        adjToPit1.push(numbers[indexOfPit1 - 4]);
    }
    if (indexOfPit1 - 1 >= 0 && indexOfPit1 % 4 != 0) { //number left
        adjToPit1.push(numbers[indexOfPit1 - 1]);
    }

    var adjToPit2 = []
    if (indexOfPit2 + 4 < 16) { //number below
        adjToPit2.push(numbers[indexOfPit2 + 4]);
    }
    if (indexOfPit2 + 1 < 16 && indexOfPit2 % 4 != 3) { //number right
        adjToPit2.push(numbers[indexOfPit2 + 1]);
    }
    if (indexOfPit2 - 4 >= 0) { //number Above
        adjToPit2.push(numbers[indexOfPit2 - 4]);
    }
    if (indexOfPit2 - 1 >= 0 && indexOfPit2 % 4 != 0) { //number left
        adjToPit2.push(numbers[indexOfPit2 - 1]);
    }

    var adjToPit3 = []
    if (indexOfPit3 + 4 < 16) { //number below
        adjToPit3.push(numbers[indexOfPit3 + 4]);
    }
    if (indexOfPit3 + 1 < 16 && indexOfPit3 % 4 != 3) { //number right
        adjToPit3.push(numbers[indexOfPit3 + 1]);
    }
    if (indexOfPit3 - 4 >= 0) { //number Above
        adjToPit3.push(numbers[indexOfPit3 - 4]);
    }
    if (indexOfPit3 - 1 >= 0 && indexOfPit3 % 4 != 0) { //number left
        adjToPit3.push(numbers[indexOfPit3 - 1]);
    }

    var adjToPit4 = []
    if (indexOfPit4 + 4 < 16) { //number below
        adjToPit4.push(numbers[indexOfPit4 + 4]);
    }
    if (indexOfPit4 + 1 < 16 && indexOfPit4 % 4 != 3) { //number right
        adjToPit4.push(numbers[indexOfPit4 + 1]);
    }
    if (indexOfPit4 - 4 >= 0) { //number Above
        adjToPit4.push(numbers[indexOfPit4 - 4]);
    }
    if (indexOfPit4 - 1 >= 0 && indexOfPit4 % 4 != 0) { //number left
        adjToPit4.push(numbers[indexOfPit4 - 1]);
    }

    // Making values

    for (var i = 0; i < adjToMonster.length; i++) {
        let temp = numbers.indexOf(adjToMonster[i])
        addValueToArray(temp, 10);

    }

    for (var i = 0; i < adjToGold.length; i++) {
        let temp = numbers.indexOf(adjToGold[i])
        addValueToArray(temp, 5);
    }

    for (var i = 0; i < adjToPit1.length; i++) {
        let temp = numbers.indexOf(adjToPit1[i])
        addValueToArray(temp, 2);
    }

    for (var i = 0; i < adjToPit2.length; i++) {
        let temp = numbers.indexOf(adjToPit2[i])
        addValueToArray(temp, 2);
    }

    for (var i = 0; i < adjToPit3.length; i++) {
        let temp = numbers.indexOf(adjToPit3[i])
        addValueToArray(temp, 2);
    }

    for (var i = 0; i < adjToPit4.length; i++) {
        let temp = numbers.indexOf(adjToPit4[i])
        addValueToArray(temp, 2);
    }

    //Assigning Emojies

    for (var i = 0; i < tempArray.length; i++) {
        switch (tempArray[i]) {
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
                numberStrs[i] = "💨";
                break;
            case 23:
            case 21:
            case 19:
            case 17:
                numberStrs[i] = "💨✨👃";
                break;
            case 15:
                numberStrs[i] = "👃✨";
                break;
            case 7:
            case 9:
            case 11:
            case 13:
                numberStrs[i] = "✨💨";
                break;
            case 18:
            case 16:
            case 14:
            case 12:
                numberStrs[i] = "👃💨";
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

    //Random opening of one box whe game starts
    var tempRandNum;

    do {
        tempRandNum = Math.floor(Math.random() * 16);
        //Math.floor(Math.random() * 6) + 1
    } while (tempRandNum == indexOfMonster || tempRandNum == indexOfGold || tempRandNum == indexOfPit1 || tempRandNum == indexOfPit2 || tempRandNum == indexOfPit3 || tempRandNum == indexOfPit4);

}

export default {
    newGame
};