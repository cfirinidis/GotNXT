import {createStore, combineReducers} from "redux";
import compListReducer from '../store/playerReducer';
import shooterReducer from '../store/shooterReducer';
import masterListReducer from '../store/masterListReducer';
import arenaReducer from '../store/arenaReducer';
import loginUser from '../store/userReducer';
import readCourtReducer from "../store/readCourtReducer";





const ourDepartment = combineReducers({
	compListReducer: compListReducer,
	shooterReducer: shooterReducer,
	masterListReducer: masterListReducer,
	arenaReducer: arenaReducer,
	loginUser: loginUser,
	readCourtReducer: readCourtReducer
});

const configureStore=createStore(ourDepartment);

console.log("TIMES IT HIT")
export default configureStore