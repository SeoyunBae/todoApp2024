const Todo = require("../models/Todo");

const TodoController = {};

TodoController.createTodo = async(req, res) => {
    try{
        const { name, complete } = req.body;
        const newTodo = new Todo({ name, complete });
        await newTodo.save();

        return res.status(200).json({ status: "OK", data: newTodo});

    }
    catch (error) {
        res.status(400).json({ status: "fail", error });

    }
};

TodoController.getTodo = async(req, res) => {
    try{
        const todos = await Todo.find();
        return res.status(200).json({ status : "OK", data: todos});
    }
    catch (error){
        res.status(400).json({ status: "fail", error });
    }
};

TodoController.putTodo = async(req, res) => {
    const { id } = req.params;
    const { name, complete } = req.body;
    try{
        const updatedtodos = await Todo.findByIdAndUpdate(
            id,
            { name, complete, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!updatedtodos) {
            return res.status(404).send('Todo not found');
        };
        // res.send(updatedTasks);
        return res.status(200).json({ status : "OK", data: updatedtodos});
    }
    catch (error){
        res.status(400).json({ status: "fail", error });
    }
};

TodoController.deleteTodo = async(req, res) => {
    const { id } = req.params;
    try{
        const deletedtodos = await Todo.findByIdAndDelete(id);
        if(!deletedtodos){
            return res.status(404).send('Todo not found');
        };
        return res.status(200).json({ status : "OK", data: "Deleted : "+ deletedtodos});

    }
    catch (error) {
        res.status(400).json({ status: "fail", error });
    }
};

module.exports = TodoController;