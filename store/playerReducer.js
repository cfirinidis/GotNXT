import {CREATE_PLAYER} from './types';
import {DELETE_PLAYER} from './types';
import {EDIT_PLAYER} from './types';
import{
  Alert,
} from 'react-native';


const compListReducer=(origCompList=[], action)=>{
	if(action.type==="CREATE_PLAYER"){
		// console.log(' reducer ',action ,  origCompList)
		if(!( origCompList.includes(action.payload.data))){
			// console.log("ADDED")
		return [...origCompList, action.payload.data]
		}
		else{
			Alert.alert("SOMETHING")
		}}

	if (action.type === "DELETE_PLAYER"){
		// console.log("dEL red: ", action.payload.data)
      	for (name in action.payload.data){
			origCompList.splice(origCompList.indexOf(name), 1);
		}
		// console.log("AFTER DEL ",origCompList)
		return origCompList

	}
	if (action.type === "EDIT_PLAYER"){
		// console.log("EDIT PLAYER: ", action.payload)
		for (k in origCompList){
	    	if (origCompList[k] == action.payload.wrong){
	    		origCompList[k] = action.payload.right 
	      	// console.log(k)

	    }}
		// console.log("AFTER DEL ",origCompList)
		return origCompList
	}
	return origCompList

}
export default compListReducer