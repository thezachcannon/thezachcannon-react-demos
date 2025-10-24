'use client';
import { useState, use, Suspense, Activity, ViewTransition, startTransition, useOptimistic } from "react";
import { Team } from "./components/TeamCard";
import TeamDetails, { Skeleton } from "./components/TeamDetails";
import Teams from "./components/Teams";


const ActivityDemo = ({ teamsPromise }: { teamsPromise: Promise<Team[]> }) => {
    const [viewedTeam, setViewedTeam] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const teams = use(teamsPromise);
    const [displayedTeams, setDisplayedTeams] = useState<Team[]>(teams);

    const shuffle = (arr: Team[]) => {
        const copy = arr.slice();
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = copy[i];
            copy[i] = copy[j];
            copy[j] = tmp;
        }
        return copy;
    }

    const randomizeOrder = () => {
        startTransition(() => {
            setDisplayedTeams(prev => shuffle(prev));
        })
    }
    const handleTeamClick = (team: Team) => {
        startTransition(() => {
            team.guid !== viewedTeam && setViewedTeam(team.guid)
            setIsOpen(true)
        }
        )
    };

    const teamDetailsCloseAction = () => {
        startTransition(() => {
            setViewedTeam(null)
            setIsOpen(false)
        })
    }

    const onHover = (team: Team) => {
        setViewedTeam(team.guid);
    };

    return (
        <div>
            <div className="flex justify-end p-4">
                {!isOpen && <button
                    type="button"
                    onClick={randomizeOrder}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    aria-label="Randomize team order"
                >
                    Randomize order
                </button>}
            </div>
            <ViewTransition>
                <Activity mode={!isOpen ? "visible" : "hidden"}>
                    <Teams teams={displayedTeams} onTeamClick={handleTeamClick} onHover={onHover} />
                </Activity>
            </ViewTransition>
            <ViewTransition>
                <Activity mode={isOpen ? "visible" : "hidden"}>
                    <TeamDetails viewedTeam={viewedTeam} action={teamDetailsCloseAction} />
                </Activity>
            </ViewTransition>
        </div>
    );
}

export default ActivityDemo;