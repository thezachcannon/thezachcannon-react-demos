import { Team } from "@/app/pages/ActivityDemo/components/TeamCard";
import teams from "./teams";

const delay = (durationMs: number) => {
    return new Promise(resolve => setTimeout(resolve, durationMs));
}

const randomMs = () => Math.round(Math.random() * 1500);

export const getTeamDetails = async (): Promise<Team[]> => {
    console.log('fetching teams')
    // Simulate an API call with randomized network delay between 0-1500ms
    await delay(randomMs());
    return Object.values(teams);
}

export const getTeamDetail = async (teamId: string): Promise<Team | null> => {
    // Simulate network delay randomized between 0-1500ms
    await delay(randomMs());
    return teams[teamId] || null
}