import './Alerts.css';
import {CheckCircle, TriangleAlert, Ban, Info } from 'lucide-react';

export default function Alert({ type, children }) {

	const iconMap = {
		success: CheckCircle,
		warning: TriangleAlert,
		error: Ban,
		info: Info
	};

	const Icon = iconMap[type];

	return (
		<div className={`alert alert-${type}`}>
			<Icon className='' />
			<p><b>{type}</b>: {children}</p>
		</div>
	);
	

}