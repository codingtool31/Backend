
const TaskModel = require("../models/taskModels");

module.exports.getTask = async (req, res) => {
    const tasks = await TaskModel.find();
    res.send(tasks);
}

module.exports.saveTask = async (req, res) => {
    const { task } = req.body;
    TaskModel.create({ task })
        .then((data) => {
            console.log("Saved Sucessfully");
            res.status(201).send(data);
        }).catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong!" });
        })
}

module.exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { task } = req.body
    TaskModel.findByIdAndUpdate(id, { task })
        .then(() => res.send("Updated Successfully"))
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong!" })
        })
}

module.exports.deleteTask = async (req, res) => {
    const { id } = req.params

    TaskModel.findByIdAndDelete(id)
        .then(() => res.send("Deleted Successfully"))
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Something went wrong!" })
        })
}
