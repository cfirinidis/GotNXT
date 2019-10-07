import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import MainActivity from './start'; 

const MainNavigator = createStackNavigator({
    Main: { 
        screen: MainActivity,
    }
  
});


const App = createAppContainer(MainNavigator);
export default App;