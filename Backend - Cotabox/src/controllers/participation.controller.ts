import { Request, Response } from "express";
import { ParticipationService } from "../services";
import httpStatus from "http-status";
import mongoose from "mongoose";

async function createParticipation(req: Request, res: Response) {
  try {
    const { firstName, lastName, participation } = req.body;
    if (!firstName || !lastName || participation === undefined) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Missing required fields" });
    }

    if (
      typeof participation !== "number" ||
      participation < 0 ||
      participation > 100
    ) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Invalid participation value" });
    }

    const newParticipation = await ParticipationService.createParticipation(
      req.body
    );
    res.status(httpStatus.CREATED).json(newParticipation);
  } catch (error: any) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

async function getAllParticipations(req: Request, res: Response) {
  try {
    const result = await ParticipationService.getAllParticipations();
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Could not get all participations: ${error}` });
  }
}

async function getParticipationById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `Invalid participation ID: ${id}` });
    }
    const participation = await ParticipationService.getParticipationById(id);
    return res.status(httpStatus.OK).json(participation);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
}

async function updateParticipation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `Invalid participation ID: ${id}` });
    }
    const updatedParticipation = req.body;
    const updatedParticipationDoc =
      await ParticipationService.updateParticipation(id, updatedParticipation);
    if (!updatedParticipationDoc) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `Participation not found with ID: ${id}` });
    }
    res.json(updatedParticipationDoc);
  } catch (error: any) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

async function deleteParticipation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `Invalid participation ID: ${id}` });
    }
    const deletedCount = await ParticipationService.deleteParticipationById(id);
    res.status(httpStatus.OK).json({ deletedCount });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: `Internal server error` });
  }
}

export const ParticipationController = {
  createParticipation,
  getAllParticipations,
  getParticipationById,
  updateParticipation,
  deleteParticipation,
};
