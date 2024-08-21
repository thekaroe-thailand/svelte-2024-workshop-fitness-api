const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const userController = require("./controllers/UserController");
const memberController = require("./controllers/MemberController");
const checkinController = require("./controllers/CheckInController");
const deviceController = require("./controllers/DeviceController");
const employeeAndTrainer = require("./controllers/EmployeeAndTrainerController");
const courseController = require("./controllers/CourseController");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/course/create", (req, res) => courseController.create(req, res));
app.post("/api/employeeAndTrainer/filter", (req, res) =>
  employeeAndTrainer.filter(req, res)
);
app.put("/api/employeeAndTrainer/update/:id", (req, res) =>
  employeeAndTrainer.update(req, res)
);
app.delete("/api/employeeAndTrainer/remove/:id", (req, res) =>
  employeeAndTrainer.remove(req, res)
);
app.get("/api/employeeAndTrainer/list", (req, res) =>
  employeeAndTrainer.list(req, res)
);
app.post("/api/employeeAndTrainer/create", (req, res) =>
  employeeAndTrainer.create(req, res)
);
app.put("/api/device/update/:id", (req, res) =>
  deviceController.update(req, res)
);
app.delete("/api/device/remove/:id", (req, res) =>
  deviceController.remove(req, res)
);
app.get("/api/device/list", (req, res) => deviceController.list(req, res));
app.post("/api/device/create", (req, res) => deviceController.create(req, res));
app.delete("/api/checkin/remove/:id", (req, res) =>
  checkinController.remove(req, res)
);
app.get("/api/checkin/list", (req, res) => checkinController.list(req, res));
app.post("/api/checkin/create", (req, res) =>
  checkinController.create(req, res)
);
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
app.delete("/api/member/removeHistory/:id", (req, res) =>
  memberController.removeHistory(req, res)
);
app.put("/api/member/membershipUpdate/:id", (req, res) =>
  memberController.membershipUpdate(req, res)
);

app.listen(3000, () => {
  console.log("API Server Started");
});
