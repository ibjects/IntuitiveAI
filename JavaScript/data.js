firebase.initializeApp({
    apiKey: "AIzaSyB6Y90mcjpTH9R68ezwVibdRSN6afkHEgw",
    authDomain: "intuitive-ai.firebaseapp.com",
    databaseURL: "https://intuitive-ai.firebaseio.com",
    projectId: "intuitive-ai",
    storageBucket: "intuitive-ai.appspot.com",
    messagingSenderId: "653220018768",
    appId: "1:653220018768:web:d1e3cc951196e3f3406f55",
    measurementId: "G-YWTXQCWZ6T"
})

function getGames() {
    
    var db = firebase.firestore();
    
    db.collection('Games').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc, i) {
    
    console.log(doc.id, " => ", doc.data());
            //renderGame(doc);
            
    var table = document.querySelector('.gamesData');
    var row = table.insertRow(i+1);
            
    var cellGameID = row.insertCell(0);
    cellGameID.innerHTML = doc.id;
    
    var celldidUserFallInPit = row.insertCell(1);
    celldidUserFallInPit.innerHTML = doc.data().didUserFallInPit;
            
    var celldidUserFoundGold = row.insertCell(2);
    celldidUserFoundGold.innerHTML = doc.data().didUserFindGold;
            
    var celldidUserFindMonster = row.insertCell(3);
    celldidUserFindMonster.innerHTML = doc.data().didUserFindMonster;
    
    var cellfinalScore = row.insertCell(4);
    cellfinalScore.innerHTML = doc.data().finalScore;
            
    var cellgameArrayPattern = row.insertCell(5);
    cellgameArrayPattern.innerHTML = doc.data().gameArrayPattern;
            
    var cellgameArrayPatternIndex = row.insertCell(6);
    cellgameArrayPatternIndex.innerHTML = doc.data().gameArrayPatternIndex;     
            
    var celluserGamePlayPattern = row.insertCell(7);
    celluserGamePlayPattern.innerHTML = doc.data().userGamePlayPattern;
            
    var celluserGamePlayPatternIndex = row.insertCell(8);
    celluserGamePlayPatternIndex.innerHTML = doc.data().userGamePlayPatternIndex; 
    
    var celllogEntyDate = row.insertCell(9);
    celllogEntyDate.innerHTML = doc.data().logEntyDate;
            
    var celluserIP = row.insertCell(10);
    celluserIP.innerHTML = doc.data().userIP;
                    
        });
    })
    .catch(function(error) {
        console.log("Error getting: ", error);
    });
}

function renderGame(doc) {

            
//                <td>logEntyDate</td>
//                <td>userIP</td>
//                <td>userDevice</td>
//                <td>dateCreated</td>
//                <td>dateUpdated</td>
//                <td>playedBy</td>
}

getGames();