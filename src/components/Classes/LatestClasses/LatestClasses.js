import React, { useState, useEffect } from "react";
import SingleClassCard from "../SingleClassCard/SingleClassCard";
import * as classService from "../../../services/classService";
import "./LatestClasses.css";

const LatestClasses = () => {
	const [latestClasses, setLatestClasses] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await classService.getLatest();
				if (result && result.length > 0) {
					setLatestClasses(result);
				} else {
					setLatestClasses([]);
				}
			} catch (error) {
				console.error(error);
				setLatestClasses([]);
			}
		}
		fetchData();
	}, []);

	return (
		<div className="class">
			<div className="container">
				<div
					className="section-header text-center wow zoomIn latest-classes-roaster"
					data-wow-delay="0.1s"
				>
					<p>Trending classes</p>
					<h2>Latest Classes</h2>
				</div>
				{latestClasses.length > 0 ? (
					<div className="row class-container">
						{latestClasses.map((c) => (
							<SingleClassCard
								key={c.id}
								classData={c}
								authorId={c.author}
								cardId={c.id}
							/>
						))}
					</div>
				) : (
					<h4 className="no-classes-found">No classes found.</h4>
				)}
			</div>
		</div>
	);
};

export default LatestClasses;
