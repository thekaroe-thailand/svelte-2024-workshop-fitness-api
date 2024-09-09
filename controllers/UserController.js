const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const key = "my secret key for jwt of project fitness on Svelte";

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  signIn: async (req, res) => {
    try {
      const key = process.env.SECRET_KEY;
      const u = req.body.username;
      const p = req.body.password;

      if (u == "" || p == "") return res.status(401).send("unauthorized");

      const user = await prisma.user.findFirst({
        select: {
          id: true,
          name: true,
          level: true,
        },
      });

      if (!user) {
        const employee = await prisma.employeeAndTrainer.findFirst({
          select: {
            id: true,
            name: true,
            level: true,
          },
          where: {
            username: req.body.username,
            password: req.body.password,
            level: "employee",
          },
        });

        if (employee != null) {
          const tokenEmp = jwt.sign(employee, key, { expiresIn: "30d" });
          return res.send({
            token: tokenEmp,
            name: employee.name,
            level: employee.level,
          });
        }

        return res.status(401).send("unauthorized");
      }

      const token = jwt.sign(user, key, { expiresIn: "30d" });

      return res.send({ token: token, name: user.name, level: user.level });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  info: async (req, res) => {
    try {
      const payload = jwt.decode(req.headers.authorization, key);
      return res.send(payload);
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  changeProfile: async (req, res) => {
    try {
      const token = req.headers["authorization"];
      const payload = jwt.decode(token, key);

      const id = payload.id;

      const row = await prisma.employeeAndTrainer.findFirst({
        where: {
          id: id,
        },
      });

      let username = row.username;
      let password = row.password;

      if (req.body.username != "") {
        username = req.body.username;
      }

      if (req.body.password != "") {
        password = req.body.password;
      }

      await prisma.employeeAndTrainer.update({
        data: {
          username: username,
          password: password,
        },
        where: {
          id: id,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
