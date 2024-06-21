import axios from 'axios';

//Conexão com Backend
const useParticipationApi = () => {
    const apiClient = axios.create({
        baseURL: 'https://backend-cotabox-deploy.onrender.com/',
    });

    return apiClient;
};

export default useParticipationApi;
