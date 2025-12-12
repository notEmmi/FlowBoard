import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({ isLoggedIn }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/dashboard');
		} else {
			navigate('/landing');
		}
	}, [isLoggedIn, navigate]);
}
