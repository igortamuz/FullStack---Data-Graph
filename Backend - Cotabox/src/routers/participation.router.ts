import express from 'express';
import { ParticipationController } from '../controllers';

const participationRouter = express.Router();

participationRouter
    .post('/', ParticipationController.createParticipation)
    .get('/', ParticipationController.getAllParticipations)
    .get('/:id', ParticipationController.getParticipationById)
    .put('/:id', ParticipationController.updateParticipation)
    .delete('/:id', ParticipationController.deleteParticipation);

export { participationRouter };
