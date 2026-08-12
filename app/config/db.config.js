module.exports = {
    HOST: "ep-ancient-tooth-ayyhuu1a-pooler.c-5.us-east-2.aws.neon.tech",
    USER: "neondb_owner",
    PASSWORD: "npg_oxZdVcC0Kj1S",
    DB: "neondb",
    dialect: "postgres", 
    ssl: 'true',
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}