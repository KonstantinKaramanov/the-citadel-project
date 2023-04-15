import { Route, Switch, useHistory } from 'react-router-dom';
import Header from "./components/HeaderNav/HeaderNav";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import AllClasses from './components/Classes/AllClasses/AllClasses'
import TeamAll from './components/Team/TeamAll/TeamAll';
import Register from './components/User/Register/Register'
import Login from './components/User/Login/Login';
import Profile from './components/User/Profile/Profile';
import ErrorPage from './components/ErrorPage/ErrorPage';
import CreateClass from './components/Classes/CreateClass/CreateClass';
import ClassDetails from './components/Classes/ClassDetails/ClassDetails';
import { useState } from 'react';
import AuthContext from './contexts/AuthContext';
import EditClass from './components/Classes/EditClass/EditClass';
import DeleteClass from './components/Classes/Delete/DeleteClass';
import BookContext from './contexts/BookContext';
import * as userService from './services/userService'
import Notification from './components/User/Notification/Notification';


const initialNotificationState = { type: '', message: [] }

const App = () => {
	// Notifation handling
	const [notification, setNotification] = useState(initialNotificationState);
	const [showNotification, setShowNotification] = useState(false);
	const closeNotification = () => {
		setShowNotification(false);
		setNotification(initialNotificationState);
	};
	const [userInfo, setUserInfo] = useState({ isAuth: false, user: '' })
	const [bookingInfo, setBookingInfo] = useState([])
	const localStorageUser = JSON.parse(localStorage.getItem('user'))
	if (localStorageUser !== null && userInfo.user === '') {
		setUserInfo({ isAuth: true, user: { ...localStorageUser } })
	}
	let history = useHistory();


	const userLogout = async (e) => {
		e.preventDefault()

		let response = await userService.userLogout();
		if (response === "Successful logout") {
			localStorage.clear()
			exposeUserInfo({})
			changeBookingInfo([])
			history.push('/')
		} else {
			setShowNotification(true);
			setNotification({ type: 'error', message: ['Logout Interrupted. Please try again or contact us.'] })
		}

	}
	const exposeUserInfo = (user) => {
		setUserInfo({ isAuth: Boolean(user.first_name || user.token), user: { ...user } })
	}
	const changeBookingInfo = (info) => {
		setBookingInfo(info)
	}
	return (
		<>
			<AuthContext.Provider value={{ userInfo, exposeUserInfo }}>
				<BookContext.Provider value={{ bookingInfo, changeBookingInfo }}>
					<Header {...userInfo} userLogout={userLogout} />
					{showNotification === true ? <Notification type={notification.type} message={notification.message} closeNotification={closeNotification} /> : ''}
					<Switch>
						<Route path="/" exact component={Hero} />
						<Route path="/classes" component={AllClasses} />
						<Route path="/teachers" component={TeamAll} />
						<Route path="/contact" component={Contact} />
						<Route path="/details/:cardId" component={ClassDetails} />
						<Route path="/edit/:classId" component={EditClass} />
						<Route path="/delete/:classId" component={DeleteClass} />

						<Route path="/register" component={Register} />()
						<Route path="/login">
							<Login />
						</Route>

						<Route path="/profile/:userId" component={Profile} />
						<Route path="/create" component={CreateClass} />

						<Route path="/custom">
							<h1>This is a custom page</h1>
							<p>Hello world</p>
						</Route>

						<Route path="*" component={ErrorPage}></Route>
					</Switch>
					<Footer />
				</BookContext.Provider>
			</AuthContext.Provider>
		</>
	)
}


export default App;