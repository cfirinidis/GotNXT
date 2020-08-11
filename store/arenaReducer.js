import {SETUP_ARENA} from './types';
import {ADDNUMS_ARENA} from './types';
import {ADDSET_PLAYER} from './types';


const arenaReducer=(arenaRedux=[], action)=>{
  if(action.type==="SETUP_ARENA"){
   // console.log("SETUP_ARENA TOP", action.gameStarted[0]['label'], action, arenaRedux)
    let courts = {};
    let arena = {};
    arena[action.courtName] = new Array();
    let count = 0;
    // console.log("OVERSIGHT", this.state.gamesStarted[0]["label"], answer)
    for (var i=0; i<action.courtsNum; i++){
        // console.log("COUNT::::", count)
        courts['teamA'] = new Array()
        courts['teamB'] = new Array()
        if(action.answer == "YES" && (count < action.gameStarted[0]["label"] || action.gameStarted[0]["label"] == "ALL")){
            courts['Num'] = i+1
            courts["teamANum"] = parseInt(action.capacity)
            courts["teamBNum"] = parseInt(action.capacity)
            for (let j =0; j<2 * action.capacity; j++){
              courts['teamA'].push([{"player": "*PLYR"+j + "CRT" + courts['Num'], "replacement": false, "member" : false  }])
                j++;
              courts['teamB'].push([{"player": "*PLYR"+j + "CRT" + courts['Num'], "replacement": false, "member" : false }])
            }
          count++;
        }
      else{     
              courts['Num'] = i+1
              courts["teamANum"] = 0
              courts["teamBNum"] = 0
          }  
          // console.log("courts", courts)
          arena[action.courtName].push( courts )
          // console.log("AFTER ARENA",arena)
         
          courts={}
      }//for loop
       // console.log( "SETUP ARENA: ", arenaRedux)
       arenaRedux.push(arena)
      return arenaRedux
    }

    if(action.type === 'CORRECT_ARENA'){
      // console.log("CORRECT ARENA" ,action)
      for (i=0; i< action.remplayer.length; i++){      
        for (k=0;  k< arenaRedux[0][action.courtName][action.tempNum-1][action.team].length; k++){
          if (action.remplayer[i]['label'] == arenaRedux[0][action.courtName][action.tempNum-1][action.team][k][0]["player"]){
            arenaRedux[0][action.courtName][action.tempNum-1][action.team].splice(k,1)
            arenaRedux[0][action.courtName][action.tempNum-1][action.team+"Num"] -= 1
            k--;
        }
      }}
      return arenaRedux
    }

  if(action.type==="ADDNUMS_ARENA"){
    // console.log(' ADDNUMS_ARENA ', arenaRedux, action)
    arenaRedux[0][action.courtName][action.current][action.team+"Num"] += action.mlSize;

    return arenaRedux
    }

  if(action.type === "ADDSET_ARENA"){
    // console.log("ADDSET", action)
    for (i in action.sets){
      arenaRedux[0][action.courtName][action.current][action.team].push([action.sets[i]]);
      }
    // console.log("ARENA REDUX AFTER",arenaRedux)
    return arenaRedux
  }




  return arenaRedux
}
export default arenaReducer