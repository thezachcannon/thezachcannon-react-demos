import ActivityDemo from "./ActivityDemo";
import { getTeamDetails } from "@/app/shared/services/teamService";

const ActivityDemoPage: React.FC = () => {
    const teamsPromise = getTeamDetails();
    return <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-500 to-sky-800 text-slate-900">
        <ActivityDemo teamsPromise={teamsPromise} />
    </div>
};

export default ActivityDemoPage;
