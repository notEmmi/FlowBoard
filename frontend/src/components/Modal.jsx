import { X } from 'lucide-react';
import './Modal.css';

export default function Modal({ children, isOpen, onClose }) {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button onClick={onClose} className="modal-close">
					<X className="close-icon icon"/>
				</button>
				{children}
			</div>
		</div>
	);
}