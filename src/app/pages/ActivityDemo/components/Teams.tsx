import React from "react";
import TeamCard, { Team } from "./TeamCard";


interface TeamsProps {
	teams: Team[];
	onTeamClick?: (team: Team) => void;
	onHover?: (team: Team) => void;
}

const Teams: React.FC<TeamsProps> = ({ teams, onTeamClick, onHover }) => {
	const _onHover = (team: Team) => () => {
		if (onHover) {
		console.log('hover')
		onHover(team);
		} 
	}

	const _onClick = (team: Team) => () => {
		console.log('click')
		if (onTeamClick) onTeamClick(team);
	}
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
				gap: "24px",
				maxWidth: "1200px",
				margin: "0 auto",
				padding: "24px"
			}}
		>
			{Object.values(teams).map((team, idx) => (
				<div onMouseEnter={_onHover(team)} key={idx} onClick={_onClick(team)} style={{ cursor: onTeamClick ? "pointer" : undefined }}>
					<TeamCard team={team} />
				</div>
			))}
		</div>
	);
};

export default Teams;
