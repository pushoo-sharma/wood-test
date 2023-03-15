const seedDefaultAdmin = require("./admin.seed")

const runSeed = async () => {
    await seedDefaultAdmin()
}


module.exports = runSeed