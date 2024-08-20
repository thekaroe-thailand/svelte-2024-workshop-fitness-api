const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      await prisma.employeeAndTrainer.create({
        data: {
          gender: req.body.gender,
          name: req.body.name,
          phone: req.body.phone,
          address: req.body.address,
          salary: req.body.salary,
          level: req.body.level,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
