import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Participation extends Document {
  firstName: string;
  lastName: string;
  participation: number;
}

const participationSchema: Schema<Participation> = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  participation: { type: Number, required: true },
});

export const ParticipationModel: Model<Participation> = mongoose.model<Participation>('Participation', participationSchema);
