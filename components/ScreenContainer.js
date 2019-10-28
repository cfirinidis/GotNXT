import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import MainActivity from './Main'; 
import Setup from './Setup';
import ShowList from './ListPage';
import PopUp from './PopUp';

const MainNavigator = createStackNavigator({
    Main: { 
        screen: Setup,
    },
    List: {
    	screen: MainActivity,
    },
    Show: {
    	screen: ShowList,
    },
    Test: {
    	screen: PopUp,
    }
  
});


const App = createAppContainer(MainNavigator);
export default App;