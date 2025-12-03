import "./Title.css"
import FlowBoardIcon from "../assets/flowboard.png";


export default function Title (){
	return (
		<div className="title-container">
			<img src={FlowBoardIcon} alt="Flowboard Icon" className="flowboard-icon" />
			<h1>FlowBoard</h1>
		</div>
	)
}