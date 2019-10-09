import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import MainActivity from './Main'; 
import Setup from './Setup'
import ShowList from './ListPage'

const MainNavigator = createStackNavigator({
    Main: { 
        screen: Setup,
    },
    List: {
    	screen: MainActivity,
    },
    Show: {
    	screen: ShowList,
    }
  
});


const App = createAppContainer(MainNavigator);
export default App;