import Activity from "../models/Activity.js";

const index = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Activity.findOne({ _id: id });
    if (response) {
      res.send(response);
    } else {
      res.status(404).json("No Activity found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

const create = async (req, res) => {
  const { tipo, fecha, descripcion, hora_inicio, hora_fin } = req.body;

  try {
    const activity = new Activity({
      tipo,
      fecha,
      descripcion,
      hora_inicio,
      hora_fin,
    });

    await activity.save();
    res.status(201);
    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

const update = async (req, res) => {
  const { tipo, fecha, descripcion, hora_inicio, hora_fin } = req.body;
  const { id } = req.params;

  try {
    const activity = await Activity.findOne({ _id: id });
    if (activity) {
      activity.tipo = tipo;
      activity.fecha = fecha;
      activity.descripcion = descripcion;
      activity.hora_inicio = hora_inicio;
      activity.hora_fin = hora_fin;
      await activity.save();
      res.json(activity);
    } else {
      res.status(400);
      res.json({
        message: "No Activity found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.deleteOne({ _id: id });
    res.json({
      activity,
      message: "Activity deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error");
  }
};

export { index, show, create, update, deleteActivity };
