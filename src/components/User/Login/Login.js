import SinglePageHead from "../../SinglePageHead/SinglePageHead";
import { Link } from 'react-router-dom';
import * as userService from '../../../services/userService';
import { useHistory } from "react-router";
import { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import Notification from "../Notification/Notification";
import "./Login.css"




const Login =  ({}) => {
	let errors = []
let success = [`Sucessful Login! Redirecting...`]
const initialNotificationState = {type:'', message: []}

	errors =[]
	const [notification, setNotification] = useState(initialNotificationState)
	const [showNotification, setShowNotification] = useState(false);
	
const closeNotification = () => {
	setShowNotification(false)
	setNotification(initialNotificationState)
}
	const { exposeUserInfo } = useContext(AuthContext)
	let history = useHistory();
	let userLogin = async (e) => {
		errors = []
		e.preventDefault();
		const formData = new FormData(e.target);
		let {username, password} = Object.fromEntries(formData)

		const result = await userService.getBearerToken({username,password})
		 if (result.user !==undefined) {
			const user = {...result, token:result.token}
			exposeUserInfo(user);
			localStorage.setItem('user', JSON.stringify(user))
			setShowNotification(true)
			setNotification({
				type:'success',
				message: success
			})
		
			setTimeout(() => {history.push("/")}, 2000)
		 } else {
			errors.push('Invalid username or wrong password.')

		 }
	
		 if (errors.length > 0 ) {
			setShowNotification(true)
			setNotification({
				type:'error',
				message: errors
			})
		 }

	}
	return (
		<>
		<SinglePageHead pageInfo={{name:'Login', slug:'login' }}/>
	
		<div className="main">

		<p className="sign" align="center">Sign in</p>
		{showNotification==true ? <Notification type={notification.type} message={notification.message} closeNotification={closeNotification} /> : '' }
		<form className="form1" method="POST" onSubmit={userLogin}>
		  <input className="un " type="text" name="username" align="center" placeholder="Username" />
		  <input className="pass" type="password" name="password" align="center" placeholder="Password" />
		  <button type="submit" className="submit login" align="center">Sign in</button>
		  <p className="forgot" align="center"></p>
		  </form>
		  <Link to="/register" className="register-link-log" align="center">Not registered yet? <strong>Click here!</strong></Link>
		</div>
		</>
	)
}
export default Login;
