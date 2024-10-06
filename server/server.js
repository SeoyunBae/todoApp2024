const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const indexRouter = require("./routes/index");

const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use("/api", indexRouter);
const PORT = process.env.PORT || 7000;

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Todo 스키마 정의
const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    complete: { type: Boolean, default: false },
});

const Todo = mongoose.model('Task', todoSchema);

// Middleware 설정
app.use(cors());
app.use(bodyParser.json());

// CRUD API 엔드포인트
// Create
app.post('/api/todos', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json(newTodo);
});

// Read
app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Update
app.put('/api/todos/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
});

// Delete
app.delete('/api/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
