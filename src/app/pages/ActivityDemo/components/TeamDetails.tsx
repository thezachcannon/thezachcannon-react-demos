'use client';
import React, { startTransition, Suspense, use } from "react";
import { Team } from "./TeamCard";
import { getTeamDetail } from "@/app/shared/services/teamService";

interface TeamDetailsProps {
	viewedTeam: string | null;
	action: () => void
}

interface TeamDetailsContentProps {
	teamPromise: Promise<Team | null>
	action: () => void
}

export const Skeleton: React.FC = () => (
	<div className="max-w-[500px] mx-auto py-10 p-8 rounded-xl shadow-lg bg-white text-center">
		<div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-6" />
		<div className="h-7 w-3/5 bg-gray-200 mx-auto mb-3" />
		<div className="h-4 w-2/5 bg-gray-100 mx-auto mb-6" />
		<div className="h-3 w-4/5 bg-gray-50 mx-auto" />
	</div>
);

const TeamDetailsContent = ({ teamPromise, action }: TeamDetailsContentProps) => {
	const _team = use(teamPromise)

	if (!_team) return <div>No team found.</div>;

	return (
		<div className="max-w-[500px] mx-auto py-10 p-8 rounded-xl shadow-2xl bg-white text-center" onClick={() => startTransition(() => { action() })}>
			<img
				src={_team.logoUrl}
				alt={_team.name + " logo"}
				className="w-24 h-24 rounded-full object-cover mb-6 mx-auto"
			/>
			<h2 className="text-2xl font-semibold mb-3">{_team.name}</h2>
			<div className="text-gray-500 text-lg mb-6">{_team.location}</div>
			<div className="text-gray-400 text-sm">
				Team details page stub. Add stats, roster, or other info here.
			</div>
		</div>
	);
};

let teamDetailsPromise = { teamId: null, promise: null } as { teamId: string | null, promise: Promise<Team | null> | null };
const TeamDetails = ({ viewedTeam, action }: TeamDetailsProps) => {
	if (viewedTeam == null) return <div>No team selected.</div>;
	if (viewedTeam !== teamDetailsPromise.teamId) {
		teamDetailsPromise = { teamId: viewedTeam, promise: getTeamDetail(viewedTeam) };
	}
	if (!teamDetailsPromise.promise) return <div>No team selected.</div>;
	return <Suspense fallback={<Skeleton />}>
		<TeamDetailsContent action={action} teamPromise={teamDetailsPromise.promise} />
	</Suspense>
}

export default TeamDetails;
