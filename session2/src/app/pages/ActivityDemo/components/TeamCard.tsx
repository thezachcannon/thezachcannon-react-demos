export interface Team {
	logoUrl: string;
	name: string;
	location: string;
	guid: string;
}

interface TeamCardProps {
	team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
	return (
		<div className="border border-gray-200 rounded-lg p-4 flex items-center shadow-sm max-w-[320px] bg-white">
			<img
				src={team.logoUrl}
				alt={team.name + " logo"}
				className="w-16 h-16 rounded-full mr-4 object-cover"
			/>
			<div>
				<div className="font-bold text-lg">{team.name}</div>
				<div className="text-gray-600 text-sm">{team.location}</div>
			</div>
		</div>
	);
};

export default TeamCard;
