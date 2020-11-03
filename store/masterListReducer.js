// import {ADD_MASTERLIST} from './types';
// import {DELETE_PLAYER} from './types';
// import {EDIT_PLAYER} from './types';
// import {SHOOT_MASTERLIST} from './types';
// import {CORRECT_MASTER} from './types';
// import {DELETE_MASTER} from './types';
// import {END_MASTER} from './types';
// import {WINWIN_MASTER} from './types';
// import {REMOVE_MASTER} from './types';
// import {SETPREF_MASTER} from './types';


let test =  [

  // [{pref:0}, [{player: "Lebron", replacement: false}, {player:"AntDavis", replacement: false}]],
  //  [{pref:0}, [{player:"Kyrie", replacement: true}, {player:"Durant", replacement: true}]],
  // [{pref:0}, [{player:"Majerle", replacement: false}]],
  // [{pref:0}, [{player:"Kawhi", replacement: false}, {player:"PG13", replacement: false}]],
  //  [{pref:0}, [{player:'Larry', replacement: false}, {player:'Parish', replacement: false}]], 
  //   [{pref:0}, [{player:'Kidd', replacement: false}]]
  //   ,
  //     [{pref:0}, [{player: "Lebron1", replacement: false}, {player:"Ant1Davis", replacement: false}]],
  //  [{pref:0}, [{player:"Kyrie1", replacement: true}, {player:"Dur1ant", replacement: true}]],
  // [{pref:0}, [{player:"Majerle1", replacement: false}]],
  // [{pref:0}, [{player:"Kawhi1", replacement: false}, {player:"PG113", replacement: false}]],
  //  [{pref:0}, [{player:'Larr1y', replacement: false}, {player:'Pa1rish', replacement: false}]], 
  //   [{pref:0}, [{player:'Kidd1', replacement: false}]]
  //   ,
  //     [{pref:0}, [{player: "Le2bron", replacement: false}, {player:"Ant2Davis", replacement: false}]],
  //  [{pref:0}, [{player:"Ky2rie", replacement: true}, {player:"Dura2nt", replacement: true}]],
  // [{pref:0}, [{player:"Majer2le", replacement: false}]],
  // [{pref:0}, [{player:"Kawh2i", replacement: false}, {player:"P2G13", replacement: false}]],
  //  [{pref:0}, [{player:'Lar2ry', replacement: false}, {player:'Par2ish', replacement: false}]], 
  //   [{pref:0}, [{player:'Ki2dd', replacement: false}]]
          ]  


const masterListReducer=(reduxMaster=test, action)=>{
	if(action.type === "ADD_MASTERLIST"){
    // console.log("ADD MASTERLIST", action)
    reduxMaster.push([{pref:0}, action.data ])

    // console.log("HEY REDUX",reduxMaster)
    return reduxMaster
	}

  if (action.type === "SHOOT_MASTERLIST"){
      let hit= [];
      let rest = [];
      let hitList = [];      
      for  (i in action.hitShot){
            let mem = (action.hitShot[i]['label'].toLowerCase() in action.members) ? true : false
            hit.push({player: action.hitShot[i]["label"], replacement: false, member:mem});
            hitList.push(action.hitShot[i]["label"]);
      }
      for (i in action.shooters){
        if (!hitList.includes(action.shooters[i]) ){
          let mem = (action.shooters[i].toLowerCase() in action.members) ? true : false
          rest.push({player: action.shooters[i], replacement: false, member:mem});
        }
      }
      reduxMaster.splice(action.num, 0, [{pref:0}, rest])
      if (hit.length != 0){
        reduxMaster.unshift([{pref:0}, hit])
      }
  }

  if (action.type === "CORRECT_MASTER"){
    // console.log("CORRECT_MASTER: ", action)
    let mem = (action.name.toLowerCase() in action.members) ? true : false
    // console.log("MEM: ", mem)
    reduxMaster.unshift([{pref:"W"}, [{player: action.name, replacement: false, member: mem}]] ) 
  
    // console.log("CORRECT MASTER BOTTOM ", reduxMaster)
  }
  
  if (action.type === "UPDATE_MASTER"){
    console.log("UPDATE_MASTER: ", action)
    let movePlayers = [] 
    for (i in action.move){
      movePlayers.push(action.move[i]['value'])
    }

    for(i=0; i<reduxMaster.length; i++){
        for (j = 0; j < reduxMaster[i][1].length ; j++){
          if (movePlayers.includes(reduxMaster[i][1][j]['player'])){
                reduxMaster[i][1].splice(j,1);
                j--;  
              }
            }  
        if (reduxMaster[i][1].length == 0){
              reduxMaster.splice(i,1);
              i--;
            }
  }
    for(i in movePlayers){
      let mem = (movePlayers[i].toLowerCase() in action.members) ? true : false
       reduxMaster.unshift([{pref: 0},[{player:movePlayers[i], replacement: action.flag, member:mem}]])
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

  console.log("reduxMaster ", reduxMaster)
	return reduxMaster

}
export default masterListReducer