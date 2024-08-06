const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const key = "my secret key for jwt of project fitness on Svelte";

module.exports = {
  signIn: async (req, res) => {
    try {
      const u = req.body.username;
      const p = req.body.password;

      if (u == "" || p == "") return res.status(401).send("unauthorized");

      const user = await prisma.user.findFirst({
        select: {
          id: true,
          name: true,
          level: true,
        },
        where: {
          username: u,
          password: p,
          status: "use",
        },
      });

      if (!user) return res.status(401).send("unauthorized");
      const token = jwt.sign(user, key, { expiresIn: "30d" });

      return res.send({ token: token });
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
};
