import { Link } from 'react-router-dom';
import "./SinglePageHead.css"

const SinglePageHead = ({pageInfo}) => {
	return (
		<div className="page-header">
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h2>{pageInfo?.name}</h2>
				</div>
				<div className="col-12">
					<Link to="/">Home</Link>
					<Link to={`/${pageInfo?.slug}`}>{pageInfo?.name}</Link>
				</div>
			</div>
		</div>
	</div>
	)
}

export default SinglePageHead;