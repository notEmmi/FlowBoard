import { useNavigate } from 'react-router-dom';
import './TopNav.css'
import FlowBoardIcon from '../assets/flowboard-icon.png'



export default function TopNav() {
		const navigate = useNavigate();
		return(
			<div className="top-nav-container">
				<div className="top-logo">
					<button onClick={() => navigate('/')} className='btn-link'>
						<img src={ FlowBoardIcon } alt="FlowBoard Icon" className="flowboard-icon"/>
						<h3>FlowBoard</h3>
					</button>
				</div>
				<div className="top-nav">
					<button onClick={() => navigate('/login')} className='btn-ghost'>Sign In</button>
					<button onClick={() => navigate('/register')} className='btn-ghost'>Register</button>
				</div>
			</div>
		);
}