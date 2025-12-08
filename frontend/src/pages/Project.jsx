import { useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';

export default function Project() {

	const { projectName } = useParams();



	return (
		<div className="page-container project">
			<SideNav />
			<div className='content'>
				<h1>{projectName}</h1>
				
				<div className='project-board'>
					
				</div>

			</div>
		</div>
	)

};