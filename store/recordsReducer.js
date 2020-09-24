
import{
    Alert,
  } from 'react-native';
import firebase from '../elements/Firebase';
  
  let temp = {}
  let date = new Date().toLocaleDateString("en-US").replace(/\//g, '-')
  let fullDate = new Date();

//   firebase.database().ref(`courts/${action.payload.court}/updated/`).set(date.toLocaleString('en-US'))

// firebase.database().ref('users/'+ this.state.handle+"/historical record/"+ this.state.date+'/'+
// this.state.loc).set({
//   win:0, loss:0


// var upvotesRef = db.ref("server/saving-data/fireblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");
// upvotesRef.transaction(function (current_value) {
//   return (current_value || 0) + 1;
// });



const recordsReducer=(record={}, action)=>{
    // console.log("RECRDS REDUCER", action)
    if(action.type === "WIN_LOSS"){
        // console.log("action winloss")
        for (handle in action.winLoss){
            // console.log("HANDLES", handle, date)
            let daily = firebase.database().ref('users/' + handle +"/historical-record/"+ date +'/'+action.courtName+'/'+action.winLoss[handle])
            daily.transaction(function (current_value){
                return (current_value || 0) + 1;
            });
            // console.log("TESTING RETURN ")
            let overall = firebase.database().ref('users/' + handle+"/overall-record/"+action.winLoss[handle])
            overall.transaction(function (current_value){
                return (current_value || 0) + 1;
            });
        
        }
        firebase.database().ref(`courts/${action.courtName}/updated/`).set(fullDate.toLocaleString('en-US'))
        // console.log("R",action.courtName)
        // console.log(acti)
        return ["NOTHIN"]
    }	
	return ["NOTHING"]

}
export default recordsReducer