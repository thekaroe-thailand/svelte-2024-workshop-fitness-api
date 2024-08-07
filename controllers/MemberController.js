const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      await prisma.member.create({
        data: {
          name: req.body.name,
          phone: req.body.phone,
          gender: req.body.gender,
          registerDate: new Date(req.body.registerDate),
          expireDate: new Date(req.body.expireDate),
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
