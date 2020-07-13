import {CREATE_PLAYER} from './types'
import {DELETE_PLAYER} from './types'
import {EDIT_PLAYER} from './types'
import {ADD_PLAYER} from './types'
import {DELETE_SHOOTER} from './types'
import {ADD_MASTERLIST} from './types'
import {SHOOT_MASTERLIST} from './types';
import {UPDATE_MASTER} from './types';
import {CORRECT_MASTER} from './types';
import {DELETE_MASTER} from './types';
import {EXTRACT_MASTER} from './types';
import {END_MASTER} from './types';
import {WINWIN_MASTER} from './types';
import {SETPREF_MASTER} from './types';
import {REMOVE_MASTER} from './types';
import {EDIT_MASTER} from './types';
import {SETUP_ARENA} from './types';
import {CORRECT_ARENA} from './types';
import {ADDNUMS_ARENA} from './types';
import {ADDSET_ARENA} from './types';
import {LOGIN_USER} from './types';
import {READ_COURT} from './types';
import {CREATE_COURT} from './types';
import {WIN_LOSS} from './types';


export const addToCompList = (name, courtName, displayName) =>{
	return{
		type: CREATE_PLAYER,
		payload:{
			data: name,
			court: courtName,
			displayName: displayName

		}}
};

export const addCourtToCompList = (courtName) =>{
	return{
		type: CREATE_COURT,
		payload:{
			court:courtName
		}}
};

export const delFromCompList = (names, courtName) =>{
	return{
		type: DELETE_PLAYER,
		payload:{
			data:names,
			court: courtName
		}}
};

export const editCompList = (right, wrong, courtName) =>{
	return{
		type: EDIT_PLAYER,
		payload:{
			right:right,
			wrong:wrong,
			court: courtName
		}}
};

export const addToShooters = (name) =>{
	return{
		type: ADD_PLAYER,
		payload:{
			data:name,
		}}
};

export const resetShooters = () =>{
	return{
		type: DELETE_SHOOTER
	}
};

export const addToReduxMaster = (data) =>{
	return{
		type: ADD_MASTERLIST,
		data: data
	}
};

export const shootML = (num, hitShot, shooters) =>{
	return{
		type: SHOOT_MASTERLIST,
		num: num,
		hitShot: hitShot,
		shooters: shooters
	}
};

export const reduxUpdateMaster = (move, repFlag) =>{
	return{
		type: UPDATE_MASTER,
		move: move,
		flag: repFlag
	}
};

export const correctOrSub = (name) =>{
	return{
		type: CORRECT_MASTER,
		name:name
	}
};

export const removeFromMLRedux=(delArray)=>{
	return{
		type: DELETE_MASTER,
		delArray:delArray 
	}
}

export const endGameMLRedux=(temp)=>{
	return{
		type: END_MASTER,
		temp:temp
	}
}

export const winWinRedux=(prefCourt, winWin)=>{
	return{
		type: WINWIN_MASTER,
		prefCourt: prefCourt,
		winWin: winWin
	}
}

export const removeRedux=(removePlayer)=>{
	return{
		type: REMOVE_MASTER,
		removePlayer: removePlayer
	}
}


export const setPrefRedux=(prefCourt, prefPos)=>{
	return{
		type: SETPREF_MASTER,
		prefCourt: prefCourt,
		prefPos: prefPos
	}
}

export const editMSRedux=(right, wrong, courtName)=>{
	return{
		type: EDIT_MASTER,
		right:right,
		wrong: wrong,
		court: courtName
	}
}

export const setupArena=(courtsNum, capacity, gameStarted, answer, courtName)=>{
	return{
		type: SETUP_ARENA,
		courtsNum: courtsNum,
		capacity: capacity,
		gameStarted: gameStarted,
		answer: answer,
		courtName : courtName
	}
}

export const arenaCorOrSub=(remplayer, tempNum, team, courtName)=>{
	return{
		type: CORRECT_ARENA,
		remplayer: remplayer,
		tempNum: tempNum,
		team: team,
		courtName : courtName
	}
}

export const updatePlayerNums=(current, team, mlSize, courtName)=>{
	return{
		type: ADDNUMS_ARENA,
		current: current,
		team: team,
		mlSize: mlSize,
		courtName : courtName
	}
}

export const loginUser=(username, email)=>{
	return{
		type: LOGIN_USER,
		username: username,
		email, email
	}
}

export const addSet=(current, team, sets, courtName)=>{
	return{
		type: ADDSET_ARENA,
		current: current,
		team, team,
		sets, sets,
		courtName : courtName
	}
}

export const readCourts=(courtName)=>{
	return{
		type: READ_COURT,
		courtName: courtName
	}
}

export const winLossResults=(winLoss, courtName)=>{
	return{
		type: WIN_LOSS,
		winLoss: winLoss,
		courtName: courtName
	}
}