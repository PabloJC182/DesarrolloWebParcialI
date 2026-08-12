module.exports = app => {
  const contenidos = require("../controllers/controller.js");
  var router = require("express").Router();

  router.post("/create/", contenidos.create);

  router.get("/", contenidos.findAll);
  router.get("/tipo/:tipo", contenidos.findAllByTipo);
  router.get("/:id", contenidos.findOne);

  router.put("/update/:id", contenidos.update);

  router.delete("/delete/:id", contenidos.delete);
  router.delete("/delete/", contenidos.deleteAll);

  app.use("/api/v1/parcial/contenido", router);
};