import "./TeamSingleCard.css"

const SingleTeamMember = ({ style, userFullName, userImage, userType }) => {


	return (
		<div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.0s" style={style}>
			<div className="team-item">
				<div className="team-img">
					<img src={userImage || "./img/team-1.jpg"} alt="Person" />
				</div>
				<div className="team-text">
					<h2>{userFullName || "Default User"}</h2>
					<p>{userType || "User"}</p>
				</div>
			</div>
		</div>
	)
}

export default SingleTeamMember;