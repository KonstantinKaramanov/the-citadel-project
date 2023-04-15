import SinglePageHead from "../../SinglePageHead/SinglePageHead";
import TeamSingleCard from "../TeamSingleCard/TeamSingleCard";
import * as userService from '../../../services/userService';
import { useEffect, useState } from "react";

import "./TeamAll.css";

const TeamAll = () => {
	const [teachers, setTeachers] = useState([]);

	useEffect(()=> {
		async function getUsers() {
			const result = await userService.getTeachers();
			setTeachers(result);
		}
		getUsers();
	}, []);

	let teaching = teachers && teachers.filter(t => t.acf.user_type==='teacher');
	console.log(teaching);

	return (
		<>
			<SinglePageHead pageInfo={{name:'Teachers', slug:'teachers' }} />
			<div className="team">
				<div className="container">
					<div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
						<p>Trainer</p>
						<h2>Expert Trainer</h2>
					</div>
					{teaching && teaching.length > 0 ? (
						<div className="row">
							{teaching.map(t => 
								<TeamSingleCard 
									key={t.id} 
									userFullName={t['acf'].first_name + ' ' + t['acf'].last_name} 
									userImage={t['acf'].user_imageUrl} 
									userType={t['acf'].user_type} 
								/>
							)}
						</div>
					) : (
						<h4 className="no-classes-found">No teachers found.</h4>
					)}
				</div>
			</div>
		</>
	);
};

export default TeamAll;
