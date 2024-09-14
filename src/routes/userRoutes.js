const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middlewares = require("../middlewares");

router.post("/users", userController.createUser);
router.use(middlewares.auth);

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users", userController.updateUsersStatus);
router.put("/users/:id", userController.updateUser);
router.delete("/users", userController.deleteUsers);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
