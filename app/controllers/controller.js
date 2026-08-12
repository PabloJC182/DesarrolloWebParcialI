const db = require("../models");
const Contenido = db.contenido;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.nombre) {
    res.status(400).send({
      message: "Nombre no puede estar vacío."
    });
    return;
  }

  const contenido = {
    nombre: req.body.nombre,
    sinopsis: req.body.comentario,
    actores: req.body.actores,
    duracion: req.body.duracion,
    tipo: req.body.tipo,
    categoria: req.body.categoria,
    yearLanzamiento: req.body.yearLanzamiento
  };

  Contenido.create(contenido)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Surgio un error cuándo se estaba creando el Contenido."
      });
    });
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

  Contenido.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Surgio un error cuándo se estaban obteniendo todos los contenidos."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Contenido.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al obtener Contenido con el id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Contenido.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contendio fue actualizado correctamente."
        });
      } else {
        res.send({
          message: `No fue posible actualizar el Contenido con id=${id}. El contenido no fue encontrado o el body de la request está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el Contenido con id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Contenido.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Contenido fue eliminado correctamente!"
        });
      } else {
        res.send({
          message: `No fue posible eliminar el Contenido con id=${id}. El contenido no fue encontrado!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el Contenido con id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Contenido.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Contenidos fueron eliminados correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Surgio un error cuando se estaban eliminando todos los contenidos."
      });
    });
};

exports.findAllByTipo = (req, res) => {
  const tipo = req.params.tipo;

  Contenido.findAll({ where: { tipo: tipo } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Surgio un error cuando se estaban obteniendo los contenidos por tipo."
      });
    });
};

const config = require("../auth/auth.config.js");
const Usuario = db.usuarios;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  Usuario.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })
    .then(usuario => {
      res.send({ message: "Usuario registrado exitosamente!", id: usuario.id });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Ocurrió un error al registrar el usuario." });
    });
};

exports.signin = (req, res) => {
  Usuario.findOne({
    where: { username: req.body.username }
  })
    .then(usuario => {
      if (!usuario) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      const passwordEsValida = bcrypt.compareSync(req.body.password, usuario.password);
      if (!passwordEsValida) {
        return res.status(401).send({ message: "Contraseña incorrecta." });
      }

      const token = jwt.sign({ id: usuario.id }, config.secret, {
        expiresIn: config.expiresIn});

      res.status(200).send({
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        accessToken: token,
        expiresIn: config.expiresIn
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Ocurrió un error al iniciar sesión." });
    });
};

