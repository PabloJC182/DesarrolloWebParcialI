module.exports = app => {
  const contenidos = require("../controllers/controller.js");
  const { verifyToken } = require("../middlewares/authJwt.js");
  var router = require("express").Router();
  const auth = require("../controllers/controller.js");

  router.post("/create/", contenidos.create);

  router.get("/", contenidos.findAll);
  router.get("/tipo/:tipo", contenidos.findAllByTipo);
  router.get("/:id", contenidos.findOne);

  router.put("/update/:id", contenidos.update);

  router.delete("/delete/:id", contenidos.delete);
  router.delete("/delete/", contenidos.deleteAll);


  router.post("/signup", auth.signup);
  router.post("/signin", auth.signin);
  
  app.use("/api/v1/parcial/contenido", router);

};
