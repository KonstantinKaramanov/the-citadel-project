import SinglePageHead from "../../SinglePageHead/SinglePageHead";
import * as classService from '../../../services/classService'
import { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { isAuth } from "../../../hoc/isAuth";
import { validateUrl } from "../../../services/userService";
import Notification from "../../User/Notification/Notification";


let errors = []
let success = [`You have successfully edited a class! REDIRECTING!`]
const initialNotificationState = { type: '', message: [] }


const EditClass = ({
	history,
	match,
	location
}) => {


	// Notifation handling
	const [notification, setNotification] = useState(initialNotificationState)
	const [showNotification, setShowNotification] = useState(false);
	const closeNotification = () => {
		setShowNotification(false)
		setNotification(initialNotificationState)

	}
	const classId = match.params.classId
	const classInfo = location.state;
	const { userInfo, exposeUserInfo } = useContext(AuthContext)
	let userToken = userInfo.user.token;


	const submitEdit = async (e) => {
		errors = []
		e.preventDefault();
		const formData = new FormData(e.target);
		const { name, type, imageUrl, capacity, description, start_time, end_time, date } = Object.fromEntries(formData)
		if (name.toString().length < 3 || name.toString().length > 50) {
			errors.push('Name must be between 3 and 50 characters')
		}
		if (description.toString().length < 10 || description.toString().length > 100) {
			errors.push('Description must be between 10 and 100 characters.')
		}

		if (Number(capacity.toString()) < 1 || Number(capacity.toString()) > 20) {

			errors.push('Capacity must be a number between 1 and 20.')
		}
		let imageUrlValid = validateUrl(imageUrl);

		if (!imageUrlValid) {
			errors.push('Image URL must be a valid URL.')
		}
		if (start_time.toString() === '') {
			errors.push('Starting time of class is a mandatory field.')
		}
		if (end_time.toString() === '') {
			errors.push('Ending time of class is a mandatory field.')
		}
		if (date.toString() === '') {
			errors.push('Date of class is a mandatory field.')
		}
		if (errors.length > 0) {
			setShowNotification(true)
			setNotification({
				type: 'error',
				message: errors
			})

		}

		else {
			const cleanClassData = {
				"type": "classes",
				"title": name,
				"status": "publish",
				"acf": {
					name,
					description,
					type,
					imageUrl,
					capacity,
					date,
					start_time,
					end_time,
				}

			}

			await classService.editClassbyId(cleanClassData, classId, userToken);

			setShowNotification(true)
			setNotification({
				type: 'success',
				message: success
			})
			setTimeout(() => { history.push("/") }, 2000)
		}

	}

	return (
		<>
			<SinglePageHead pageInfo={{ name: "Edit Class", slug: `edit/${classId}` }} />
			<div className="container-register">
				<div className="title sign">Edit Class</div>
				{showNotification === true ? <Notification type={notification.type} message={notification.message} closeNotification={closeNotification} /> : ''}
				<div className="content">
					<form action="#" method="POST" onSubmit={submitEdit}>
						<div className="user-details">
							<div className="input-box">
								<span className="details">Name</span>
								<input type="text" name="name" placeholder="Enter class name" defaultValue={classInfo.name} />
							</div>
							<div className="input-box">
								<span className="details">Type</span>
								<select name="type" defaultValue={classInfo.type}>
									<option value="general content">General Content</option>
									<option value="pve">PvE</option>
									<option value="pvp">PvP</option>
									<option value="specific class guides">Specific Class Guides</option>
								</select>
							</div>

							<div className="input-box">
								<span className="details">Class Image</span>
								<input type="text" name="imageUrl" placeholder="Enter image URL for class" defaultValue={classInfo.imageUrl || ''} />
							</div>
							<div className="input-box">
								<span className="details">Class Capacity</span>
								<input type="text" name="capacity" placeholder="Enter max class attendees" defaultValue={classInfo.capacity || ''} />
							</div>
							<div className="input-box">
								<span className="details">Description</span>
								<textarea name="description" rows="4" cols="30" placeholder="Enter class description" defaultValue={classInfo.description || ''} />
							</div>
							<div className="input-box">
								<span className="details">Date</span>
								<input type="date" name="date" placeholder="Enter max class attendees" defaultValue={classInfo.date || ''} />
							</div>
							<div className="input-box">
								<span className="details">Class Start Time</span>
								<input type="time" name="start_time" defaultValue={classInfo.start_time || ''} />
							</div>
							<div className="input-box">
								<span className="details">Class End Time</span>
								<input type="time" name="end_time" defaultValue={classInfo.end_time || ''} />
							</div>
						</div>
						<div className="button">
							<input type="submit" value="Edit Class" />
						</div>
					</form>
				</div>
			</div>
		</>

	)
}

export default isAuth(EditClass);