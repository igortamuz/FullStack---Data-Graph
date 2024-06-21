import useParticipationApi from './connection';

//Update
const useUpdateParticipation = () => {
    const apiClient = useParticipationApi();
    const updateParticipation = async (id, updatedData) => {
        try {
            const response = await apiClient.put(`/participation/${id}`, updatedData);
            return response.data;
        } catch (error) {
            throw new Error('Failed to update participation');
        }
    };

    return updateParticipation;
};

export default useUpdateParticipation;
