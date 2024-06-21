import { ParticipationModel, Participation } from "../models";

async function createParticipation(
  participationData: Participation
): Promise<Participation> {
  const participation = new ParticipationModel(participationData);
  return participation.save();
}

async function getAllParticipations(): Promise<Participation[]> {
  const participations = await ParticipationModel.find({});
  return participations;
}

async function getParticipationById(id: string): Promise<Participation> {
  const participation = await ParticipationModel.findById(id);
  if (!participation) {
    throw new Error(`Participation with id ${id} not found`);
  }
  return participation;
}

async function updateParticipationById(
  id: string,
  updatedParticipation: Partial<Participation>
): Promise<Participation> {
  const participation = await ParticipationModel.findByIdAndUpdate(
    id,
    updatedParticipation,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!participation) {
    throw new Error(`Participation with id ${id} not found`);
  }
  return participation;
}

async function deleteParticipationById(id: string): Promise<string> {
  const result = await ParticipationModel.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw new Error(`Participation with id ${id} not found`);
  }
  return `Participation with id ${id} has been deleted`;
}

export const ParticipationRepository = {
  createParticipation,
  getAllParticipations,
  getParticipationById,
  updateParticipationById,
  deleteParticipationById,
};
