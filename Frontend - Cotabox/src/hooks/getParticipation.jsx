import useParticipationApi from './connection';

//Get
const useGetParticipation = () => {
    const apiClient = useParticipationApi();

    const getParticipation = async () => {
        try {
            const response = await apiClient.get('/participation');
            if (response.data && Array.isArray(response.data)) {
                return response.data;
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            throw new Error('Failed to get participation data');
        }
    };

    return getParticipation;
};

export default useGetParticipation;
