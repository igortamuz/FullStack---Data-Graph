import request from "supertest";
import { app } from "../../app";
import { clearParticipationDb } from "../factories/clear-db";
import httpStatus from "http-status";
import { connect } from "../../database/db";

describe("POST /participation", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await clearParticipationDb();
  });

  it("should create a new participation", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      participation: 25,
    };

    const response = await request(app).post("/participation").send(data);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body.firstName).toBe(data.firstName);
    expect(response.body.lastName).toBe(data.lastName);
    expect(response.body.participation).toBe(data.participation);
  });

  it("should return 400 if firstName is missing", async () => {
    const data = {
      lastName: "Doe",
      participation: 25,
    };

    const response = await request(app)
      .post("/participation")
      .send(data)
      .expect(httpStatus.BAD_REQUEST);

    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 if lastName is missing", async () => {
    const data = {
      firstName: "John",
      participation: 25,
    };

    const response = await request(app)
      .post("/participation")
      .send(data)
      .expect(httpStatus.BAD_REQUEST);

    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 if participation is missing", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
    };

    const response = await request(app)
      .post("/participation")
      .send(data)
      .expect(httpStatus.BAD_REQUEST);

    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 if participation is not a number", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      participation: "invalid",
    };

    const response = await request(app)
      .post("/participation")
      .send(data)
      .expect(httpStatus.BAD_REQUEST);

    expect(response.body).toHaveProperty("error");
  });

  it("should return 400 if participation is negative", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      participation: -10,
    };

    const response = await request(app)
      .post("/participation")
      .send(data)
      .expect(httpStatus.BAD_REQUEST);

    expect(response.body).toHaveProperty("error");
  });
});

describe("GET /participation", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await clearParticipationDb();
  });

  it("responds with JSON array of participations", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      participation: 25,
    };

    await request(app).post("/participation").send(data);

    const response = await request(app)
      .get("/participation")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /participation/:id", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await clearParticipationDb();
  });

  it("returns a participation with a valid ID", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      participation: 25,
    };

    const participation = await request(app).post("/participation").send(data);

    const response = await request(app)
      .get(`/participation/${participation.body._id}`)
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK);

    expect(response.body).toMatchObject({
      _id: participation.body._id,
      firstName: data.firstName,
      lastName: data.lastName,
      participation: data.participation,
    });
  });

  it("returns a 404 error for a nonexistent ID", async () => {
    const nonexistentId = "123456789";

    const response = await request(app)
      .get(`/participation/${nonexistentId}`)
      .expect(httpStatus.NOT_FOUND);

    expect(response.body).toHaveProperty(
      "error",
      `Invalid participation ID: ${nonexistentId}`
    );
  });
});

describe("DELETE /participation/:id", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await clearParticipationDb();
  });

  it("should delete participation and return 200", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      participation: 25,
    };

    const participation = await request(app).post("/participation").send(data);

    const response = await request(app)
      .delete(`/participation/${participation.body._id}`)
      .expect(httpStatus.OK);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveProperty("deletedCount");
  });

  it("returns a 404 error for deleting a nonexistent ID", async () => {
    const nonexistentId = "123456789";

    const response = await request(app)
      .delete(`/participation/${nonexistentId}`)
      .expect(httpStatus.NOT_FOUND);

    expect(response.body).toHaveProperty(
      "error",
      `Invalid participation ID: ${nonexistentId}`
    );
  });

  it("returns a 400 error for deleting with invalid ID format", async () => {
    const invalidId = "invalid-id-format";

    const response = await request(app)
      .delete(`/participation/${invalidId}`)
      .expect(httpStatus.NOT_FOUND);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body).toHaveProperty(
      "error",
      `Invalid participation ID: ${invalidId}`
    );
  });
});

describe("PUT /participation/:id", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await clearParticipationDb();
  });

  it("should update a participation with a valid ID", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      participation: 25,
    };

    const participation = await request(app).post("/participation").send(data);

    const newData = {
      firstName: "Jane",
      lastName: "Smith",
      participation: 50,
    };

    const response = await request(app)
      .put(`/participation/${participation.body._id}`)
      .send(newData)
      .expect(httpStatus.OK);

    expect(response.body).toMatchObject(newData);
  });

  it("returns a 404 error for updating a nonexistent ID", async () => {
    const nonexistentId = "123456789";
    const newData = {
      firstName: "Jane",
      lastName: "Smith",
      participation: 50,
    };

    const response = await request(app)
      .put(`/participation/${nonexistentId}`)
      .send(newData)
      .expect(httpStatus.NOT_FOUND);

    expect(response.body).toHaveProperty(
      "error",
      `Invalid participation ID: ${nonexistentId}`
    );
  });

  it("returns a 400 error for updating with invalid data", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      participation: 25,
    };

    const participation = await request(app).post("/participation").send(data);

    const invalidData = {
      participation: "invalid",
    };

    const response = await request(app)
      .put(`/participation/${participation.body._id}`)
      .send(invalidData)
      .expect(httpStatus.INTERNAL_SERVER_ERROR);

    expect(response.body).not.toHaveProperty("error");
  });
});
