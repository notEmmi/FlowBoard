export default function Alert({ type, message }) {

	return  (
		<div className={`alert alert-${type}`}>
			<p><b>{type}</b>: {message}</p>
		</div>
	)


}