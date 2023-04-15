import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import logo from "../images/logo.png";

import "./HeaderNav.css"

const Header = ({
	userLogout
}) => {

	let { userInfo } = useContext(AuthContext);
	let displayName = '';
	let userId = ''
	let currentUser;
	let userType;

	if (userInfo.isAuth && userInfo.user.user) {

		displayName = userInfo.user.user_display_name || ''
		userId = userInfo.user.user.id || ''
		currentUser = userInfo.user.user || ''
	}


	if (currentUser) {
		userType = currentUser.acf?.user_type || currentUser.user?.acf?.user_type
	}


	const isAuth = userInfo.isAuth

	return (
		<>
			<div className="navbar navbar-expand-lg bg-dark navbar-dark">
				<div className="container-fluid">
					<img src={logo} alt="Logo" />
					{/* <NavLink to="/img/tier.png" className="navbar-brand"></NavLink> */}
					<div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
						<div className="navbar-nav ml-auto">
							<NavLink to="/" exact={true} className="nav-item nav-link" activeClassName="active">Home</NavLink>
							<NavLink to="/classes" className="nav-item nav-link" activeClassName="active">Classes</NavLink>
							<NavLink to="/teachers" className="nav-item nav-link" activeClassName="active">Teachers</NavLink>
							<NavLink to="/contact" className="nav-item nav-link" activeClassName="active">Contact</NavLink>

							{!isAuth ? (
								<div className="guest-navigation navbar-nav">
									<NavLink to="/login" className="nav-item nav-link" activeClassName="active">Login</NavLink>
									<NavLink to="/register" className="nav-item nav-link" activeClassName="active">Register</NavLink>
								</div>
							) :
								(
									<div className="user-navigation navbar-nav">
										{userType === "teacher" ? (
											<NavLink to="/create" className="nav-item nav-link" activeClassName="active">Create Class</NavLink>
										) : ""}

										<NavLink to={`/profile/${userId}`} className="nav-item nav-link user-profile" activeClassName="active">My Profile</NavLink>
										<NavLink to="/logout" className="nav-item nav-link" activeClassName="active" onClick={userLogout}>Logout</NavLink>

									</div>
								)

							}

						</div>
					</div>
				</div>
				{displayName ? (<div className="welcome-user">Welcome, {displayName}!</div>) : (<div className="welcome-user">Welcome, Guest!</div>)}
			</div>


		</>
	)
}

export default Header;
