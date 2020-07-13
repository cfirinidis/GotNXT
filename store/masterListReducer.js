import {ADD_MASTERLIST} from './types';
import {DELETE_PLAYER} from './types';
import {EDIT_PLAYER} from './types';
import {SHOOT_MASTERLIST} from './types';
import {CORRECT_MASTER} from './types';
import {DELETE_MASTER} from './types';
import {END_MASTER} from './types';
import {WINWIN_MASTER} from './types';
import {REMOVE_MASTER} from './types';
import {SETPREF_MASTER} from './types';


let test =  [

        
          ]  


const masterListReducer=(reduxMaster=test, action)=>{
	if(action.type === "ADD_MASTERLIST"){
    console.log("ADD MASTERLIST", action)
    reduxMaster.push([{pref:0}, action.data ])

    console.log("HEY REDUX",reduxMaster)
    return reduxMaster
	}

  if (action.type === "SHOOT_MASTERLIST"){
      let hit= [];
      let rest = [];
      let hitList = [];      
      for  (i in action.hitShot){
            hit.push({player: action.hitShot[i]["label"], replacement: false});
            hitList.push(action.hitShot[i]["label"]);
      }
      for (i in action.shooters){
        if (!hitList.includes(action.shooters[i]) ){
          rest.push({player: action.shooters[i], replacement: false});
        }
      }
      reduxMaster.splice(action.num, 0, [{pref:0}, rest])
      if (hit.length != 0){
        reduxMaster.unshift([{pref:0}, hit])
      }
  }

  if (action.type === "CORRECT_MASTER"){
    // console.log("CORRECT_MASTER: ")
    reduxMaster.unshift([{pref:"W"}, [{player: action.name, replacement: false}]] ) 
  }

  if (action.type === "UPDATE_MASTER"){
    // console.log("UPDATE_MASTER: ", action)
    let movePlayers = [] 
    for (i in action.move){
      movePlayers.push(action.move[i]['value'])
    }
    for(i=0; i<reduxMaster.length; i++){
      for (j = 0; j < reduxMaster[i][1].length ; j++){
        if (movePlayers.includes(reduxMaster[i][1][j]['player'])){
          reduxMaster[i][1].splice(j,1);
          j--;  
        if (reduxMaster[i][1].length == 0){
            reduxMaster.splice(i,1);
            i--;
          }
    }}}
    for(i in movePlayers){
       reduxMaster.unshift([{pref: 0},[{player:movePlayers[i], replacement: action.flag}]])
    }
  }

  if(action.type === "DELETE_MASTER"){
    // console.log("DELETE_MASTER: ", action)
    for (i in action.delArray){
      reduxMaster.splice(action.delArray[i]-i, 1)
  }}

  if(action.type === "END_MASTER"){
    // console.log("END_MASTER: ", action)
    reduxMaster.push([{pref:0}, action.temp])
  }

  if(action.type === "WINWIN_MASTER"){
    // console.log("WINWIN_MASTER", action)
    if (action.prefCourt.length == 0){
      reduxMaster.unshift([{pref:"W"}, action.winWin])
      return reduxMaster
    } 
    let t = action.prefCourt[0]['value']  
    reduxMaster.unshift([{pref: t[t.length - 1]}, action.winWin])
  }

  if(action.type === "SETPREF_MASTER"){
    // console.log("SETPREF_MASTER", action)
    if (action.prefCourt.length == 0){
      return reduxMaster
    } 

    let t = action.prefCourt[0]['value']  
    reduxMaster[action.prefPos][0]['pref'] = t[t.length - 1]
  }

  if(action.type === "REMOVE_MASTER"){
    // console.log("REMOVE_MASTER: ", action)
    for(i=0; i<reduxMaster.length ; i++){
      for (j=0; j<reduxMaster[i][1].length; j++){
        if (action.removePlayer.includes(reduxMaster[i][1][j]['player'])){
          reduxMaster[i][1].splice(j,1)
          j--;
        }}
      if (reduxMaster[i][1].length == 0){
          reduxMaster.splice(i,1);
          i--;
        }
      } 
  }

   if(action.type === "EDIT_MASTER"){
    // console.log("EDIT_MASTER: ", action)
      for(i=0; i< reduxMaster.length ; i++){
        for (j=0; j< reduxMaster[i][1].length; j++){
          if ( action.wrong == reduxMaster[i][1][j]['player']){
            reduxMaster[i][1][j]['player'] = action.right
      }}} 
   }

  // console.log("reduxMaster ", reduxMaster)
	return reduxMaster

}
export default masterListReducer