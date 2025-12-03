import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({ isLoggedIn }) {
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/');
		} else {
			navigate('/landing');
		}
	}, [isLoggedIn, navigate]);

	return null;
}
