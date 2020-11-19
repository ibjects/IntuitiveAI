//
//  MainViewController.swift
//  IntuitiveAIStimulator
//
//  Created by Chaudhry Talha on 10/31/20.
//  Copyright © 2020 ibjects. All rights reserved.
//

import Foundation
import UIKit
import PopupDialog

class MainViewController: UIViewController {
    
    @IBOutlet weak var b1: UIButton!
    @IBOutlet weak var b2: UIButton!
    @IBOutlet weak var b3: UIButton!
    @IBOutlet weak var b4: UIButton!
    @IBOutlet weak var b5: UIButton!
    @IBOutlet weak var b6: UIButton!
    @IBOutlet weak var b7: UIButton!
    @IBOutlet weak var b8: UIButton!
    @IBOutlet weak var b9: UIButton!
    @IBOutlet weak var b10: UIButton!
    @IBOutlet weak var b11: UIButton!
    @IBOutlet weak var b12: UIButton!
    @IBOutlet weak var b13: UIButton!
    @IBOutlet weak var b14: UIButton!
    @IBOutlet weak var b15: UIButton!
    @IBOutlet weak var b16: UIButton!
    
    var numbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    var numStr = ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"]
    
    var didUserFindGold = false
    var didUserFindMonster = false
    var didUserFallInPit = false
    var didUserRestartGame = false
    var openCellIndex: Int!
    var openCellVal: String!
    var finalScore = 0
    var userGamePlayPattern = [String]()
    var userGamePlayPatternIndex = [Int]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    @IBAction func restartButtonPress(_ sender: Any) {
        
    }
    
    @IBAction func infoButtonPressed(_ sender: Any) {
        
    }
    
    @IBAction func b1Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b2Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b3Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b4Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b5Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b6Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b7Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b8Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b9Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b10Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b11Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b12Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b13Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b14Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b15Pressed(_ sender: Any) {
        
    }
    
    @IBAction func b16Pressed(_ sender: Any) {
        
    }
    
}
