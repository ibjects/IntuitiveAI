//
//  ViewController.swift
//  IntuitiveAIStimulator
//
//  Created by Chaudhry Talha on 9/15/20.
//  Copyright © 2020 ibjects. All rights reserved.
//

import UIKit
import PopupDialog

class ViewController: UIViewController {
    
    @IBOutlet var gridBlock1: UIButton!
    @IBOutlet var gridBlock2: UIButton!
    @IBOutlet var gridBlock3: UIButton!
    @IBOutlet var gridBlock4: UIButton!
    @IBOutlet var gridBlock5: UIButton!
    @IBOutlet var gridBlock6: UIButton!
    @IBOutlet var gridBlock7: UIButton!
    @IBOutlet var gridBlock8: UIButton!
    @IBOutlet var gridBlock9: UIButton!
    @IBOutlet var gridBlock10: UIButton!
    @IBOutlet var gridBlock11: UIButton!
    @IBOutlet var gridBlock12: UIButton!
    @IBOutlet var gridBlock13: UIButton!
    @IBOutlet var gridBlock14: UIButton!
    @IBOutlet var gridBlock15: UIButton!
    @IBOutlet var gridBlock16: UIButton!
    @IBOutlet var closeButton: UIButton!
    @IBOutlet var infoLabel: UILabel!
    
    var numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    var tempArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    var numStr = ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"]
    
    var monsterNumber = 4 //use to determine color
    var monsterValue = "Yellow"
    var didUserFindGold = false
    var didUserFindMonster = false
    var didUserFallInPit = false
    var didUserQuitGame = false
    var openCellIndex: Int!
    var openCellVal: String!
    var finalScore = 0
    var userGamePlayPattern = [String]()
    var userGamePlayPatternIndex = [Int]()
    var isGameOver = false
    
    var isGuestGame = false

    override func viewDidLoad() {
        super.viewDidLoad()
        setNewGame()
    }
    
    func setNewGame() {
        numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        tempArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        numStr = ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"]
        
        monsterNumber = 4 //use to determine color
        monsterValue = "Yellow"
        didUserFindGold = false
        didUserFindMonster = false
        didUserFallInPit = false
        didUserQuitGame = false
        finalScore = 0
        userGamePlayPattern = [String]()
        userGamePlayPatternIndex = [Int]()
        isGameOver = false
        
        isGuestGame = false
        
        gridBlock1.isEnabled = true
        gridBlock2.isEnabled = true
        gridBlock3.isEnabled = true
        gridBlock4.isEnabled = true
        gridBlock5.isEnabled = true
        gridBlock6.isEnabled = true
        gridBlock7.isEnabled = true
        gridBlock8.isEnabled = true
        gridBlock9.isEnabled = true
        gridBlock10.isEnabled = true
        gridBlock11.isEnabled = true
        gridBlock12.isEnabled = true
        gridBlock13.isEnabled = true
        gridBlock14.isEnabled = true
        gridBlock15.isEnabled = true
        gridBlock16.isEnabled = true
        
        gridBlock1.setTitle("", for: .normal)
        gridBlock2.setTitle("", for: .normal)
        gridBlock3.setTitle("", for: .normal)
        gridBlock4.setTitle("", for: .normal)
        gridBlock5.setTitle("", for: .normal)
        gridBlock6.setTitle("", for: .normal)
        gridBlock7.setTitle("", for: .normal)
        gridBlock8.setTitle("", for: .normal)
        gridBlock9.setTitle("", for: .normal)
        gridBlock10.setTitle("", for: .normal)
        gridBlock11.setTitle("", for: .normal)
        gridBlock12.setTitle("", for: .normal)
        gridBlock13.setTitle("", for: .normal)
        gridBlock14.setTitle("", for: .normal)
        gridBlock15.setTitle("", for: .normal)
        gridBlock16.setTitle("", for: .normal)
        
        
        numbers = randomizeArray(array: numbers)
        newGame()
    }
    
    func randomizeArray(array: [Int]) -> [Int] {
        var arr = array
        for i in arr {
            let nElements = arr.count - i
            let n = Int(arc4random() % UInt32(nElements)) + i
                //UInt32((arc4random() % nElements) + i)
            arr.swapAt(i, n)
        }
        return arr
    }
    
    func newGame() {
        
        // Step 1: Get Index of 7, 11, 9, 1, 16, 5
        
        let indexOfGold = numbers.firstIndex(of: 7)
        let indexOfMonster = numbers.firstIndex(of: 11)
        let indexOfPitOne = numbers.firstIndex(of: 0)
        let indexOfPitTwo = numbers.firstIndex(of: 5)
        let indexOfPitThree = numbers.firstIndex(of: 9)
        let indexOfPitFour = numbers.firstIndex(of: 15)
        
        //7 is gold //11 is monster //9,1,16,5 are pits
        
        //______________________________________________________________________
        
        //Step 2: Find Adjacent to numbers
        
        var adjacentToMonster = [Int]()
        
        if indexOfMonster!+4 < 16 {
            adjacentToMonster.append(numbers[indexOfMonster!+4])
            
        }                              //Number Below
        if indexOfMonster!+1 < 16 && indexOfMonster!%4 != 3
        {
            adjacentToMonster.append(numbers[indexOfMonster!+1])
            
        }    //Number Right
        if indexOfMonster!-4 >= 0 { adjacentToMonster.append(numbers[indexOfMonster!-4]) }                              //Number Above
        if indexOfMonster!-1 >= 0 && indexOfMonster!%4 != 0 { adjacentToMonster.append(numbers[indexOfMonster!-1]) }    //number Left
        
        var adjacentToGold = [Int]()
        
        if indexOfGold!+4 < 16 { adjacentToGold.append(numbers[indexOfGold!+4]) }                              //Number Below
        if indexOfGold!+1 < 16 && indexOfGold!%4 != 3 { adjacentToGold.append(numbers[indexOfGold!+1]) }    //Number Right
        if indexOfGold!-4 >= 0 { adjacentToGold.append(numbers[indexOfGold!-4]) }                              //Number Above
        if indexOfGold!-1 >= 0 && indexOfGold!%4 != 0 { adjacentToGold.append(numbers[indexOfGold!-1]) }    //number Left
        
        var adjacentToPitOne = [Int]()
        
        if indexOfPitOne!+4 < 16 { adjacentToPitOne.append(numbers[indexOfPitOne!+4]) }                              //Number Below
        if indexOfPitOne!+1 < 16 && indexOfPitOne!%4 != 3 { adjacentToPitOne.append(numbers[indexOfPitOne!+1]) }    //Number Right
        if indexOfPitOne!-4 >= 0 { adjacentToPitOne.append(numbers[indexOfPitOne!-4]) }                              //Number Above
        if indexOfPitOne!-1 >= 0 && indexOfPitOne!%4 != 0 { adjacentToPitOne.append(numbers[indexOfPitOne!-1]) }    //number Left
        
        var adjacentToPitTwo = [Int]()
        
        if indexOfPitTwo!+4 < 16 { adjacentToPitTwo.append(numbers[indexOfPitTwo!+4]) }                              //Number Below
        if indexOfPitTwo!+1 < 16 && indexOfPitTwo!%4 != 3 { adjacentToPitTwo.append(numbers[indexOfPitTwo!+1]) }    //Number Right
        if indexOfPitTwo!-4 >= 0 { adjacentToPitTwo.append(numbers[indexOfPitTwo!-4]) }                              //Number Above
        if indexOfPitTwo!-1 >= 0 && indexOfPitTwo!%4 != 0 { adjacentToPitTwo.append(numbers[indexOfPitTwo!-1]) }    //number Left
        
        var adjacentToPitThree = [Int]()
        
        if indexOfPitThree!+4 < 16 { adjacentToPitThree.append(numbers[indexOfPitThree!+4]) }                              //Number Below
        if indexOfPitThree!+1 < 16 && indexOfPitThree!%4 != 3 { adjacentToPitThree.append(numbers[indexOfPitThree!+1]) }    //Number Right
        if indexOfPitThree!-4 >= 0 { adjacentToPitThree.append(numbers[indexOfPitThree!-4]) }                              //Number Above
        if indexOfPitThree!-1 >= 0 && indexOfPitThree!%4 != 0 { adjacentToPitThree.append(numbers[indexOfPitThree!-1]) }    //number Left
        
        var adjacentToPitFour = [Int]()

        if indexOfPitFour!+4 < 16 { adjacentToPitFour.append(numbers[indexOfPitFour!+4]) }                              //Number Below
        if indexOfPitFour!+1 < 16 && indexOfPitFour!%4 != 3 { adjacentToPitFour.append(numbers[indexOfPitFour!+1]) }    //Number Right
        if indexOfPitFour!-4 >= 0 { adjacentToPitFour.append(numbers[indexOfPitFour!-4]) }                              //Number Above
        if indexOfPitFour!-1 >= 0 && indexOfPitFour!%4 != 0 { adjacentToPitFour.append(numbers[indexOfPitFour!-1]) }    //number Left
        
        //print("For Gold 7 \(adjacentToGold), For Monster: 11 \(adjacentToMonster), For Pit 1: \(adjacentToPitOne), For Pit 5: \(adjacentToPitTwo), For Pit 9: \(adjacentToPitThree), For Pit 16: \(adjacentToPitFour)")
        
        //______________________________________________________________________
        
        //Step 3: Make Values
        
        for i in 0...adjacentToMonster.count-1 {
            let temp = numbers.firstIndex(of: adjacentToMonster[i])
            addValueToArray(index: temp!, value: 10)
        }
        
        for i in 0...adjacentToGold.count-1 {
            let temp = numbers.firstIndex(of: adjacentToGold[i])
            addValueToArray(index: temp!, value: 5)
        }
        
        for i in 0...adjacentToPitOne.count-1 {
            let temp = numbers.firstIndex(of: adjacentToPitOne[i])
            addValueToArray(index: temp!, value: 2)
        }
        
        for i in 0...adjacentToPitTwo.count-1 {
            let temp = numbers.firstIndex(of: adjacentToPitTwo[i])
            addValueToArray(index: temp!, value: 2)
        }
        
        for i in 0...adjacentToPitThree.count-1 {
            let temp = numbers.firstIndex(of: adjacentToPitThree[i])
            addValueToArray(index: temp!, value: 2)
        }
        
        for i in 0...adjacentToPitFour.count-1 {
            let temp = numbers.firstIndex(of: adjacentToPitFour[i])
            addValueToArray(index: temp!, value: 2)
        }
        //print(tempArray)
        
        //______________________________________________________________________
        
        //Step 4: Name Changing
        
        for i in 0...tempArray.count-1 {
            
            switch tempArray[i] {
            case 10:
                numStr[i] = "Smell"
            case 5:
                numStr[i] = "Glitter"
            case 2,4,6,8:
                numStr[i] = "Breeze"
            case 23,21,19,17:
                numStr[i] = "BGS"
            case 15:
                numStr[i] = "SG"
            case 7,9,11,13:
                numStr[i] = "GB"
            case 18,16,14,12:
                numStr[i] = "SB"
            case 0:
                numStr[i] = "X"
            default:
                print("Error# 874B3")
                let title = "Error"
                let message = "Failed to perform this action. Go back and try again.\n\n Visit gameral.com/WumpusWorld and contact us if you need more information."
                
                // Create the dialog
                let popup = PopupDialog(title: title, message: message)
                
                let okButton = CancelButton(title: "Okay") {
                    print("Close this screen and try again")
                }
                
                //popup.addButtons([noButton])
                popup.addButton(okButton)
                self.present(popup, animated: true, completion: nil)
            }//end of switch
        }//end of for
        
        numStr[indexOfMonster!] = "Monster"
        numStr[indexOfGold!] = "Gold"
        numStr[indexOfPitOne!] = "Pit"
        numStr[indexOfPitTwo!] = "Pit"
        numStr[indexOfPitThree!] = "Pit"
        numStr[indexOfPitFour!] = "Pit"
        
        //______________________________________________________________________
        //Step 5: Get monster number & set info label accordingly
        
        monsterNumber = getARandomNumber(limit: 4) + 1
        
        //______________________________________________________________________
        //Step 6: Based on the monster number change info label and tile colors
        
        switch monsterNumber {
        case 1:
            monsterValue = "Green"
            infoLabel.text = "Find Green wumpus in the hidden in the pattern. You can also finnd gold, that's optional."
            gridButtonColors(redValue: 113/255, greenValue: 194/255, blueValue: 133/255)
        case 2:
            monsterValue = "Red"
            infoLabel.text = "Find Red wumpus in the hidden in the pattern. You can also finnd gold, that's optional."
            gridButtonColors(redValue: 233/255, greenValue: 30/255, blueValue: 99/255)
        case 3:
            monsterValue = "Blue"
            infoLabel.text = "Find Blue wumpus in the hidden in the pattern. You can also finnd gold, that's optional."
            gridButtonColors(redValue: 74/255, greenValue: 144/255, blueValue: 226/255)
        case 4:
            monsterValue = "Yellow"
            infoLabel.text = "Find Yellow wumpus in the hidden in the pattern. You can also finnd gold, that's optional."
            gridButtonColors(redValue: 248/255, greenValue: 209/255, blueValue: 28/255)
        default:
            print("Error code #10736")
            let title = "Error"
            let message = "Failed to perform this action. Go back and try again.\n\n Visit gameral.com/WumpusWorld and contact us if you need more information."
            
            // Create the dialog
            let popup = PopupDialog(title: title, message: message)
            
            let okButton = CancelButton(title: "Okay") {
                print("Close this screen and try again")
            }
            
            //popup.addButtons([noButton])
            popup.addButton(okButton)
            self.present(popup, animated: true, completion: nil)
        }
        
        //______________________________________________________________________
        //Step 7: Open one box by default
        
        var tempNum: Int
        
        repeat {
            tempNum = getARandomNumber(limit: numbers.count)
        } while tempNum == indexOfMonster || tempNum == indexOfGold || tempNum == indexOfPitOne || tempNum == indexOfPitTwo || tempNum == indexOfPitThree || tempNum == indexOfPitFour
        
        let buttonsArray = [gridBlock1, gridBlock2, gridBlock3, gridBlock4, gridBlock5, gridBlock6, gridBlock7, gridBlock8, gridBlock9, gridBlock10,
                            gridBlock11, gridBlock12, gridBlock13, gridBlock14, gridBlock15, gridBlock16]
        
        buttonsArray[tempNum]?.layer.backgroundColor = UIColor.clear.cgColor
        buttonsArray[tempNum]?.setTitle("\(numStr[tempNum])", for: .normal)
        buttonsArray[tempNum]?.isEnabled = false
        
        openCellIndex = tempNum
        openCellVal = "\(numStr[tempNum])"
        
    }
    
    func gridButtonColors(redValue: CGFloat, greenValue: CGFloat, blueValue: CGFloat) {
        gridBlock1.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock2.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock3.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock4.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock5.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock6.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock7.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock8.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock9.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock10.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock11.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock12.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock13.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock14.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock15.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        gridBlock16.layer.backgroundColor = UIColor(displayP3Red: redValue, green: greenValue, blue: blueValue, alpha: 1.0).cgColor
        
    }
    
    func addValueToArray(index: Int, value: Int) {
        tempArray[index] = tempArray[index] + value
    }
    
    func getARandomNumber(limit: Int) -> Int {
        //Using it because we need to get a random number and open a block.
        let randNum = Int(arc4random() % UInt32(limit))
        return randNum
    }
    
//    func disableButtons() {
//
//        isGameOver = true
//        infoLabel.text = "This game is over. Press close to go back to menu and start a new game or see your updated scoreboad."
//        gridBlock1.isEnabled = false
//        gridBlock2.isEnabled = false
//        gridBlock3.isEnabled = false
//        gridBlock4.isEnabled = false
//        gridBlock5.isEnabled = false
//        gridBlock6.isEnabled = false
//        gridBlock7.isEnabled = false
//        gridBlock8.isEnabled = false
//        gridBlock9.isEnabled = false
//        gridBlock10.isEnabled = false
//        gridBlock11.isEnabled = false
//        gridBlock12.isEnabled = false
//        gridBlock13.isEnabled = false
//        gridBlock14.isEnabled = false
//        gridBlock15.isEnabled = false
//        gridBlock16.isEnabled = false
//    }
    
    func checkUserWin(button: UIButton) {
        
        if button.titleLabel?.text == "Monster" {
            //disableButtons()
            didUserFindMonster = true
            showWinDialogue(monsterValue: monsterNumber)
        } else if button.titleLabel?.text == "Gold" {
            finalScore = finalScore + 1
            didUserFindGold = true
        } else if button.titleLabel?.text == "Pit" {
            //disableButtons()
            finalScore = finalScore - 1
            didUserFallInPit = true
            //saveEverything()
            showLostDialogue()
        } else if button.titleLabel?.text == "Close" {
            finalScore = finalScore - 1
            //saveEverything()
            //self.dismiss(animated: true, completion: nil)
        }
        
    }
    
    func saveEverything() {
        //Send this data to cloud
    }
    
    
    @IBAction func gridBlock1Pressed(_ sender: Any) {
        
        if !gridBlock1.isEnabled {
            print("Its disabled")
        }
        
        gridBlock1.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock1.setTitle("\(numStr[0])", for: .normal)
        userGamePlayPattern.append("\(numStr[0])")
        userGamePlayPatternIndex.append(0)
        checkUserWin(button: gridBlock1)
        gridBlock1.isEnabled = false
    }
    
    @IBAction func gridBlock2Pressed(_ sender: Any) {
        
        if !gridBlock2.isEnabled {
            print("Its disabled 2")
        }
        
        gridBlock2.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock2.setTitle("\(numStr[1])", for: .normal)
        userGamePlayPattern.append("\(numStr[1])")
        userGamePlayPatternIndex.append(1)
        checkUserWin(button: gridBlock2)
        gridBlock2.isEnabled = false
    }
    
    @IBAction func gridBlock3Pressed(_ sender: Any) {
        gridBlock3.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock3.setTitle("\(numStr[2])", for: .normal)
        userGamePlayPattern.append("\(numStr[2])")
        userGamePlayPatternIndex.append(2)
        checkUserWin(button: gridBlock3)
        gridBlock3.isEnabled = false
    }
    
    @IBAction func gridBlock4Pressed(_ sender: Any) {
        gridBlock4.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock4.setTitle("\(numStr[3])", for: .normal)
        userGamePlayPattern.append("\(numStr[3])")
        userGamePlayPatternIndex.append(3)
        checkUserWin(button: gridBlock4)
        gridBlock4.isEnabled = false
    }
    
    @IBAction func gridBlock5Pressed(_ sender: Any) {
        gridBlock5.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock5.setTitle("\(numStr[4])", for: .normal)
        userGamePlayPattern.append("\(numStr[4])")
        userGamePlayPatternIndex.append(4)
        checkUserWin(button: gridBlock5)
        gridBlock5.isEnabled = false
    }
    
    @IBAction func gridBlock6Pressed(_ sender: Any) {
        gridBlock6.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock6.setTitle("\(numStr[5])", for: .normal)
        userGamePlayPattern.append("\(numStr[5])")
        userGamePlayPatternIndex.append(5)
        checkUserWin(button: gridBlock6)
        gridBlock6.isEnabled = false
    }
    
    @IBAction func gridBlock7Pressed(_ sender: Any) {
        gridBlock7.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock7.setTitle("\(numStr[6])", for: .normal)
        userGamePlayPattern.append("\(numStr[6])")
        userGamePlayPatternIndex.append(6)
        checkUserWin(button: gridBlock7)
        gridBlock7.isEnabled = false
    }
    
    @IBAction func gridBlock8Pressed(_ sender: Any) {
        gridBlock8.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock8.setTitle("\(numStr[7])", for: .normal)
        userGamePlayPattern.append("\(numStr[7])")
        userGamePlayPatternIndex.append(7)
        checkUserWin(button: gridBlock8)
        gridBlock8.isEnabled = false
    }
    
    @IBAction func gridBlock9Pressed(_ sender: Any) {
        gridBlock9.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock9.setTitle("\(numStr[8])", for: .normal)
        userGamePlayPattern.append("\(numStr[8])")
        userGamePlayPatternIndex.append(8)
        checkUserWin(button: gridBlock9)
        gridBlock9.isEnabled = false
    }
    
    @IBAction func gridBlock10Pressed(_ sender: Any) {
        gridBlock10.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock10.setTitle("\(numStr[9])", for: .normal)
        userGamePlayPattern.append("\(numStr[9])")
        userGamePlayPatternIndex.append(9)
        checkUserWin(button: gridBlock10)
        gridBlock10.isEnabled = false
    }
    
    @IBAction func gridBlock11Pressed(_ sender: Any) {
        gridBlock11.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock11.setTitle("\(numStr[10])", for: .normal)
        userGamePlayPattern.append("\(numStr[10])")
        userGamePlayPatternIndex.append(10)
        checkUserWin(button: gridBlock11)
        gridBlock11.isEnabled = false
    }
    
    @IBAction func gridBlock12Pressed(_ sender: Any) {
        gridBlock12.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock12.setTitle("\(numStr[11])", for: .normal)
        userGamePlayPattern.append("\(numStr[11])")
        userGamePlayPatternIndex.append(11)
        checkUserWin(button: gridBlock12)
        gridBlock12.isEnabled = false
    }
    
    @IBAction func gridBlock13Pressed(_ sender: Any) {
        gridBlock13.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock13.setTitle("\(numStr[12])", for: .normal)
        userGamePlayPattern.append("\(numStr[12])")
        userGamePlayPatternIndex.append(12)
        checkUserWin(button: gridBlock13)
        gridBlock13.isEnabled = false
    }
    
    @IBAction func gridBlock14Pressed(_ sender: Any) {
        gridBlock14.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock14.setTitle("\(numStr[13])", for: .normal)
        userGamePlayPattern.append("\(numStr[13])")
        userGamePlayPatternIndex.append(13)
        checkUserWin(button: gridBlock14)
        gridBlock14.isEnabled = false
    }
    
    @IBAction func gridBlock15Pressed(_ sender: Any) {
        gridBlock15.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock15.setTitle("\(numStr[14])", for: .normal)
        userGamePlayPattern.append("\(numStr[14])")
        userGamePlayPatternIndex.append(14)
        checkUserWin(button: gridBlock15)
        gridBlock15.isEnabled = false
    }
    
    @IBAction func gridBlock16Pressed(_ sender: Any) {
        gridBlock16.layer.backgroundColor = UIColor.clear.cgColor
        gridBlock16.setTitle("\(numStr[15])", for: .normal)
        userGamePlayPattern.append("\(numStr[15])")
        userGamePlayPatternIndex.append(15)
        checkUserWin(button: gridBlock16)
        gridBlock16.isEnabled = false
    }
    
    @IBAction func closePressed(_ sender: Any) {
        self.view.setNeedsLayout()
        self.view.layoutIfNeeded()
        self.viewDidLoad()
    }
    
    func showWinDialogue(monsterValue: Int) {
           
           switch monsterValue {
           case 1:
               
               //Green Monster score 4
               finalScore = finalScore + 4
               let title = "GAME SCORE: \(finalScore)"
               var message = " "
               
               if didUserFindGold {
                   message = "Green Wumpus gives you +4 and because you've found gold so it's an additional +1. Green wumpus has been added to your collection, open score board to view your overall score and collections."
               } else {
                   message = "Green Wumpus gives you +4 and because you haven't found gold so you are not getting extra score. Green wumpus has been added to your collection, open score board to view your overall score and collections."
               }
               
               let image = UIImage(named: "greenFound")

               let popup = PopupDialog(title: title, message: message, image: image)

               let buttonOne = CancelButton(title: "Restart Game") {
                self.view.setNeedsLayout()
                self.view.layoutIfNeeded()
                self.viewDidLoad()
               }

               popup.addButton(buttonOne)
               self.present(popup, animated: true, completion: nil)
               
           case 2:
               
              ///Red Monster score 3
               finalScore = finalScore + 3
               let title = "GAME SCORE: \(finalScore)"
               var message = " "
               
               if didUserFindGold {
                   message = "Red Wumpus gives you +3 and because you've found gold so it's an additional +1. Red wumpus has been added to your collection, open score board to view your overall score and collections."
               } else {
                   message = "Red Wumpus gives you +3 and because you haven't found gold so you are not getting extra score. Red wumpus has been added to your collection, open score board to view your overall score and collections."
               }

               let image = UIImage(named: "redFound")

               let popup = PopupDialog(title: title, message: message, image: image)
               
               let buttonOne = CancelButton(title: "Restart Game") {
                   self.view.setNeedsLayout()
                self.view.layoutIfNeeded()
                self.viewDidLoad()
               }
               
               popup.addButton(buttonOne)
               self.present(popup, animated: true, completion: nil)
               
           case 3:
               //vBlue Monster score 2
               finalScore = finalScore + 2
               let title = "GAME SCORE: \(finalScore)"
               var message = " "
               
               if didUserFindGold {
                   message = "Blue Wumpus gives you +2 and because you've found gold so it's an additional +1. Blue wumpus has been added to your collection, open score board to view your overall score and collections."
               } else {
                   message = "Blue Wumpus gives you +2 and because you haven't found gold so you are not getting extra score. Blue wumpus has been added to your collection, open score board to view your overall score and collections."
               }
               
               let image = UIImage(named: "blueFound")
    
               let popup = PopupDialog(title: title, message: message, image: image)
               
                 let buttonOne = CancelButton(title: "Restart Game") {
                   self.view.setNeedsLayout()
                    self.view.layoutIfNeeded()
                    self.viewDidLoad()
               }
               
               popup.addButton(buttonOne)
               self.present(popup, animated: true, completion: nil)
               
           case 4:
               // Yellow Monster score 1
               finalScore = finalScore + 1
               let title = "GAME SCORE: \(finalScore)"
               var message = " "
               
               
               if didUserFindGold {
                   message = "Yellow Wumpus gives you +1 and because you've found gold so it's an additional +1. Yellow wumpus has been added to your collection, open score board to view your overall score and collections."
               } else {
                  message = "Yellow Wumpus gives you +1 and because you haven't found gold so you are not getting extra score. Yellow wumpus has been added to your collection, open score board to view your overall score and collections."
               }
               let image = UIImage(named: "yellowFound")
       
               let popup = PopupDialog(title: title, message: message, image: image)
               
               let buttonOne = CancelButton(title: "Restart Game") {
                   self.view.setNeedsLayout()
                self.view.layoutIfNeeded()
                self.viewDidLoad()
               }
               
               popup.addButton(buttonOne)
               self.present(popup, animated: true, completion: nil)
               
               
           default:
               print("Error Code #50291")
               let title = "Error"
               let message = "Failed to perform this request. Go back and try again.\n\n Visit gameral.com/WumpusWorld and contact us if you need more information."
               
               // Create the dialog
               let popup = PopupDialog(title: title, message: message)
               
               let okButton = CancelButton(title: "Okay") {
                   print("Close this screen and try again")
               }
               
               //popup.addButtons([noButton])
               popup.addButton(okButton)
               self.present(popup, animated: true, completion: nil)
           }
           
           saveEverything()
       }
       
       
   func showLostDialogue() {
       
       var title = " "
       var message = " "
       
       
       if didUserFindGold {
           title = "GAME SCORE: 0"
           message = "You've fallen into pit. Which means your total score will be -1 but because you've found gold so you got +1 and thus your final score for this game is 0"
       } else {
           title = "GAME SCORE: -1"
           message = "You've fallen into pit. Which means your total score will be -1."
       }
       
       let image = UIImage(named: "fallenPit")
       
       let popup = PopupDialog(title: title, message: message, image: image)
       
       let buttonOne = CancelButton(title: "Restart Game") {
        self.view.setNeedsLayout()
        self.view.layoutIfNeeded()
        self.viewDidLoad()
       }
       
       popup.addButton(buttonOne)
       self.present(popup, animated: true, completion: nil)
   }

}

