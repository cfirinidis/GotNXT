import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import MainActivity from './Main'; 
import Setup from './Setup';
import ShowList from './ListPage';
import PopUp from './PopUp';
import ModalExample from './Modal'
import StartFunction from './function'
import EditNames from './Edit'


const MainNavigator = createStackNavigator({
    Main: { 
        screen: Setup,
    },
    EditNames:{
        screen: EditNames,
    },
    List: {
    	screen: MainActivity,
        
    },
    Show: {
    	screen: ShowList,
    },
    Test: {
    	screen: PopUp,
    },
    Modal: {
        screen: ModalExample,
    },
    Functions: {
        screen: StartFunction,
    }

});


const App = createAppContainer(MainNavigator);
export default App;