import React from 'react';
import './ProfileScreen.css';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import Nav from '../Nav';
import { selectUser } from '../features/counter/userSlice';
import PlanScreen from './PlanScreen';

function ProfileScreen() {
	const user = useSelector(selectUser);
	return (
		<div className='profileScreen'>
			<Nav />
			<div className='profileScreen__body'>
				<h1>Edit profile</h1>
				<div className='profileScreen__info'>
					<img
						src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
						alt=''
					/>
					<div className='profileScreen__details'>
						<h2>{user.email}</h2>
						<div className='profileScreen__plans'>
							<h3>plans</h3>
							<PlanScreen />
							<button
								onClick={() => auth.signOut()}
								className='profileScreen__signout'>
								sign out
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileScreen;
