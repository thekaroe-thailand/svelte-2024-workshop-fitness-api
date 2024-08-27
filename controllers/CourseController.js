const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      await prisma.course.create({
        data: {
          name: req.body.name,
          price: req.body.price,
          detail: req.body.detail ?? "",
          remark: req.body.remark ?? "",
          dayPerWeek: req.body.dayPerWeek,
          hourPerDay: req.body.hourPerDay,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  list: async (req, res) => {
    try {
      const rows = await prisma.course.findMany({
        include: {
          CourseAndTrainers: {
            include: {
              Trainer: true,
            },
          },
        },
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
      await prisma.course.update({
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
  upate: async (req, res) => {
    try {
      await prisma.course.update({
        data: {
          name: req.body.name,
          price: req.body.price,
          dayPerWeek: req.body.dayPerWeek,
          hourPerDay: req.body.hourPerDay,
          remark: req.body.remark,
          detail: req.body.detail,
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
};
