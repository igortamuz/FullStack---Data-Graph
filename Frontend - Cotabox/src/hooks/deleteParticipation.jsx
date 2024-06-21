import useParticipationApi from './connection';

//Delete
const useDeleteParticipation = () => {
    const apiClient = useParticipationApi();
    const deleteParticipation = async (id) => {
        try {
            const response = await apiClient.delete(`/participation/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to delete participation');
        }
    };

    return deleteParticipation;
};

export default useDeleteParticipation;
