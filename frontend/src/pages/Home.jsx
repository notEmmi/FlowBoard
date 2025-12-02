import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ isLoggedIn }) {
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

export default Home;