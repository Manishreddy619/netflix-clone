import React, { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import './App.css';
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProfileScreen from './screens/ProfileScreen';
// import { Counter } from './features/counter/Counter';
// import './App.css';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				//logged in
				dispatch(
					login({
						uid: userAuth.uid,
						email: userAuth.email,
					}),
				);
			} else {
				//logout
				dispatch(logout());
			}
		});
		return unsubscribe;
	}, [dispatch]);
	return (
		<div className='app'>
			{/* homescreen */}

			<Router>
				{!user ? (
					<LoginScreen />
				) : (
					<Switch>
						<Route path='/profile'>
							<ProfileScreen />
						</Route>
						<Route exact path='/'>
							<HomeScreen />
						</Route>
					</Switch>
				)}
			</Router>
		</div>
	);
}

export default App;
