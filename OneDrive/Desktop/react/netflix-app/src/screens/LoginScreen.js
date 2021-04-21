import React, { useState } from 'react';
import './LoginScreen.css';
import SignUpScreen from './SignUpScreen';

function LoginScreen() {
	const [signIn, setSignIn] = useState(false);
	return (
		<div className='loginScreen'>
			<div className='loginScreen__background'>
				<img
					className='loginScreen__logo'
					src='https://assets.brand.microsites.netflix.io/assets/493f5bba-81a4-11e9-bf79-066b49664af6_cm_1440w.png?v=26'
					alt='netflix-logo'
				/>
				<button onClick={() => setSignIn(true)} className='loginScreen__button'>
					Sign in
				</button>
				<div className='loginScreen__gradient'></div>
			</div>
			<div className='loginScreen__body'>
				{signIn ? (
					<SignUpScreen />
				) : (
					<>
						<h1>Unlimited films,Tv series and more</h1>
						<h2>Watch from anywhere and cancel any time</h2>
						<h3>
							Ready to watch ? Create your account or restart your membership
							with your email
						</h3>
						<div className='loginScreen__input'>
							<form>
								<input type='email' placeholder='Email Address' />
								<button
									onClick={() => setSignIn(true)}
									className='loginScreen__getStarted'>
									Lets Go
								</button>
							</form>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default LoginScreen;
