import { Link } from 'react-router-dom';
import "./ClassTeacherInfo.css"

export const ClassTeacherInfo = ({classAuthor, cardId, authorId}) => {

	classAuthor = {
		...classAuthor,
		authorId
	}

return (
	<div className="class-teacher">
	<img src={classAuthor?.user_imageUrl || "./img/teacher-1.png"} alt="Teacher Image" />
	<h3>{`${classAuthor?.first_name} ${classAuthor?.last_name}` || "Ellen Reed"}</h3>
	<Link to={{pathname: `/details/${cardId}`, state: classAuthor}}>Details</Link>
</div>
)
}