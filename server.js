const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const userController = require("./controllers/UserController");
const memberController = require("./controllers/MemberController");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/user/signIn", (req, res) => userController.signIn(req, res));
app.get("/api/user/info", (req, res) => userController.info(req, res));
app.post("/api/member/create", (req, res) => memberController.create(req, res));
app.get("/api/member/list", (req, res) => memberController.list(req, res));
app.delete("/api/member/remove/:id", (req, res) =>
  memberController.remove(req, res)
);
app.put("/api/member/update/:id", (req, res) =>
  memberController.update(req, res)
);
app.post("/api/member/membership", (req, res) =>
  memberController.membership(req, res)
);
app.get("/api/member/membershipList/:member_id", (req, res) =>
  memberController.membershipList(req, res)
);

app.listen(3000, () => {
  console.log("API Server Started");
});
