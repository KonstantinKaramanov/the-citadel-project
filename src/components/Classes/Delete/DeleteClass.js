import SinglePageHead from "../../SinglePageHead/SinglePageHead";
import * as classService from '../../../services/classService'
import { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { isAuth } from '../../../hoc/isAuth';

import "./DeleteClass.css"
import { Link } from "react-router-dom";

import Notification from "../../User/Notification/Notification";

const DeleteClass = ({
	history,
	match,
	location
}) => {
	let errors = ['Deletion failed. Try again or contact our admin.']
let success = [`Deletion successful! Redirecting in 3, 2, 1...`]
const initialNotificationState = {type:'', message: []}

	const [notification, setNotification] = useState(initialNotificationState)
	const [showNotification, setShowNotification] = useState(false);

const closeNotification = () => {
	setShowNotification(false)
	setNotification(initialNotificationState)

}
	const classId = match.params.classId
	const classData = location.state;
	const { userInfo } = useContext(AuthContext)
	let userToken = userInfo.user.token;

	const submitDelete = async(e) => {
		e.preventDefault();

		const result = await classService.deleteClassbyId(classId, userToken)
		if (result.id && result.id == classId) {
			setShowNotification(true)
			setNotification({
				type:'success',
				message: success
			})
			setTimeout(() => {history.push('/')},2000)

		} else {
			setShowNotification(true)
			setNotification({
				type:'error',
				message: errors
			})
		}

	}


	return (
		<>
		<SinglePageHead pageInfo={{name:"Delete Class", slug: `delete/${classId}`}} />
		<div className="container-register">
    <div className="title sign title-del">Are you sure you want to delete this class?</div>
	{showNotification==true ? <Notification type={notification.type} message={notification.message} closeNotification={closeNotification} /> : '' }
    <div className="content">
      <form action="#" method="POST" onSubmit={submitDelete}>

	  <div className="class-del-wrap">
			<div className="delete-class-img">
				<img src={classData.imageUrl} alt="Class Image" className="delete-cat-img"/>
			</div>
			<div className="class-text del">

				<h2>{classData.name}</h2>
				<div className="class-meta">
					<p><i className="far fa-calendar-alt del"></i>{classData.date}</p>
					<p><i className="far fa-clock del"></i>{classData.start_time} - {classData.end_time}</p>
				</div>
			</div>
		</div>
        <div className="button">
          <input type="submit" value="Yes, I would like to DELETE this class" />
		  <Link to="/"><p className="go-back">Nah, Go back.</p> </Link>
        </div>
      </form>
    </div>
  </div>
		</>

	)
}


export default isAuth(DeleteClass);