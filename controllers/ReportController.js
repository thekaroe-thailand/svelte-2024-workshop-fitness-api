const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  income: async (req, res) => {
    try {
      const members = await prisma.membership.findMany({
        where: {
          pay_date: {
            gte: req.body.fromDate,
            lte: req.body.toDate,
          },
        },
        include: {
          Member: true,
        },
      });

      const courseAndMembers = await prisma.courseAndMember.findMany({
        where: {
          createdDate: {
            gte: req.body.fromDate,
            lte: req.body.toDate,
          },
        },
        include: {
          Course: true,
          Member: true,
        },
      });

      return res.send({ members: members, courseAndMembers: courseAndMembers });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  payBetween: async (req, res) => {
    try {
      const rows = await prisma.payRecord.findMany({
        where: {
          payDate: {
            gte: req.body.fromDate,
            lte: req.body.toDate,
          },
        },
      });

      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
