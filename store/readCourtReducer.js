import {CREATE_PLAYER} from './types';
import {DELETE_PLAYER} from './types';
import {READ_COURT} from './types';

const readCourtReducer=(dbcourts = [], action)=>{
    // console.log("action READCOURT",action)
    if(action.type==="READ_COURT"){
        // console.log("READ COURT INSIDE",action.courtName)
        dbcourts=action.courtName
        return dbcourts
    }	
	return dbcourts

}
export default readCourtReducer