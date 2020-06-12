import React, { Component } from 'react';
import MainNaivigator from './components/ScreenContainer';
import {Provider} from 'react-redux';
import configureStore from './components/store';



  // saveData(){
  //   let AR  = JSON.stringify(this.state.Arena);
  //   let CAP = JSON.stringify(this.state.cap);
  //   let CN = JSON.stringify(this.state.courtsNum);
  //   let CARRAY = JSON.stringify(this.state.courtArr);
  //   AsyncStorage.setItem('arena', AR);
  //   AsyncStorage.setItem('capacity', CAP);
  //   AsyncStorage.setItem('courtN', CN);
  //   AsyncStorage.setItem('courtA', CARRAY);
  // }

  //   loadData = async() =>{
  //   try{
  //     let mas = await AsyncStorage.getItem('master');
  //     let are = await AsyncStorage.getItem('arena');
  //     let cap = await AsyncStorage.getItem('capacity');
  //     let cNum = await AsyncStorage.getItem('courtN');
  //     let cArray = await AsyncStorage.getItem('courtA');
  //     this.state.Arena = JSON.parse(are);
  //     this.state.capacity = JSON.parse(cap);
  //     this.state.courtsNum = JSON.parse(cNum);
  //     this.state.courtArr = JSON.parse(cArray);
  //     this.setState({Arena:this.state.Arena})
  //     this.setState({capacity:this.state.capacity});
  //     this.setState({courtsNum:this.state.courtsNum});
  //     this.setState({courtArr:this.state.courtArr});

  //     this.props.navigation.navigate("MainActivity", {arena: this.state.Arena, cap:this.state.capacity, 
  //     courtsNum:this.state.courtsNum, courtArr: this.state.courtArr});
  //   }
  //   catch(error){
  //     console.log("ERROR")
  //     alert(error);
  //   }
  // }



export default class App extends Component {

  
//   componentDidMount= async()=>{
//      console.log("STORE ", configureStore.getState().masterListReducer)

//      try{
//       let mlr = await AsyncStorage.getItem('masterList');
//       configureStore.getState().masterListReducer = JSON.parse(mlr);
//     }
//     catch(error){
//       console.log("ERROR")
//       alert(error);
//     }
//     console.log("STORE ", configureStore.getState().masterListReducer)
// }


  render() {
    return (
    <Provider store={configureStore}>

    	<MainNaivigator/> 
    </Provider>    
    );
  }
}
