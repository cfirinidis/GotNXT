import React, { Component } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View } from 'react-native';
import MainNaivigator from './components/ScreenContainer'

export default class App extends Component {
  render() {
    return (
    <MainNaivigator/>     
    );
  }
}
