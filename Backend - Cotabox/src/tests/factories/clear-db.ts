import { ParticipationModel } from '../../models/participation.model';

export const clearParticipationDb = async () => {
    await ParticipationModel.deleteMany({});
}
