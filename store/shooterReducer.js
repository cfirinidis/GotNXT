import {CREATE_PLAYER} from './types';
import {DELETE_SHOOTER} from './types';
import {EDIT_PLAYER} from './types';
import {ADD_PLAYER} from './types';
import{} from 'react-native';

const shooterReducer=(shooters=[], action)=>{
  if(action.type==="ADD_PLAYER"){
    // console.log(' shootereducer ',action ,  shooters)
    return [...shooters, action.payload.data]
    }
  // console.log("BOTTOM", shooters)

  if(action.type==="DELETE_SHOOTER"){
    // console.log(' reset shooter ')
    return []
    }
  return shooters

}
export default shooterReducer



