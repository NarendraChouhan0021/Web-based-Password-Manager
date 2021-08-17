module.exports = app => {
  const wpm = require("../controllers/wpm.controller");

  const router = require("express").Router();
  router.post("/generate-passoword", wpm.create); /* Create a new WPM */

  router.get("/get-wpm-list", wpm.findAll); /* Retrieve all Wpm's */
  
  router.get("/get-wpm/:id", wpm.findOne); /* Retrieve a single WPM with id */
  
  router.put("/edit-passoword/:id", wpm.update); /*  Update a WPM with id */
  
  router.delete("/delete-wpm/:id", wpm.delete); /*  Delete a WPM with id */

  app.use("/v1/wpm", router);
};
