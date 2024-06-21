import axios from 'axios';

//Conexão com Backend
const useParticipationApi = () => {
    const apiClient = axios.create({
        baseURL: 'http://localhost:4000/',
    });

    return apiClient;
};

export default useParticipationApi;
