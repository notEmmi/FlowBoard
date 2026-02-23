import "./Divider.css";

export default function Divider({ label = '' }) {
	return label ? (
		<div className="divider">
			<div className="half 1"></div>
			<h3>{label}</h3>
			<div className="half 2"></div>
		</div>
	) : (
		<div className="divider">
			<div className="full"></div>
		</div>
	);
}

