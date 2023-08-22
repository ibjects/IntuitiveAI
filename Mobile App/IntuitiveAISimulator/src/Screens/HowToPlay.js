import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

function HowToPlay(props) {
    return (
        <View style={styles.container}>
            <Text>Your goal is to Find 👹 and an optional but encouraged task is to Find 💰 before finding the monster. Falling in 🕳️ will end in game lost.</Text>
            <Text>{'\n'}💨 Wind - Indicates there are 🕳️ in the adjacent boxes. {'\n'}{'\n'}
                ✨ Glitter - Indicates there is 💰 in the adjacent boxes. {'\n'}{'\n'}
                👃 Smell - Indicates there is 👹 in the adjacent boxes. {'\n'}{'\n'}
                ❎ Nothing - Indicates that there is other hints in the adjacent boxes.{'\n'}</Text>
            <Text>Combination of the hints for example ✨👃 - Indicates that there is 💰 and 👹 in the adjacent boxes etc.</Text>
            <Text>{'\n'}Finding 👹 will give you +1 score. Falling in the 🕳️ will give you -1 score. Finding 💰 before finding the 👹 you'll get 2 points for that game and finding 💰 before falling in the 🕳️ you'll get 0 points for that game.</Text>

            <TouchableOpacity onPress={() => {
                Linking.openURL('https://www.youtube.com/watch?v=teA7iGtf4SA&feature=youtu.be')
            }}>
                <Text style={[styles.linkText, { paddingTop: 10, paddingBottom: 10, fontWeight: 'bold' }]}>Video: How To Play ⟶</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    linkText: {
        color: 'blue'
    }
})

export default HowToPlay;