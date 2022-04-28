import { Recommendation } from '../model/Recommendation';
import axios from 'axios';
import { ActionType } from '../model/enums/ActionType';

const baseUrl = 'https://my-json-server.typicode.com/ukaszzz/movie-tinder-db';

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