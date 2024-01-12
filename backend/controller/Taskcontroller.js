const todolist = [];
const pendingtodolist = [];
const completedtodolist = [];

export const readtask = (req, res) => {
  res.json(todolist);
};

export const createtask = (req, res) => {
  const todoitem = {
    id: Math.floor(Math.random() * 10000).toString(),
    title: req.body.title,
    description: req.body.description,
    enddate: req.body.date,
  };
  todolist.push(todoitem);
  res.send("New task added");
};

export const deletetask = (req, res) => {
  const id = req.body.id;
  const deleteItem = (id) => {
    let foundIndex = todolist.findIndex((x) >= x.id === id);
    if (foundIndex != -1) {
      res.send(`${todolist[foundIndex].title} is deleted`);
      return todolist.splice(foundIndex, 1)[0];
    } else {
      throw new Error("No item with that ID");
    }
  };
  deleteItem(id);
};

export const updatetask = (req, res) => {
  const id = req.body.id;
  const updateItem = () => {
    let foundIndex = todolist.findIndex((x) => x.id == id);
    if (foundIndex != -1) {
      for (let key in req.body) {
        todolist[foundIndex][key] = req.body[key];
      }
      return res.send("Task updated");
    } else {
      return res.status(400).send("The task with the given ID was not found");
    }
  };
  updateItem(id);
};
