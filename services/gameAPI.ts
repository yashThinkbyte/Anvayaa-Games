// services/gameAPI.ts
const BASE_URL = "https://app.thinkbyte.ai"

export const fetchGameData = async (gameID: number): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/games/games-by-type-no-token/?game_type_id=${gameID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch game data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching game data:', error);
        throw error;
    }
};



export const fetchGameTypes = async (): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/games/game-types-no-token/`);
        if (!response.ok) {
            throw new Error('Failed to fetch game data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching game data:', error);
        throw error;
    }
};
