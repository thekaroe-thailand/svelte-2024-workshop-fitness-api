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
};
