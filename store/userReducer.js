import {LOGIN_USER} from './types';

let user = [{
	email: '',
	username: ''
}]


const loginUser=(user=[], action)=>{
	if (action.type === "LOGIN_USER"){
		user['email'] = action.email
		return user
	}
return user
}


export default loginUser;