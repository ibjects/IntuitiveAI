import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';

function App(props) {

  // const randColor = () => {

  //   var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
  //   function populate(a) {
  //     for (var i = 0; i < 6; i++) {
  //       var x = Math.round(Math.random() * 14);
  //       var y = hexValues[x];
  //       a += y;
  //     }
  //     return a;
  //   }

  //   var newColor1 = populate('#');
  //   var newColor2 = populate('#');
  //   // var angle = Math.round(Math.random() * 360);

  //   return [newColor1, newColor2]
  // }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollFlex}>
        <View>
          <Image style={styles.logo} source={require('./src/img/intuitiveai-simulator-logo.png')} />
          <Text style={styles.desc}>Find 👹 in the grid below to win. An optional but encouraged task is to Find 💰 before monster for extra point. If you Fall in 🕳️ you'll lose the game.</Text>
        </View>

        {/* <View style={styles.gameContainer}> */}
        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.idleButton}
          // onPress={() => navigate('HomeScreen')}
          >
            <Text style={styles.btnText}>?</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.scoreBoard}>
          <Text style={{ fontWeight: 'bold' }}>Total Score: 0</Text>
          <Text>Captured 👹 0 times</Text>
          <Text>Found 💰 0 times</Text>
          <Text>Fall in 🕳️ 0 times</Text>
        </View>

        {/* </View> */}

        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerBtn}>
            <View>
              <Text style={styles.footerBtnText}>🔄 New Game</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtn}>
            <View>
              <Text style={styles.footerBtnText}>❓ How To</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtn}>
            <View>
              <Text style={styles.footerBtnText}>📖 Docs</Text>
            </View>
          </TouchableOpacity>

          {/* <Text>IntuitiveAI Stimulator v1.0 | by ibjects.com</Text> */}

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "dimgray",

  },
  scrollFlex: {
    alignContent: 'center'
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  desc: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  },
  // gameContainer: {
  //   backgroundColor: 'green',
  //   padding: 8,
  //   margin: 10,
  //   borderRadius: 5,
  //   shadowOffset: { width: 0, height: 0, },
  //   shadowColor: 'black',
  //   shadowOpacity: 0.2,
  //   // alignContent: 'space-between',
  // },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    marginTop: 5,
    // margin: 10,
    shadowOffset: { width: 0, height: 0, },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  scoreBoard: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowOffset: { width: 0, height: 0, },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  idleButton: {
    marginRight: 5,
    marginLeft: 5,
    // marginBottom: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
    // margin: 2,
    backgroundColor: 'white',
    minWidth: 80,
    minHeight: 80,
    borderRadius: 5,
    justifyContent: 'center',
    // borderWidth: 1,
    borderColor: '#fff'
  },
  btnText: {
    color: '#000',
    // textAlign: 'center',
    fontSize: 20,
    alignSelf: 'center',
    // paddingLeft: 10,
    // paddingRight: 10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // padding: 5
  },
  footerBtn: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 2,
    width: '30%',
    borderRadius: 5,
  },
  footerBtnText: {
    alignSelf: 'center',
    fontSize: 12,
  }
})

export default App;