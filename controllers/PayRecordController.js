const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      await prisma.payRecord.create({
        data: {
          name: req.body.name,
          remark: req.body.remark,
          qty: req.body.qty,
          price: req.body.price,
          payDate: req.body.payDate,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  list: async (req, res) => {
    try {
      const data = await prisma.payRecord.findMany({
        orderBy: {
          id: "desc",
        },
      });

      return res.send({ results: data });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.payRecord.delete({
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
      await prisma.payRecord.update({
        data: {
          name: req.body.name,
          price: req.body.price,
          qty: req.body.qty,
          payDate: req.body.payDate,
          remark: req.body.remark,
        },
        where: {
          id: req.body.id,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
