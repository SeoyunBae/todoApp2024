const Todo = require("../models/Todo");

const taskController = {};

taskController.createTask = async(req, res) => {
    try{
        const { name, complete } = req.body;
        const newTask = new Task({ name, complete });
        await newTask.save();

        return res.status(200).json({ status: "OK", data: newTask});

    }
    catch (error) {
        res.status(400).json({ status: "fail", error });

    }
};
taskController.getTasks = async(req, res) => {
    try{
        const tasks = await Task.find();
        return res.status(200).json({ status : "OK", data: tasks});
    }
    catch (error){
        res.status(400).json({ status: "fail", error });
    }
};
taskController.putTasks = async(req, res) => {
    const { id } = req.params;
    const { name, complete } = req.body;
    try{
        const updatedTasks = await Task.findByIdAndUpdate(
            id,
            { name, complete, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        if (!updatedTasks) {
            return res.status(404).send('Task not found');
        };
        // res.send(updatedTasks);
        return res.status(200).json({ status : "OK", data: updatedTasks});
    }
    catch (error){
        res.status(400).json({ status: "fail", error });
    }
}
taskController.deleteTasks = async(req, res) => {
    const { id } = req.params;
    try{
        const deletedTasks = await Task.findByIdAndDelete(id);
        if(!deletedTasks){
            return res.status(404).send('Task not found');
        };
        return res.status(200).json({ status : "OK", data: "Deleted : "+ deletedTasks});

    }
    catch (error) {

    }

};

module.exports = taskController;




// const Task = require("../models/Task");

// const taskController = {};

// taskController.createTask = async(req, res) => {
//     try{
//         const { name, complete } = req.body;
//         const newTask = new Task({ name, complete });
//         await newTask.save();

//         return res.status(200).json({ status: "OK", data: newTask});

//     }
//     catch (error) {
//         res.status(400).json({ status: "fail", error });

//     }
// };
// taskController.getTasks = async(req, res) => {
//     try{
//         const tasks = await Task.find();
//         return res.status(200).json({ status : "OK", data: tasks});
//     }
//     catch (error){
//         res.status(400).json({ status: "fail", error });
//     }
// };
// taskController.putTasks = async(req, res) => {
//     const { id } = req.params;
//     const { name, complete } = req.body;
//     try{
//         const updatedTasks = await Task.findByIdAndUpdate(
//             id,
//             { name, complete, updatedAt: Date.now() },
//             { new: true, runValidators: true }
//         );
//         if (!updatedTasks) {
//             return res.status(404).send('Task not found');
//         };
//         // res.send(updatedTasks);
//         return res.status(200).json({ status : "OK", data: updatedTasks});
//     }
//     catch (error){
//         res.status(400).json({ status: "fail", error });
//     }
// }
// taskController.deleteTasks = async(req, res) => {
//     const { id } = req.params;
//     try{
//         const deletedTasks = await Task.findByIdAndDelete(id);
//         if(!deletedTasks){
//             return res.status(404).send('Task not found');
//         };
//         return res.status(200).json({ status : "OK", data: "Deleted : "+ deletedTasks});

//     }
//     catch (error) {

//     }

// };

// module.exports = taskController;