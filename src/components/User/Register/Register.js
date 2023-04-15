import SinglePageHead from "../../SinglePageHead/SinglePageHead";

import * as userService from '../../../services/userService';
import {  useState } from "react";
import { useHistory } from "react-router";
import { validateEmail, validateUrl } from "../../../services/userService";
import Notification from "../Notification/Notification";
import "./Register.css"

let errors = []
let success = [`You have successfully registered! Redirecting in 3, 2, 1...`]
const initialNotificationState = {type:'', message: []}


const Register = () => {
	//errors =[]
	const [notification, setNotification] = useState(initialNotificationState)
	const [showNotification, setShowNotification] = useState(false);

const closeNotification = () => {
	setShowNotification(false)
	setNotification(initialNotificationState)
}

	let history = useHistory()

	const onRegister = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const {username, email, first_name, last_name, password, re_password, user_imageUrl, user_type} = Object.fromEntries(formData)

	
		if (username.toString().length < 3 || username.toString().length > 15) {
			errors.push('Username must be between 3 and 15 characters')
		}
		if ((first_name.toString().length < 3 || first_name.toString().length > 15) || (last_name.toString().length < 3 ||last_name.toString().length > 15)) {
			errors.push('Both first and last name must be between 3 and 15 characters')
		}
		if (password.toString().length < 4 || password.toString().length > 10) {
			errors.push('Password must be between 4 and 10 characters.')
		}
		if (password!==re_password) {
			errors.push('Passwords must match')
		}
		let imageUrlValid = validateUrl(user_imageUrl);
		let emailValid = validateEmail(email);
		if (! imageUrlValid) {
			errors.push('Image URL must be a valid URL.')
		} 
		if (! emailValid) {
			errors.push('Enter a valid email address')
		}

		if (errors.length > 0 ) {
			setShowNotification(true)
			setNotification({
				type:'error',
				message: errors
			})

		}
			else  {
				const cleanUserData = {
					username,
					email,
					password,
					"name": username,
						"acf": {
						user_type,
						user_imageUrl,
						first_name,
						last_name,
						email
					},

				}
				try {
			await userService.createUser(cleanUserData);
				setShowNotification(true)
				setNotification({
					type:'success',
					message: success
				})

			setTimeout(() => {history.push("/login")}, 2000)
				}
				catch (err) {
					errors.push(err.message)
			setShowNotification(true)
			setNotification({
				type:'error',
				message: errors
			})
				}

			}

			errors= []


	}
	return (
		<>
	<SinglePageHead pageInfo={{name:'Register', slug:'register'}}/>

  <div className="container-register">
    <div className="title sign">Registration</div>
	{showNotification===true ? <Notification type={notification.type} message={notification.message} closeNotification={closeNotification}  /> : '' }
    <div className="content">
      <form method="POST" onSubmit={onRegister}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Username</span>
            <input type="text" name="username" placeholder="Enter your username" required />
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input type="text" name="email" placeholder="Enter your email" required />
          </div>
		  <div className="input-box">
            <span className="details">First Name</span>
            <input type="text" name="first_name" placeholder="Enter your first name" required />
          </div>
		  <div className="input-box">
            <span className="details">Last Name</span>
            <input type="text" name="last_name" placeholder="Enter your last name" required />
          </div>

          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" name="password" placeholder="Enter your password" required />
          </div>
          <div className="input-box">
            <span className="details">Confirm Password</span>
            <input type="password" name="re_password" placeholder="Confirm your password" required />
          </div>
		  <div className="input-box">
            <span className="details">Avatar Url</span>
            <input type="text" name="user_imageUrl" placeholder="Avatar Image Url" required />
          </div>
		  <div className="input-box">
		  <span className="details">Sign up as</span>
			<select name="user_type">
				<option value="teacher">Trainer</option>
				<option value="student">Student</option>
            </select>
          </div>
        </div>

        <div className="button">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  </div>


		</>
	)
}
export default Register;