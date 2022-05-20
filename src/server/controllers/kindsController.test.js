const { mockKinds, mockKind } = require("../../mocks/kinds");
const {
  listKinds,
  createKind,
  deleteKind,
  updateKind,
  /* getKind, */
} = require("./kindsController");

jest.mock("../../database/models/Kinds", () => ({
  ...jest.requireActual("../../database/models/Kinds"),
  find: jest.fn().mockResolvedValue(mockKinds),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockKind),
  create: jest.fn().mockResolvedValue(mockKind),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockKind),
}));

describe("Given a listKinds function", () => {
  describe("When invoked when a response and a list of kinds", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    test("Then it should call the response status method with 200", async () => {
      const expectedStatus = 200;

      await listKinds(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with the list of kinds", () => {
      listKinds(null, res);

      expect(res.json).toHaveBeenCalledWith(mockKinds);
    });
  });
});

describe("Given a createKind function", () => {
  describe("When invoked whit a response and a kind", () => {
    const req = {
      body: mockKind,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the response status method with 201", async () => {
      const expectedStatus = 201;

      await createKind(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method a message", () => {
      const expectedResponse = mockKind;

      createKind(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});

describe("Given a deleteKind function", () => {
  describe("When invoked when a response and a kind with id 1", () => {
    const req = {
      params: {
        idKind: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the response status method with 200", async () => {
      const expectedStatus = 200;

      await deleteKind(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method a message", () => {
      deleteKind(req, res);
      const expectedMessage = {
        msg: "Your kind has been removed (Kind id: 1)",
      };

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
/* 
describe("Given a getKind function", () => {
  describe("When invoked with a response and a kind with id 1", () => {
    const req = {
      params: {
        idKind: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the response status method with 200", async () => {
      const expectedStatus = 200;

      await getKind(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method a message", () => {
      deleteKind(req, res);
      const expectedMessage = {
        kind: {
          id: "1",
          kind: "Gatoperro",
        },
      };

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
}); */

describe("Given a updateKind function", () => {
  describe("When invoked whit a response, a kind and the kind id as req param", () => {
    const req = {
      params: "628748b70be4e618d149d039",
      body: mockKind,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the response status method with 200", async () => {
      const expectedStatus = 200;

      await updateKind(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method a message", () => {
      const expectedResponse = mockKind;

      updateKind(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
