import numpy as np
import random
import pandas as pd

def randomizeArray(numArray):
    random.shuffle(numArray)
    return numArray

def printGrid(numArr):
  my_grid = zip(*[iter(numArr)]*int(len(numArr)**0.5))
  gird = pd.DataFrame(my_grid, columns = ['0', '1', '2', '3'], index = ['3', '2', '1', '0'])
  print(gird)

def setNewGame():

    numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    randomizeArray(numbers)

    numberStrings = ['❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎', '❎']
    tempArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    newGameList = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
    didFindGold = False
    didFindMonster = False
    didFallInPit = False

    # 7 is gold #11 is monster #9,0,15,5 are pits
    indexOfGold = numbers.index(7)
    indexOfMonster = numbers.index(11)
    indexOfPit1 = numbers.index(0)
    indexOfPit2 = numbers.index(5)
    indexOfPit3 = numbers.index(9)
    indexOfPit4 = numbers.index(15)

    # Find Adjecent to
    adjToMonster = []
    if indexOfMonster + 4 < 16: adjToMonster.append(numbers[indexOfMonster + 4])  # number Below
    if indexOfMonster + 1 < 16 and indexOfMonster % 4 != 3: adjToMonster.append(
        numbers[indexOfMonster + 1])  # number Right
    if indexOfMonster - 4 >= 0: adjToMonster.append(numbers[indexOfMonster - 4])  # number Above
    if indexOfMonster - 1 >= 0 and indexOfMonster % 4 != 0: adjToMonster.append(
        numbers[indexOfMonster - 1])  # number Left

    adjToGold = []
    if indexOfGold + 4 < 16: adjToGold.append(numbers[indexOfGold + 4])  # number Below
    if indexOfGold + 1 < 16 and indexOfGold % 4 != 3: adjToGold.append(numbers[indexOfGold + 1])  # number Right
    if indexOfGold - 4 >= 0: adjToGold.append(numbers[indexOfGold - 4])  # number Above
    if indexOfGold - 1 >= 0 and indexOfGold % 4 != 0: adjToGold.append(numbers[indexOfGold - 1])  # number Left

    adjToPit1 = []
    if indexOfPit1 + 4 < 16: adjToPit1.append(numbers[indexOfPit1 + 4])  # number Below
    if indexOfPit1 + 1 < 16 and indexOfPit1 % 4 != 3: adjToPit1.append(numbers[indexOfPit1 + 1])  # number Right
    if indexOfPit1 - 4 >= 0: adjToPit1.append(numbers[indexOfPit1 - 4])  # number Above
    if indexOfPit1 - 1 >= 0 and indexOfPit1 % 4 != 0: adjToPit1.append(numbers[indexOfPit1 - 1])  # number Left

    adjToPit2 = []
    if indexOfPit2 + 4 < 16: adjToPit2.append(numbers[indexOfPit2 + 4])  # number Below
    if indexOfPit2 + 1 < 16 and indexOfPit2 % 4 != 3: adjToPit2.append(numbers[indexOfPit2 + 1])  # number Right
    if indexOfPit2 - 4 >= 0: adjToPit2.append(numbers[indexOfPit2 - 4])  # number Above
    if indexOfPit2 - 1 >= 0 and indexOfPit2 % 4 != 0: adjToPit2.append(numbers[indexOfPit2 - 1])  # number Left

    adjToPit3 = []
    if indexOfPit3 + 4 < 16: adjToPit3.append(numbers[indexOfPit3 + 4])  # number Below
    if indexOfPit3 + 1 < 16 and indexOfPit3 % 4 != 3: adjToPit3.append(numbers[indexOfPit3 + 1])  # number Right
    if indexOfPit3 - 4 >= 0: adjToPit3.append(numbers[indexOfPit3 - 4])  # number Above
    if indexOfPit3 - 1 >= 0 and indexOfPit3 % 4 != 0: adjToPit3.append(numbers[indexOfPit3 - 1])  # number Left

    adjToPit4 = []
    if indexOfPit4 + 4 < 16: adjToPit4.append(numbers[indexOfPit4 + 4])  # number Below
    # indexOfPit4+1 < 16 &&  indexOfPit4%4 != 3  adjToPit4.push  (numbers[indexOfPit4+1]
    if indexOfPit4 + 1 < 16 and indexOfPit4 % 4 != 3: adjToPit4.append(numbers[indexOfPit4 + 1])  # number Right
    # indexOfPit4-4 >= 0.                  numbers[indexOfPit4-4]
    if indexOfPit4 - 4 >= 0: adjToPit4.append(numbers[indexOfPit4 - 4])  # number Above
    # indexOfPit4-1 >= 0 &&  indexOfPit4%4 != 0                           indexOfPit4-1
    if indexOfPit4 - 1 >= 0 and indexOfPit4 % 4 != 0: adjToPit4.append(numbers[indexOfPit4 - 1])  # number Left

    # Make Values: This step basically help us understand which hint should go where

    for i in range(len(adjToMonster)):
        temp = numbers.index(adjToMonster[i])
        tempArray[temp] = tempArray[temp] + 10

    for i in range(len(adjToGold)):
        temp = numbers.index(adjToGold[i])
        tempArray[temp] = tempArray[temp] + 5

    for i in range(len(adjToPit1)):
        temp = numbers.index(adjToPit1[i])
        tempArray[temp] = tempArray[temp] + 2

    for i in range(len(adjToPit2)):
        temp = numbers.index(adjToPit2[i])
        tempArray[temp] = tempArray[temp] + 2

    for i in range(len(adjToPit3)):
        temp = numbers.index(adjToPit3[i])
        tempArray[temp] = tempArray[temp] + 2

    for i in range(len(adjToPit4)):
        temp = numbers.index(adjToPit4[i])
        tempArray[temp] = tempArray[temp] + 2

    for i in range(len(tempArray)):
        if tempArray[i] == 10:
            numberStrings[i] = "👃"
        elif tempArray[i] == 5:
            numberStrings[i] = "✨"
        elif tempArray[i] == 2 or tempArray[i] == 4 or tempArray[i] == 6 or tempArray[i] == 8:
            numberStrings[i] = "💨"
        elif tempArray[i] == 23 or tempArray[i] == 21 or tempArray[i] == 19 or tempArray[
            i] == 17:  # or tempArray[i] == 30:
            numberStrings[i] = "💨✨👃"
        elif tempArray[i] == 15:
            numberStrings[i] = "👃✨"
        elif tempArray[i] == 7 or tempArray[i] == 9 or tempArray[i] == 11 or tempArray[i] == 13:
            numberStrings[i] = "✨💨"
        elif tempArray[i] == 18 or tempArray[i] == 16 or tempArray[i] == 14 or tempArray[i] == 12:
            numberStrings[i] = "👃💨"
        elif tempArray[i] == 0:
            numberStrings[i] = "❎"
        else:
            print("Error# 874B3: Temp Value array value is not found. Value = " + str(tempArray[i]))

    numberStrings[indexOfMonster] = "👹"
    numberStrings[indexOfGold] = "💰"
    numberStrings[indexOfPit1] = "🕳️"
    numberStrings[indexOfPit2] = "🕳️"
    numberStrings[indexOfPit3] = "🕳️"
    numberStrings[indexOfPit4] = "🕳️"

    # Open one box by default

    tempNum = 11;
    while True:
        tempNum = random.randint(0, len(numbers) - 1)
        if tempNum != indexOfMonster and tempNum != indexOfGold and tempNum != indexOfPit1 and tempNum != indexOfPit2 and tempNum != indexOfPit3 and tempNum != indexOfPit4:
            break
    # end of while
    newGameList[tempNum] = numberStrings[tempNum]
    printGrid(newGameList)


setNewGame()