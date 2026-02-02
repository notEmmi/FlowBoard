import { CircleX } from 'lucide-react';
import './Modal.css';

export default function Modal({ children, isOpen, onClose }) {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button onClick={onClose} className="modal-close">
					<CircleX className="icon" size={24} />
				</button>
				{children}
			</div>
		</div>
	);
}