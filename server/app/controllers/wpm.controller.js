const db = require("../models");
const WPM = db.wpms;
const CryptoJS = require("crypto-js");
const generator = require("generate-password");

/* Create and Save a new WPM */
exports.create = async (req, res) => {
  
  if (!req.body.website_name) {
    res.status(400).send({
      message: "Website Name can not be empty!"
    });
    return;
  }
  const pass = await generatePassword();

  const wpm = {
    website_name: req.body.website_name,
    password: pass,
  };
  console.log("wpm", wpm)

  /*  Save WPM in the database */
  WPM.create(wpm)
    .then(data => {
      res.status(200).send({
        status: 200,
        message: "Successfully Password Generated",
        res: data
      });
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message:
          err.message || "Some error occurred while creating the WPM record"
      });
    });
};


/* Retrieve all Tutorials from the database. */
exports.findAll = (req, res) => {
  var condition = null;

  WPM.findAll({ where: condition })
    .then(data => {
      res.status(200).send({
        status: 200,
        message: "Success",
        res: { list: data }
      });
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message:
          err.message || "Some error occurred while retrieving wpms."
      });
    });
};


/*  Find a single WPM with an id */
exports.findOne = (req, res) => {
  const id = req.params.id;

  WPM.findByPk(id)
    .then(data => {
      res.status(200).send({
        status: 200,
        message: "success",
        res: data
      });

    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message: "Error retrieving WPM with id=" + id
      });
    });
};


/* Update a WPM by the id in the request */
exports.update = async (req, res) => {
  const id = req.params.id;
  const pass = await generatePassword();

  const wpm = {
    website_name: req.body.website_name,
    password: pass,
  };

  WPM.update(wpm, {
    where: { _id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 200,
          message: "WPM record  updated successfully.",
          res: { _id: id, ...wpm }
        });
      } else {
        res.status(500).send({
          status: 500,
          message: `Cannot update WPM with id=${id}. Maybe WPM was not found or req.body is empty!`,
          res: {}
        });

      }
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message: "Error updating WPM with id=" + id
      });
    });
};


/* Delete a WPM with the specified id in the request */
exports.delete = (req, res) => {
  const id = req.params.id;

  WPM.destroy({
    where: { _id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          status: 200,
          message: `WPM record with id=${id} deleted successfully!`,
          res: {}
        });

      } else {
        res.status(500).send({
          status: 500,
          message: `Cannot delete WPM with id=${id}. Maybe WPM was not found!`,
          res: {}
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message: "Could not delete WPM with id=" + id
      });
    });
};


const generatePassword = async () => {
  const password_string = generator.generate({ length: 8, numbers: true });

  const secret_key = "toPs?915@Wpm21";

  const password_encrypt = CryptoJS.AES.encrypt(
    password_string,
    secret_key
  ).toString();

  /*  Decrypt
   const bytes  = CryptoJS.AES.decrypt(password_encrypt, '');
   const originalText = bytes.toString(CryptoJS.enc.Utf8);
  */

  return password_encrypt;
}