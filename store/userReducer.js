import {LOGIN_USER} from './types';

let user = [{
	email: '',
	username: ''
}]


const loginUser=(user=[], action)=>{
	if (action.type === "LOGIN_USER"){

		console.log("LOGIN_USER", action)
		user['email'] = action.email
		console.log(user)
		return user
	}
return user
}


export default loginUser;