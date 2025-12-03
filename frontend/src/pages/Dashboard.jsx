import './Dashboard.css';

export default function Dashboard () {
	return (
		<div className="page-container dashboard-page">
			<h1>Dashboard</h1>
			<p className="muted">Your projects and boards will appear here.</p>

			<section className="boards-grid">
				<div className="board-card">
					<h3>Project Alpha</h3>
					<p>3 columns · 12 tasks</p>
				</div>
				<div className="board-card">
					<h3>Personal Roadmap</h3>
					<p>2 columns · 5 tasks</p>
				</div>
			</section>
		</div>
	);
}
