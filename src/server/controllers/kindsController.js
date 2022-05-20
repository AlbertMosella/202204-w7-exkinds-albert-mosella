require("dotenv").config();
const debug = require("debug")("kinds:server:controllers");
const chalk = require("chalk");
const Kind = require("../../database/models/Kinds");

const listKinds = async (req, res) => {
  debug(chalk.bold.cyanBright("Kinds request received"));

  const kinds = await Kind.find();
  res.status(200).json(kinds);
};

const getKind = async (req, res, next) => {
  debug(chalk.bold.redBright("Request to get an only kind received"));
  const { idKind } = req.params;

  try {
    const kind = await Kind.findById(idKind);

    if (kind) {
      res.status(200).json({
        kind,
      });
      return;
    }

    const error = new Error(`Can't find this kind with this id: ${idKind}`);
    error.code = 404;
    next(error);
  } catch (error) {
    error.message = "Invalid request";
    error.code = 400;
    next(error);
  }
};

const createKind = async (req, res, next) => {
  debug(chalk.bold.redBright("Request to add a kind received"));
  const kind = req.body;

  try {
    const newKind = await Kind.create(kind);
    res.status(201).json(newKind);
  } catch (error) {
    error.message = "Invalid request";
    error.code = 400;
    next(error);
  }
};

const updateKind = async (req, res, next) => {
  debug(chalk.yellowBright("Request to edit a kind received"));
  const { idKind } = req.params;
  const kind = req.body;

  try {
    const updatedKind = await Kind.findByIdAndUpdate({ _id: idKind }, kind);
    res.status(200).json(updatedKind);
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const deleteKind = async (req, res, next) => {
  debug(chalk.bold.redBright("Request to remove an only kind received"));
  const { idKind } = req.params;

  try {
    const kind = await Kind.findByIdAndDelete(idKind);

    if (kind) {
      res.status(200).json({
        msg: `Your kind has been removed (Kind id: ${idKind})`,
      });
      return;
    }

    const error = new Error(`Can't find this kind with this id: ${idKind}`);
    error.code = 404;
    next(error);
  } catch (error) {
    error.message = "Invalid request";
    error.code = 400;
    next(error);
  }
};

module.exports = {
  listKinds,
  getKind,
  createKind,
  updateKind,
  deleteKind,
};
