import useParticipationApi from './connection';

//Post
const useSendParticipation = () => {
    const apiClient = useParticipationApi();
    const sendParticipation = async (formData) => {
        try {
            const response = await apiClient.post('/participation', formData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to submit form data');
        }
    };

    return sendParticipation;
};

export default useSendParticipation
