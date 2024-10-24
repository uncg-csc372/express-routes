"use strict";
const model = require("../models/games.model");

function getAll(req, res, next) {
  try {
    res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting games ", err.message);
    next(err);
  }
}

function getAllByOneAttribute(req, res, next) {
  let attribute = req.query.attribute;
  let value = req.query.value;
  if (attribute && value) {
    try {
      res.json(model.getAllByOneAttribute(attribute, value));
    } catch (err) {
      console.error("Error while getting games: ", err.message);
      next(err);
    }
  }
  else {
    res.status(400).send("Invalid Request");
  }
}

function getOneById(req, res, next) {
  try {
    res.json(model.getOneById(req.params.id));
  } catch (err) {
    console.error("Error while getting games: ", err.message);
    next(err);
  }
}

function createNew(req, res, next) {
  let id = parseInt(req.body.id);
  let name = req.body.name;
  let platform = req.body.platform;
  let release_year = parseInt(req.body.release_year);
  let genre = req.body.genre;
  let publisher = req.body.publisher;
  let developer = req.body.developer;
  let rating = req.body.rating;

  if (id && name && platform && release_year && genre && publisher && developer && rating) {
    let params = [id, name, platform, release_year, genre, publisher, developer, rating];
    try {
      res.json(model.createNew(params));
    } catch (err) {
      console.error("Error while creating game: ", err.message);
      next(err);
    }
  }
  else {
    res.status(400).send("Invalid Request");
  }
}

module.exports = {
  getAll,
  getAllByOneAttribute,
  getOneById,
  createNew
};
