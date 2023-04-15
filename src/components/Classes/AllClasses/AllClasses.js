import SinglePageHead from "../../SinglePageHead/SinglePageHead";
import SingleClassCard from "../SingleClassCard/SingleClassCard";
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from "react";
import './AllClasses.css'

import * as classService from '../../../services/classService';
let initialState = []

const AllClasses = () => {
	const [allClasses, setAllClasses] = useState([]);
	const [setActiveFilter] = useState('');

	useEffect(() => {

		async function getThemClasses() {
			const result = await classService.getAll();
			initialState = [...result]
			setAllClasses(result);
		}

		getThemClasses()

	}, [])

	function showAllClasses(e) {
		e.preventDefault();
		setAllClasses(initialState)
		setActiveFilter('filter-active-class')

	}
	function getBodyBalance(e) {
		e.preventDefault();
		const balance = initialState.filter(cl => cl.acf.type === "general content")


		setAllClasses(balance)
	}
	function getChildren(e) {
		e.preventDefault();
		const children = initialState.filter(cl => cl.acf.type === "pvp")

		setAllClasses(children)
	}
	function getHatha(e) {
		e.preventDefault();
		const hatha = initialState.filter(cl => cl.acf.type === "pve")

		setAllClasses(hatha)
	}
	function getDance(e) {
		e.preventDefault();
		const dance = initialState.filter(cl => cl.acf.type === "specific class guides")

		setAllClasses(dance)
	}

	return (
		<>
			<SinglePageHead pageInfo={{ name: 'Classes', slug: 'classes' }} />
			<div className="about wow fadeInUp" data-wow-delay="0.1s">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-5 col-md-6">
							<div className="about-img">
								<img src="./img/about.png" alt="About" />
							</div>
						</div>
						<div className="col-lg-7 col-md-6">
							<div className="section-header text-left classes-header-text">
								<p>Learn About Us</p>
								<h2>Welcome to The Citadel</h2>
							</div>
							<div className="about-text">
								<p>
									Dear friends, we created The Citadel with the desire to help any of you struggling in the world of Azeroth.
								</p>
								<p>
									We collaborate with highly accredited players across all realms as part of our team. We believe that they will help each one of you with different content/aspects of the game and we look forward to introducing them to you.
								</p>
								<Link className="btn" to="/teachers">Meet our Team</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="class" style={{ marginTop: '100px' }}>
				<div className="container">
					<div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
						<p>Our Classes</p>
						<h2>Class Schedule</h2>
					</div>
					<div className="row">
						<div className="col-12">
							<ul id="class-filter">
								<li>	<NavLink exact={true} to="/all" data-filter="*" className="filter-classes-navlink" onClick={showAllClasses} >All Classes</NavLink> </li>
								<li> <NavLink to="/balance" data-filter=".filter-1" className="filter-classes-navlink" onClick={getBodyBalance} >General Content</NavLink></li>
								<li> <NavLink to="/hatha" data-filter=".filter-2" className="filter-classes-navlink" onClick={getHatha} >PvE</NavLink></li>
								<li> <NavLink to="/children" data-filter=".filter-3" className="filter-classes-navlink" onClick={getChildren} >PvP </NavLink></li>
								<li> <NavLink to="/dance" data-filter=".filter-4" className="filter-classes-navlink" onClick={getDance} >Specific Class Guides </NavLink></li>
							</ul>
						</div>
					</div>
					{allClasses.length > 0 ? (
						<div className="row class-container">
							{allClasses.map(c => <SingleClassCard key={c.id} classData={c} authorId={c.author} cardId={c.id} />)}

						</div>)
						:
						<h4 className="no-classes-found">No classes found.</h4>}

				</div>
			</div>
		</>
	)
}

export default AllClasses;