import zod from "zod";

const taskSchema = zod.object({
  title: zod.string(),
  description: zod.string().optional(),
  enddate: zod.date().optional(),
});

export default (req, res, next) => {
  const { title, description, enddate } = req.body;

  const taskData = { title, description, enddate: new Date(enddate) };

  try {
    taskSchema.safeParse(taskData);
    next();
  } catch (error) {
    res.status(400).json({ msg: "Input is invalid", error });
  }
};

function updateTaskValidation(req, res, next) {
  const key = req.body;
  try {
    taskSchema.safeParse(key);
    next();
  } catch (error) {
    res.status(400).json({ msg: "Input is invalid", error });
  }
}

export { updateTaskValidation };
