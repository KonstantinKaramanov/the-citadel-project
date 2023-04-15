import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Redirect } from 'react-router-dom';


export const isAuth = (Component) => {

	const WrapperComponent = (props) => {
		const { userInfo } = useContext(AuthContext);
		const isAuthenticated = userInfo.isAuth 

		return isAuthenticated
		? <Component {...props} />
		: <Redirect to="/login" />
	}


	return WrapperComponent;
}



