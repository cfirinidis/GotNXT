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


export const addToCompList = (name) =>{
	return{
		type: CREATE_PLAYER,
		payload:{
			data:name,
		}}
};

export const delFromCompList = (names) =>{
	return{
		type: DELETE_PLAYER,
		payload:{
			data:names
		}}
};

export const editCompList = (right, wrong) =>{
	return{
		type: EDIT_PLAYER,
		payload:{
			right:right,
			wrong:wrong
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

export const editMSRedux=(right, wrong)=>{
	return{
		type: EDIT_MASTER,
		right:right,
		wrong: wrong
	}
}

export const setupArena=(courtsNum, capacity, gameStarted, answer)=>{
	return{
		type: SETUP_ARENA,
		courtsNum: courtsNum,
		capacity: capacity,
		gameStarted: gameStarted,
		answer: answer
	}
}

export const arenaCorOrSub=(remplayer, tempNum, team)=>{
	return{
		type: CORRECT_ARENA,
		remplayer: remplayer,
		tempNum: tempNum,
		team: team,
	}
}

export const updatePlayerNums=(current, team, mlSize)=>{
	return{
		type: ADDNUMS_ARENA,
		current: current,
		team: team,
		mlSize: mlSize
	}
}

export const loginUser=(username, email)=>{
	return{
		type: LOGIN_USER,
		username: username,
		email, email
	}
}
