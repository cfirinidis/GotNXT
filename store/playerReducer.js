// import {CREATE_PLAYER} from './types';
// import {DELETE_PLAYER} from './types';
// import {EDIT_PLAYER} from './types';
import{
  Alert,
} from 'react-native';
import firebase from '../elements/Firebase';

let temp = ["CONZ", "LEBRON", "JORDAN", "BIRD"]
let date = new Date()

const compListReducer=(origCompList = temp, action)=>{
	
	if(action.type==="CREATE_PLAYER"){
		 console.log(' complistreducer ',action ,  origCompList)
		if(!( origCompList.includes(action.payload.data))){
			// console.log("ADDED")
			origCompList = [...origCompList, action.payload.data]
			firebase.database().ref(`courts/${action.payload.court}/list/`).set(origCompList) 
			firebase.database().ref(`courts/${action.payload.court}/updated/`).set(date.toLocaleString('en-US'))
		return origCompList
		}
		else{
			Alert.alert("SOMETHING")
		}}

	if (action.type === "DELETE_PLAYER"){
		// console.log("dEL red: ", action.payload.data)
      	for (name in action.payload.data){
			origCompList.splice(origCompList.indexOf(name), 1);
			firebase.database().ref(`courts/${action.payload.court}/list/`).set(origCompList)
			firebase.database().ref(`courts/${action.payload.court}/updated/`).set(date.toLocaleString('en-US'))
		}
		// console.log("AFTER DEL ",origCompList)
		return origCompList
	}
	if (action.type === "EDIT_PLAYER"){
		// console.log("EDIT PLAYER: ", action.payload)
		for (k in origCompList){
	    	if (origCompList[k] == action.payload.wrong){
				origCompList[k] = action.payload.right
				firebase.database().ref(`courts/${action.payload.court}/list/`).set(origCompList) 
				firebase.database().ref(`courts/${action.payload.court}/updated/`).set(date.toLocaleString('en-US'))
	      	// console.log(k)
	    }}
		// console.log("AFTER DEL ",origCompList)
		return origCompList
	}
	return origCompList

}
console.log("EXPORT")

export default compListReducer