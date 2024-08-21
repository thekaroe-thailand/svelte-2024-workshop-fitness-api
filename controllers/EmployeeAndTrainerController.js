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
  list: async (req, res) => {
    try {
      const rows = await prisma.employeeAndTrainer.findMany({
        orderBy: {
          id: "desc",
        },
      });

      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.employeeAndTrainer.update({
        data: {
          status: "delete",
        },
        where: {
          id: parseInt(req.params.id),
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  update: async (req, res) => {
    try {
      await prisma.employeeAndTrainer.update({
        data: {
          name: req.body.name,
          phone: req.body.phone,
          salary: req.body.salary,
          address: req.body.address,
          level: req.body.level,
          gender: req.body.gender,
        },
        where: {
          id: parseInt(req.params.id),
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  filter: async (req, res) => {
    try {
      let condition = {};

      if (req.body.gender != "all") {
        condition.gender = req.body.gender;
      }

      if (req.body.level != "all") {
        condition.level = req.body.level;
      }

      if (req.body.status != "all") {
        condition.status = req.body.status;
      }

      const rows = await prisma.employeeAndTrainer.findMany({
        where: condition,
        orderBy: {
          id: "desc",
        },
      });

      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
