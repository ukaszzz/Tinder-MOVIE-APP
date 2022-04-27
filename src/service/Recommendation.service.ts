import { Recommendation } from '../model/Recommendation';
import axios from 'axios';
import { ActionType } from '../model/enums/ActionType';

const baseUrl = 'http://localhost:3001';

const getRecommendationData = () => {
    return axios.get<Recommendation[]>(`${baseUrl}/recommendations`);
    };

const acceptOrReject = (
    id: string | undefined,
    actionType: ActionType
) => {
    return axios.put<ActionType[]>(`${baseUrl}/${id}/${actionType}`);
};

const MovieCardDataService = {
    getRecommendationData,
    acceptOrReject,
};

export default MovieCardDataService;