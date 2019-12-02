import * as React from "react";
import { Button } from 'react-md';
import { connect, connectObserved } from "../../stores";

export interface TopologicalOutputInjectedProps {
	topologicalOutput: string;
	localTime: string;
	updateTime(): void;
}

export interface TopologicalOutputProps {
	data: string;
}

const TopologicalOutput: React.SFC<TopologicalOutputInjectedProps & TopologicalOutputProps> = (props) => {
	return (
		<div>
			<h5>Topological Output</h5>
			<div>
				{props.topologicalOutput}
			</div>
			<br/>
			<div>
				<b> </b>
				<div>{props.data}</div>
			</div>
			<div>
				<b>TopologicalOutput prop from app.localTime via Links (observed): </b>
				<div>{props.localTime}</div>
			</div>
			<Button raised primary onClick={props.updateTime}>@a Update Time</Button>
		</div>
	);
}

export default connect<TopologicalOutputInjectedProps, TopologicalOutputProps>((store, ownProps) => {
	return {
		topologicalOutput: store.linksStore.topologicalOutput,
		localTime: store.app.localTime,
		data: ownProps.data,
		updateTime: () => store.app.updateTime()
	};
})(TopologicalOutput);

// export default connectObserved<TopologicalOutputInjectedProps, TopologicalOutputProps>((store, ownProps) => {
// 	return {
// 		topologicalOutput: store.linksStore.topologicalOutput,
// 		localTime: store.app.localTime,
// 		data: ownProps.data,
// 		updateTime: () => store.app.updateTime()
// 	}
// })(TopologicalOutput);
