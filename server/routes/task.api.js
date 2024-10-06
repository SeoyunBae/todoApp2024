const express = require("express");
const { getTodo, createTodo, putTodo, deleteTodo } = require("../controller/todo.controller");

const router = express.Router();

router.get("/", getTodo);
router.post("/", createTodo);
router.put("/:id", putTodo);
router.delete("/:id", deleteTodo);

module.exports = router;



// const express = require("express");
// const { createTask, getTasks, putTasks, deleteTasks } = require("../controller/task.controller");

// const router = express.Router();

// router.get("/", getTasks);
// router.post("/", createTask);
// router.put("/:id", putTasks);
// router.delete("/:id", deleteTasks);

// module.exports = router;