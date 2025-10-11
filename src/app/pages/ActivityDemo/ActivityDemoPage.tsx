import { Suspense, ViewTransition } from "react";
import ActivityDemo from "./ActivityDemo";
import { getTeamDetails } from "@/app/shared/services/teamService";

const ActivityDemoPage: React.FC = async ({ }) => {
    const teamsPromise = getTeamDetails();
    return <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-500 to-sky-800 text-slate-900">
        <Suspense fallback={<div></div>}>
            <ActivityDemo teamsPromise={teamsPromise} />

        </Suspense>
    </div>
};

export default ActivityDemoPage;
