import{
  Alert,
} from 'react-native';
import firebase from '../elements/Firebase';

let temp = {}
let date = new Date()

const compListReducer=(origCompList = temp, action)=>{
	if(action.type==="CREATE_COURT"){
		console.log("**************CREATE COURT*******************************")
		origCompList[action.payload.court] = {}
		console.log("BEFORE RETURN",origCompList)
		return origCompList
	}

	if(action.type==="CREATE_PLAYER"){
		//  console.log(' complistreducer ',action ,  origCompList)
	
		if(!( action.payload.data in origCompList)) {
			// console.log("ADDED", origCompList[action.payload.court])
			// origCompList[action.payload.court].push(t)
			origCompList[action.payload.court][action.payload.data] = action.payload.displayName
			// origCompList[action.payload.court]
			console.log("AFETR DUMB CHANGES", origCompList, origCompList[action.payload.court])
			// origCompList[action.payload.court][action.payload.data].push(action.payload.displayName)
			// origCompList[action.payload.court]=[action.payload.data]
			// origCompList[action.payload.court].push(action.payload.data: action.payload.displayName)
			firebase.database().ref(`courts/${action.payload.court}/list/`).set(    origCompList[action.payload.court]   ) 
			console.log('date in :', date.toLocaleString('en-US'))
			firebase.database().ref(`courts/${action.payload.court}/updated/`).set(date.toLocaleString('en-US'))
			console.log('date in after :', date.toLocaleString('en-US'))
		return origCompList
		}
		else{
			Alert.alert("SOMETHING")
		}}

	if (action.type === "DELETE_PLAYER"){
		// console.log("dEL ORIGCOMP: ", action, action.payload.data[0]['player'], origCompList, origCompList[action.payload.court][action.payload.data[0]['player'].toLowerCase()])
			for (i in action.payload.data){
			delete origCompList[action.payload.court][action.payload.data[i]['player'].toLowerCase()]
			}
			firebase.database().ref(`courts/${action.payload.court}/list/`).set(origCompList)
			firebase.database().ref(`courts/${action.payload.court}/updated/`).set(date.toLocaleString('en-US'))
		
		// console.log("AFTER DEL ",origCompList)
		return origCompList
	}
	if (action.type === "EDIT_PLAYER"){
		// console.log("EDIT PLAYER: ", action.payload)
		for (k in origCompList[action.payload.court]){
			// console.log("FOr", k, origCompList[action.payload.court])
	    	if (origCompList[action.payload.court][k] == action.payload.wrong){
				origCompList[action.payload.court][k] = action.payload.right
				firebase.database().ref(`courts/${action.payload.court}/list/`).set(origCompList[action.payload.court]) 
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