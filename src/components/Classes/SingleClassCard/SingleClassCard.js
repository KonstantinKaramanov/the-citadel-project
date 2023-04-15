import * as userService from '../../../services/userService'
import { useState, useEffect } from 'react';
import { ClassTeacherInfo } from '../ClassTeacherInfo/ClassTeacherInfo';

import "./SingleClassCard.css"


const SingleClassCard = ({classData, authorId, cardId}) => {
	const [classAuthor, setClassAuthor] = useState({})
		const exposeAuthorInfo = (author) => {
		setClassAuthor(author)
	}
	let result;
	useEffect( () => {

		async function getClassAuthor() {
		 result = await userService.getUserById(authorId)
		 setClassAuthor(result["acf"])
		}

		getClassAuthor();

	}, [])

	if (classData.acf) {
		classData = classData.acf
	}

	return (
		<div className="col-lg-4 col-md-6 col-sm-12 class-item filter-1 wow fadeInUp" data-wow-delay="0.0s">
		<div className="class-wrap">
			<div className="class-img">
				<img src={classData.imageUrl} alt="Class Image" />
			</div>
			<div className="class-text">

		{authorId ? <ClassTeacherInfo classAuthor={classAuthor} cardId={cardId} authorId={authorId}/> : ''}

				<h2>{classData.name}</h2>
				<div className="class-meta">
					<p><i className="far fa-calendar-alt"></i>{classData.date}</p>
					<p><i className="far fa-clock"></i>{classData.start_time} - {classData.end_time}</p>
				</div>
			</div>
		</div>
	</div>
	)
}
export default SingleClassCard;