const express = require("express");
const {
  listKinds,
  getKind,
  createKind,
  updateKind,
  deleteKind,
} = require("../server/controllers/kindsController");

const kindsRouters = express.Router();

kindsRouters.get("/", listKinds);
kindsRouters.get("/kind/:idKind", getKind);
kindsRouters.post("/new-kind", createKind);
kindsRouters.put("/kind/:idKind", updateKind);
kindsRouters.delete("/kind/:idKind", deleteKind);

module.exports = kindsRouters;
