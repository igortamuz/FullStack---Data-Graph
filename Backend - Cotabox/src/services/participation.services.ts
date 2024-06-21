import { Participation } from '../models';
import { participationSchema } from '../schemas';
import { ParticipationRepository } from '../repositories';

async function createParticipation(participationData: Participation): Promise<Participation> {
    const { error } = participationSchema.validate(participationData);
    if (error) {
        throw new Error(error.message);
    }

    const newParticipation = await ParticipationRepository.createParticipation(participationData);
    return newParticipation;
};

async function getAllParticipations(): Promise<Participation[]> {
    const participations = await ParticipationRepository.getAllParticipations();
    return participations;
};

async function getParticipationById(id: string): Promise<Participation> {
    const participation = await ParticipationRepository.getParticipationById(id);
    return participation;
};

async function updateParticipation(id: string, updatedParticipation: Partial<Participation>): Promise<Participation> {
    const existingParticipation = await getParticipationById(id);
    if (!existingParticipation) {
        throw new Error(`Participation with id ${id} not found`);
    }

    const updatedParticipationDoc = await ParticipationRepository.updateParticipationById(id, updatedParticipation);
    return updatedParticipationDoc;
};

async function deleteParticipationById(id: string): Promise<string> {
    const participation = await ParticipationRepository.deleteParticipationById(id);
    return participation;
};

export const ParticipationService = {
    createParticipation,
    getAllParticipations,
    getParticipationById,
    updateParticipation,
    deleteParticipationById
};
