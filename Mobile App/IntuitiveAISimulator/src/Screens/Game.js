import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, ActivityIndicator, Platform, Share } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../Utils/Colors';

import { useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';

var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';


function Game({ navigation }) {

    // useFocusEffect(useCallback(() => {
    //     navigation.setOptions({
    //         headerShown: false
    //     })
    // }))

    const [isLoading, setIsLoading] = useState(false);

    var [numberStrs, setNumberStrs] = useState(['❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎'])
    var [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])

    var [button0Pressed, setButton0Pressed] = useState(false); var [button1Pressed, setButton1Pressed] = useState(false);
    var [button2Pressed, setButton2Pressed] = useState(false); var [button3Pressed, setButton3Pressed] = useState(false);
    var [button4Pressed, setButton4Pressed] = useState(false); var [button5Pressed, setButton5Pressed] = useState(false);
    var [button6Pressed, setButton6Pressed] = useState(false); var [button7Pressed, setButton7Pressed] = useState(false);
    var [button8Pressed, setButton8Pressed] = useState(false); var [button9Pressed, setButton9Pressed] = useState(false);
    var [button10Pressed, setButton10Pressed] = useState(false); var [button11Pressed, setButton11Pressed] = useState(false);
    var [button12Pressed, setButton12Pressed] = useState(false); var [button13Pressed, setButton13Pressed] = useState(false);
    var [button14Pressed, setButton14Pressed] = useState(false); var [button15Pressed, setButton15Pressed] = useState(false);

    // var numberStrs = 
    var tempArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const [foundMonsterTime, setFoundMonsterTimes] = useState(0)
    const [foundGoldTime, setFoundGoldTimes] = useState(0)
    const [foundPitTime, setFoundPitTimes] = useState(0)
    const [totalScore, setTotalScore] = useState(0)

    var [currentScore, setCurrentScore] = useState(0);

    const [toOpenIndex, setToOpenIndex] = useState(-1);

    var [didFMonster, setDidFMonster] = useState(false);
    var [didFGold, setDidFGold] = useState(false);
    var [didFInPit, setDidFInPit] = useState(false);

    var [userGamePlayPattern, setUserGamePlayPattern] = useState([]);
    var [userGamePlayPatternIndex, setUserGamePlayPatternIndex] = useState([]);

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
        setIsLoading(true)
        // AsyncStorage.clear().then(() => console.log('Cleared'))
        AsyncStorage.getItem('@total_score').then((totalScore) => {
            if (totalScore == null) {

                const scores = [['@total_score', "0"], ['@monster_captured', "0"],
                ['@gold_found', "0"], ['@pit_fall', "0"]]

                AsyncStorage.multiSet(scores);

                // setTotalScore(scores[0][1]);
                // setFoundMonsterTimes(scores[1][1]);
                // setFoundGoldTimes(scores[2][1]);
                // setFoundPitTimes(scores[3][1]);

            } else {
                AsyncStorage.multiGet(['@total_score', '@monster_captured',
                    '@gold_found', '@pit_fall']).then((items) => {
                        setTotalScore(items[0][1]);
                        setFoundMonsterTimes(items[1][1]);
                        setFoundGoldTimes(items[2][1]);
                        setFoundPitTimes(items[3][1]);
                        // console.log(items[0][1], items[1][1], items[2][1], items[3][1])
                    })
            }
        })

        setButton0Pressed(false);
        setButton1Pressed(false);
        setButton2Pressed(false);
        setButton3Pressed(false);
        setButton4Pressed(false);
        setButton5Pressed(false);
        setButton6Pressed(false);
        setButton7Pressed(false);
        setButton8Pressed(false);
        setButton9Pressed(false);
        setButton10Pressed(false);
        setButton11Pressed(false);
        setButton12Pressed(false);
        setButton13Pressed(false);
        setButton14Pressed(false);
        setButton15Pressed(false);

        setNumberStrs(['❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎']);
        tempArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        // setFoundMonsterTimes(0)
        // setFoundGoldTimes(0)
        // setFoundPitTimes(0)
        // setTotalScore(0)

        setCurrentScore(0);

        setToOpenIndex(-1);

        setDidFMonster(false);
        setDidFGold(false);
        setDidFInPit(false);

        setUserGamePlayPattern([]);
        setUserGamePlayPatternIndex([]);

        // userGamePlayPattern = [];
        // userGamePlayPatternIndex = [];

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
            // setIsLoading(false)
        } while (tempRandNum == indexOfMonster || tempRandNum == indexOfGold || tempRandNum == indexOfPit1 || tempRandNum == indexOfPit2 || tempRandNum == indexOfPit3 || tempRandNum == indexOfPit4);

        setToOpenIndex(tempRandNum)

        // console.log(tempRandNum + " is basically " + numberStrs[tempRandNum]);

        // console.log(numberStrs);
        setNumberStrs(numberStrs)
        setNumbers(numbers)
        setIsLoading(false)
        setUserGamePlayPattern([numberStrs[tempRandNum]]);
        setUserGamePlayPatternIndex([tempRandNum]);

    }

    function checkUserWin(btnValue, index) {

        // console.log(`${btnValue}, ${index}`)

        setUserGamePlayPattern([...userGamePlayPattern, btnValue]);
        setUserGamePlayPatternIndex([...userGamePlayPatternIndex, index]);
        // console.log("CURRENT SCORE: " + currentScore)
        // console.log("CURRENT SCORE IS: " + currentScore)

        switch (btnValue) {
            case '👹':

                AsyncStorage.multiGet(['@total_score', '@monster_captured',
                    '@gold_found', '@pit_fall']).then((items) => {
                        setIsLoading(true);

                        setCurrentScore(currentScore + 1)
                        // console.log("CURRENT SCORE: " + (currentScore + 1))
                        var updatedTotalScore = (items[0][1] !== NaN) ? parseInt(items[0][1]) + 1 : 0;
                        var updatedMonsterScore = (items[1][1] !== NaN) ? parseInt(items[1][1]) + 1 : 0;

                        // console.log(`items[0][1]: ${items[0][1]}, updatedTotalScore: ${updatedTotalScore}`)
                        AsyncStorage.setItem('@total_score', `${updatedTotalScore}`);
                        AsyncStorage.setItem('@monster_captured', `${updatedMonsterScore}`);
                        setTotalScore(updatedTotalScore);
                        setFoundMonsterTimes(updatedMonsterScore);
                        setDidFMonster(true);


                        //WRITE TO FIRESTORE HERE

                    })

                // .catch((error) => {
                //     Alert.alert('Error saving data', `We we unnable to connect to our database. ${error}`);
                //     newGame();
                // });

                break;
            case '💰':
                setDidFGold(true);
                break;
            case '🕳️':
                AsyncStorage.multiGet(['@total_score', '@monster_captured',
                    '@gold_found', '@pit_fall']).then((items) => {
                        setIsLoading(true);
                        setCurrentScore(currentScore - 1)
                        // console.log("CURRENT SCORE: " + (currentScore - 1))
                        var updatedTotalScore = (items[0][1] !== NaN) ? parseInt(items[0][1]) - 1 : 0;
                        var updatedPitFalls = (items[3][1] !== NaN) ? parseInt(items[3][1]) + 1 : 0;
                        // console.log(`items[0][1]: ${items[0][1]}, updatedTotalScore: ${updatedTotalScore}`)
                        AsyncStorage.setItem('@total_score', `${updatedTotalScore}`);
                        AsyncStorage.setItem('@pit_fall', `${updatedPitFalls}`);
                        setTotalScore(updatedTotalScore);
                        setFoundPitTimes(updatedPitFalls);
                        setDidFInPit(true);


                        // console.log(items[0][1], items[1][1], items[2][1], items[3][1])

                        //WRITE TO FIRESTORE HERE
                        // writeToDB(didFMonster, didFGold, didFInPit);

                        //UPDATE UI START A NEW GAME

                    })
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (didFMonster || didFInPit) {
            setIsLoading(true)
            // console.log("****THIS RUNS****")

            if (didFGold) {
                AsyncStorage.multiGet(['@total_score', '@monster_captured',
                    '@gold_found', '@pit_fall']).then((items) => {

                        setCurrentScore(currentScore + 1)
                        // console.log("CURRENT SCORE: " + (currentScore + 1))
                        var updatedTotalScore = (items[0][1] !== NaN) ? parseInt(items[0][1]) + 1 : 0;
                        var updatedGoldScore = (items[2][1] !== NaN) ? parseInt(items[2][1]) + 1 : 0;

                        AsyncStorage.setItem('@total_score', `${updatedTotalScore}`);
                        AsyncStorage.setItem('@gold_found', `${updatedGoldScore}`);

                        setTotalScore(updatedTotalScore);
                        setFoundGoldTimes(updatedGoldScore);

                    })
            }


            var data = {
                didUserFallInPit: didFInPit,
                didUserFindGold: didFGold,
                didUserFindMonster: didFMonster,
                finalScore: didFGold ? currentScore + 1 : currentScore,
                gameArrayPattern: numberStrs,
                gameArrayPatternIndex: numbers,
                logEntyDate: new Date,
                playedBy: "human",
                userDevice: "mobile-app",
                userGamePlayPattern: userGamePlayPattern,
                userGamePlayPatternIndex: userGamePlayPatternIndex,
                userOS: Platform.OS
            }

            firestore().collection('Games').add(data).then(() => {

                if (didFInPit && didFGold) {

                    AsyncStorage.setItem('@total_score', `${updatedTotalScore}`);
                    AsyncStorage.setItem('@pit_fall', `${updatedPitFalls}`);

                    Alert.alert("You've fallen in the 🕳️",
                        `You lose because you have fallen in the pit, but since you found 💰 your score is ${currentScore}. The score has been updated.`, [
                        {
                            text: 'OK', onPress: () => {
                                // setDidFInPit(false);
                                // setDidFGold(false);
                                setIsLoading(false);
                                newGame();
                                //Do something so that the UI can also update
                            }
                        }
                    ], { cancelable: false })
                } else if (didFMonster && didFGold) {
                    Alert.alert("You've successfully hunted 👹",
                        `You win because you have successfully hunted the monster, and since you also found 💰 your score is ${currentScore}. The score has been updated.`, [
                        {
                            text: 'OK', onPress: () => {
                                // setDidFMonster(false);
                                // setDidFGold(false);
                                setIsLoading(false);
                                newGame();
                                //Do something so that the UI can also update
                            }
                        }
                    ], { cancelable: false })
                } else if (didFMonster) {
                    Alert.alert("You've successfully hunted 👹",
                        `You win because you have successfully hunted the monster, your score is ${currentScore}. The score has been updated.`, [
                        {
                            text: 'OK', onPress: () => {
                                // setDidFMonster(false);
                                setIsLoading(false);
                                newGame();
                                //Do something so that the UI can also update
                            }
                        }
                    ], { cancelable: false })
                } else if (didFInPit) {
                    Alert.alert("You've fallen in the 🕳️",
                        `You lose because you have fallen in the pit, your score is ${currentScore}. The score has been updated.`, [
                        {
                            text: 'OK', onPress: () => {
                                // setDidFInPit(false);
                                setIsLoading(false);
                                newGame();
                                //Do something so that the UI can also update
                            }
                        }
                    ], { cancelable: false })
                } else {
                    setIsLoading(false);
                    console.log("This should never run and ever to be seen")
                }
            }).catch((error) => {
                setIsLoading(false);
                Alert.alert('Error saving data', `We we unable to connect to our database. ${error}`);
                newGame();
            })

        }
    }, [didFMonster, didFInPit])

    useEffect(() => {
        newGame();
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: '#000' }}>
            {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal={false}> */}
            <Image style={{ resizeMode: 'contain', height: 50, }} source={require('../Assets/intuitiveai-simulator-logo.png')} />
            {/* <Text>IntuitiveAI Simulator</Text> */}
            {isLoading && <ActivityIndicator size={'small'} color={'white'} />}
            <View style={styles.row}>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton0Pressed(true);
                        checkUserWin(numberStrs[0], 0);
                    }
                }}>
                    <Text>{(button0Pressed === true || toOpenIndex === 0) ? numberStrs[0] : ''}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton1Pressed(true);
                        checkUserWin(numberStrs[1], 1);
                    }
                }}>
                    <Text >{(button1Pressed === true || toOpenIndex === 1) ? numberStrs[1] : ''}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton2Pressed(true);
                        checkUserWin(numberStrs[2], 2);
                    }
                }}>
                    <Text>{(button2Pressed === true || toOpenIndex === 2) ? numberStrs[2] : ''}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton3Pressed(true);
                        checkUserWin(numberStrs[3], 3);
                    }

                }}>
                    <Text>{(button3Pressed === true || toOpenIndex === 3) ? numberStrs[3] : ''}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton4Pressed(true);
                        checkUserWin(numberStrs[4], 4);
                    }

                }}>
                    <Text>{(button4Pressed === true || toOpenIndex === 4) ? numberStrs[4] : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton5Pressed(true);
                        checkUserWin(numberStrs[5], 5);
                    }

                }}>
                    <Text>{(button5Pressed === true || toOpenIndex === 5) ? numberStrs[5] : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton6Pressed(true);
                        checkUserWin(numberStrs[6], 6);
                    }

                }}>
                    <Text>{(button6Pressed === true || toOpenIndex === 6) ? numberStrs[6] : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton7Pressed(true);
                        checkUserWin(numberStrs[7], 7);
                    }

                }}>
                    <Text>{(button7Pressed === true || toOpenIndex === 7) ? numberStrs[7] : ''}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton8Pressed(true);
                        checkUserWin(numberStrs[8], 8);
                    }

                }}>
                    <Text>{(button8Pressed === true || toOpenIndex === 8) ? numberStrs[8] : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButton} onPress={() => {
                    if (!isLoading) {
                        setButton9Pressed(true);
                        checkUserWin(numberStrs[9], 9);
                    }

                }}>
                    <Text>{(button9Pressed === true || toOpenIndex === 9) ? numberStrs[9] : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton10Pressed(true);
                        checkUserWin(numberStrs[10], 10);
                    }

                }}>
                    <Text>{(button10Pressed === true || toOpenIndex === 10) ? numberStrs[10] : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton11Pressed(true);
                        checkUserWin(numberStrs[11], 11);
                    }
                }}>
                    <Text>{(button11Pressed === true || toOpenIndex === 11) ? numberStrs[11] : ''}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton12Pressed(true);
                        checkUserWin(numberStrs[12], 12);
                    }
                }}>
                    <Text>{(button12Pressed === true || toOpenIndex === 12) ? numberStrs[12] : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton13Pressed(true);
                        checkUserWin(numberStrs[13], 13);
                    }
                }}>
                    <Text>{(button13Pressed === true || toOpenIndex === 13) ? numberStrs[13] : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton14Pressed(true);
                        checkUserWin(numberStrs[14], 14);
                    }
                }}>
                    <Text>{(button14Pressed === true || toOpenIndex === 14) ? numberStrs[14] : ''}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainButton} disabled={isLoading} onPress={() => {
                    if (!isLoading) {
                        setButton15Pressed(true);
                        checkUserWin(numberStrs[15], 15);
                    }
                }}>
                    <Text>{(button15Pressed === true || toOpenIndex === 16) ? numberStrs[15] : ''}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.scoreView}>
                <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }} onPress={() => {
                    Alert.alert('About Score Board', 'These scores are locally stored in your phone, meaning only you have access to this data so it will not be transferred if you install this app on another phone. \n\nThe total score is calculated in the following manner: \n\nIf you hunt monster you get +1\nIf you find gold before hunting monster you get +1\nIf you fall in pit you get -1\n\nThe maximum score you can get is 2 and the minimum is -1.\n\nFor more information visit us at: https://intuitive-ai.web.app/')
                }}>
                    <Text style={{ color: '#006CFF', fontSize: 16, fontWeight: 'bold' }}>ⓘ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', right: 10, bottom: 10 }} onPress={() => {
                    Share.share({
                        message: `My scores on IntuitiveAI Simulator is: ${totalScore} in which I've captured 👹 ${foundMonsterTime} times, found gold ${foundGoldTime} times, and fallen in pit ${foundPitTime} times. Download the IntuitiveAI simulator today:`,
                        url: 'https://intuitive-ai.web.app/',
                        title: 'My IntuitiveAI Simulator Scores'
                    }, {
                        dialogTitle: 'My IntuitiveAI Simulator Scores',
                        subject: 'My IntuitiveAI Simulator Scores'
                    })
                }}>
                    <Text style={{ color: '#006CFF', fontSize: 16, }}>Share</Text>
                </TouchableOpacity>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Score Board</Text>
                    <Text style={{ color: 'green', marginBottom: 5, marginTop: 5 }}>Total Score: {totalScore}</Text>
                    <Text style={{ fontSize: 12 }}>Captured 👹 {foundMonsterTime} times {'\n'}Found 💰 {foundGoldTime} times {'\n'}Fall in 🕳️ {foundPitTime} times</Text>
                </View>
            </View>
            <View style={styles.menuView}>


                <TouchableOpacity style={styles.menuButton} onPress={() => {
                    navigation.navigate('How To Play');
                }}>
                    <Text>❓ How to Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} onPress={() => {
                    newGame();
                }}>
                    <Text>🔄 New Game</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
                navigation.navigate('About Research, Data & Policy');
            }}>
                <Text style={{ color: 'white', marginTop: 10, fontWeight: 'bold' }}>About Research, Data & Policy ⟶</Text>
            </TouchableOpacity>
            {/* </ScrollView> */}
            <Text style={{ color: 'white', fontSize: 10, }}> v1.0 IntuitiveAI Mobile App Simulator by ibjects.com</Text>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', //ColorCode ? ColorCode : '#242234'
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainButton: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        margin: 10,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 0, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 4, // Android
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    scoreView: {
        backgroundColor: 'white',
        padding: 15,
        alignSelf: 'stretch',
        borderRadius: 8,
        margin: 10,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 0, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 4, // Android,
        flexDirection: 'row'
    },
    menuView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuButton: {
        backgroundColor: 'white',
        // flex: 1,
        padding: 5,
        margin: 10,
        // height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 0, width: 0 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 4, // Android
    }
})

export default Game;