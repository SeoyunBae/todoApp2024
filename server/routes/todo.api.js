const express = require("express");
const { getTodo, createTodo, putTodo, deleteTodo } = require("../controller/todo.controller");

const router = express.Router();

router.get("/", getTodo);
router.post("/", createTodo);
router.put("/:id", putTodo);
router.delete("/:id", deleteTodo);

module.exports = router;