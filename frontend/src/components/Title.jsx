import FlowBoardIconSrc from "../assets/flowboard.png";

const FlowBoardIcon = () => (
	<img src={FlowBoardIconSrc} alt="Flowboard" className="flowboard-icon" />
);

export default function Title (){
	return (
		<div className="title-container">
			<FlowBoardIcon />
			<h1>Flowboard</h1>
		</div>
	)
}