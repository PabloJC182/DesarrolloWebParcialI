module.exports = (sequelize, Sequelize) => {
  const Contenido = sequelize.define("contenido", {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comentario: {
      type: Sequelize.STRING
    },
    actores: {
      type: Sequelize.STRING
    },
    duracion: {
      type: Sequelize.INTEGER
    },
    tipo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    categoria: {
      type: Sequelize.STRING
    },
    yearLanzamiento: {
      type: Sequelize.INTEGER
    },
    verifyToken: {
      type: Sequelize.STRING
    }
  });

  const Usuario = sequelize.define("usuario", {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return {
    Contenido,
    Usuario
  };
};