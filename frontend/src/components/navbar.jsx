import { House } from 'lucide-react';

export default function Navbar() {
  return (
	<div className="navbar">
		<div className="expanded-nav">
			<div class="nav-item">
				<House /> <p className='nav-label'>Home</p>
			</div>
				<House /> <p className='nav-label'>Home</p>

			<div class="nav-item">
				<House /> <p className='nav-label'>Home</p>

			</div>			
			<div class="nav-item">
				<House /> <p className='nav-label'>Home</p>

			</div>			
			<div class="nav-item">
				
			</div>
		</div>

		<div className="minimized-nav">
			<div class="nav-item">

			</div>

			<div class="nav-item">
				
			</div>			
			<div class="nav-item">
				
			</div>			
			<div class="nav-item">
				
			</div>

		</div>

	</div>


  );
}