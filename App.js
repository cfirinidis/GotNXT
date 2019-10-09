
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import MainNaivigator from './components/ScreenContainer'



export default class App extends Component {
  render() {
    return (
    <MainNaivigator/>     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


 // <View style={styles.container}>
 //        <Text style={styles.welcome}>Got000000000000NXT!</Text>
 //        <Text style={styles.instructions}>To get started, edit App.js</Text>
 //        <Text style={styles.instructions}>{instructions}</Text>
 //        <MainNaivigator/>
 //      </View>