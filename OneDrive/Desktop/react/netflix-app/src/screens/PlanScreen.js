import React, { useState, useEffect } from 'react';
import { selectUser } from '../features/counter/userSlice';
import { useSelector } from 'react-redux';
import db from '../firebase';
import './PlanScreen.css';
import { loadStripe } from '@stripe/stripe-js';

function PlanScreen() {
	const [products, setProducts] = useState([]);
	const user = useSelector(selectUser);

	useEffect(() => {
		db.collection('products')
			.where('active', '==', true)
			.get()
			.then((querSnapShot) => {
				const products = {};
				querSnapShot.forEach(async (productDoc) => {
					products[productDoc.id] = productDoc.data();
					const priceSnap = await productDoc.ref.collection('prices').get();
					priceSnap.docs.forEach((price) => {
						products[productDoc.id].prices = {
							priceId: price.id,
							priceData: price.data(),
						};
					});
				});
				setProducts(products);
			});
	}, []);
	console.log(products);
	const loadCheckout = async (priceId) => {
		const docRef = await db
			.collection('customers')
			.doc(user.uid)
			.collection('checkout_sessions')
			.add({
				price: priceId,
				success_url: window.location.origin,
				cancel_url: window.location.origin,
			});
		docRef.onSnapshot(async (snap) => {
			const { error, sessionId } = snap.data();
			if (error) {
				alert(`error occured ${error.message}`);
			}
			if (sessionId) {
				const stripe = await loadStripe(
					'pk_test_51IiDYkIOauw76HUqIEAXZ2o3SLLsNL68qKvHdLL0hsASNY9oOrcbmarq1lamspC6VQLhZb0nhjv41jiZWSFnogD100XwdNTQZh',
				);
				stripe.redirectToCheckout({ sessionId });
			}
		});
	};
	return (
		<div className='planscreen'>
			{Object.entries(products).map(([productId, productData]) => {
				///logic
				return (
					<div className='plansscreen__plan'>
						<div className='planscreen__info'>
							<h5>{productData.name}</h5>
							<h6>{productData.description}</h6>
						</div>
						<button
							className='planscreen__button'
							onClick={() => loadCheckout(productData.prices.priceId)}>
							Subscribe
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default PlanScreen;
