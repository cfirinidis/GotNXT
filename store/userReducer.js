// import {LOGIN_USER} from './types';

let user = [{
	email: '',
	username: ''
}]


const loginUser=(user=[], action)=>{
	// console.log("LOGIN USER",action)
	if (action.type === "LOGIN_USER"){
		user['email'] = action.email
		user['username'] = action.username
		return user
	}
return user
}


export default loginUser;