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
  list: async (req, res) => {
    try {
      const rows = await prisma.member.findMany();
      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.member.delete({
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
      await prisma.member.update({
        data: {
          name: req.body.name,
          phone: req.body.phone,
          gender: req.body.gender,
          registerDate: new Date(req.body.registerDate),
          expireDate: new Date(req.body.expireDate),
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
  membership: async (req, res) => {
    try {
      const payload = {
        member_id: req.body.member_id,
        pay_date: new Date(),
        money: req.body.money,
        remark: req.body.remark,
      };

      await prisma.membership.create({
        data: payload,
      });

      await prisma.member.update({
        data: {
          expireDate: new Date(req.body.expire_date),
        },
        where: {
          id: req.body.member_id,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  membershipList: async (req, res) => {
    try {
      const member_id = parseInt(req.params.member_id);
      const rows = await prisma.membership.findMany({
        where: {
          member_id: member_id,
        },
        include: {
          Member: true,
        },
      });

      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  removeHistory: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await prisma.membership.delete({
        where: {
          id: id,
        },
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  membershipUpdate: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await prisma.membership.update({
        data: {
          money: req.body.money,
          remark: req.body.remark,
        },
        where: {
          id: id,
        },
      });

      await prisma.member.update({
        data: {
          expireDate: new Date(req.body.expire_date),
        },
        where: {
          id: req.body.member_id,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
