import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';

function About(props) {
    return (
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.container}>
            <Text>{`Intuitive AI Simulator is created to generate data for an ongoing Artificial Intelligence experiment on intuition. Please consider that we take privacy very seriously and no data except for the games you play is being gathered. That is the reason why we don't ask for any login or any other personal information.\n\nWhen you play a game in this simulator mobile app you are basically taking decisions based on your intuition weather you are intentionally doing it or unintentionally. The pattern on which you open boxes to achieve the goal is all that we need for this study. The code of how this simulator was developed is open-source and the games data is also available to the public. But no personal information even your total scores are not shared. If you have any concerns/comments please contact us.\n\nVisit the official IntuitiveAI Website:`}</Text>

            <TouchableOpacity onPress={() => {
                Linking.openURL('https://intuitive-ai.web.app/')
            }}>
                <Text style={styles.linkText}>https://intuitive-ai.web.app/</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                Linking.openURL('https://ibjects.gitbook.io/intuitiveai/')
            }}>
                <Text style={[styles.linkText, { paddingTop: 10, paddingBottom: 10, fontWeight: 'bold' }]}>Official Documentation ⟶</Text>
            </TouchableOpacity>
            <Text>{`IntuitiveAI is an experiment by ibjects. Our aim is to use technology for social impact.`}</Text>
            <TouchableOpacity onPress={() => {
                Linking.openURL('https://www.ibjects.com/')
            }}>
                <Text style={[styles.linkText, { paddingTop: 10, paddingBottom: 10, fontWeight: 'bold' }]}>Visit ibjects.com ⟶</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                Linking.openURL('https://forms.gle/Mw4yyE2b4X8mBPgs6')
            }}>
                <Text style={[styles.linkText, { paddingTop: 10, paddingBottom: 10, fontWeight: 'bold' }]}>Contact Us ⟶</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

//https://forms.gle/Mw4yyE2b4X8mBPgs6

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    linkText: {
        color: 'blue'
    }
})

export default About;