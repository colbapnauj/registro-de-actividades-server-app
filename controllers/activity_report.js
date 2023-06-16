import Activity from "../models/Activity.js";

const getTotalHoras = async (req, res) => {
  // Realizar la consulta de agregación
  try {
    const result = await Activity.aggregate([
      {
        $match: { tipo: "trabajo" }, // Filtrar solo los registros de trabajo
      },
      {
        $group: {
          _id: "$fecha", // Agrupar por fecha
          horas_trabajadas: {
            $sum: {
              $divide: [
                {
                  $subtract: [
                    // Restar hora_fin - hora_inicio
                    { $toDate: "$hora_fin" },
                    { $toDate: "$hora_inicio" },
                  ],
                },
                1000 * 60 * 60, // Convertir de milisegundos a horas
              ],
            },
          },
        },
      },
    ]);

    // Aquí puedes utilizar los resultados para mostrar la tabla de horas trabajadas por día
    res.json(result);
  } catch (error) {
    console.error("Error al realizar la consulta de agregación:", error);
    res.status(500).json("Server Error");
  }
};

const getHorasPorTipo = async (req, res) => {
  try {
    const result = await Activity.aggregate([
      {
        $match: {
          $or: [
            { tipo: "trabajo" }, // Filtrar registros de trabajo
            { tipo: "libre" }, // Filtrar registros de tiempo libre
          ],
        },
      },
      {
        $group: {
          _id: {
            fecha: "$fecha",
            mes: { $substr: ["$fecha", 0, 7] }, // Extraer el mes de la fecha
          },
          horas_trabajadas: {
            $sum: {
              $cond: [
                { $eq: ["$tipo", "trabajo"] }, // Sumar solo los registros de trabajo
                {
                  $divide: [
                    {
                      $subtract: [
                        { $toDate: "$hora_fin" },
                        { $toDate: "$hora_inicio" },
                      ],
                    },
                    1000 * 60 * 60, // Convertir de milisegundos a horas
                  ],
                },
                0, // Si no es un registro de trabajo, sumar cero
              ],
            },
          },
          horas_libres: {
            $sum: {
              $cond: [
                { $eq: ["$tipo", "libre"] }, // Sumar solo los registros de tiempo libre
                {
                  $divide: [
                    {
                      $subtract: [
                        { $toDate: "$hora_fin" },
                        { $toDate: "$hora_inicio" },
                      ],
                    },
                    1000 * 60 * 60, // Convertir de milisegundos a horas
                  ],
                },
                0, // Si no es un registro de tiempo libre, sumar cero
              ],
            },
          },
          horas_totales: {
            $sum: {
              $divide: [
                {
                  $subtract: [
                    { $toDate: "$hora_fin" },
                    { $toDate: "$hora_inicio" },
                  ],
                },
                1000 * 60 * 60, // Convertir de milisegundos a horas
              ],
            },
          },
        },
      },
      {
        $sort: { "_id.fecha": 1 }, // Ordenar por fecha ascendente
      },
    ]);

    // Aquí puedes utilizar los resultados para mostrar la tabla con las horas trabajadas, horas libres y horas totales por fecha y mes
    // sort: { "_id.fecha": 1 } ordena por fecha ascendente
    // sort: { "_id.mes": 1 } ordena por mes ascendente

    return res.json(result);
  } catch (error) {
    console.error("Error al realizar la consulta de agregación:", error);
  }
};

// Ruta para obtener la tabla de horas trabajadas y libres por día
const getTable = async (req, res) => {
  try {
    const activities = await Activity.aggregate([
      {
        $group: {
          _id: {
            fecha: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$fecha",
              },
            },
          },
          horas_trabajadas: {
            $sum: {
              $cond: [
                { $eq: ["$tipo", "trabajo"] },
                {
                  $divide: [
                    {
                      $subtract: [
                        { $toDate: "$hora_fin" },
                        { $toDate: "$hora_inicio" },
                      ],
                    },
                    1000 * 60 * 60,
                  ],
                },
                0,
              ],
            },
          },
          horas_libres: {
            $sum: {
              $cond: [
                { $eq: ["$tipo", "libre"] },
                {
                  $divide: [
                    {
                      $subtract: [
                        { $toDate: "$hora_fin" },
                        { $toDate: "$hora_inicio" },
                      ],
                    },
                    1000 * 60 * 60,
                  ],
                },
                0,
              ],
            },
          },
        },
      },
      {
        $sort: { "_id.fecha": 1 },
      },
    ]);

    const tabla = activities.map((registro) => {
      const total_horas_trabajadas =
        registro.horas_trabajadas - registro.horas_libres;
      return {
        fecha: registro._id.fecha,
        horas_trabajadas: registro.horas_trabajadas,
        horas_libres: registro.horas_libres,
        total_horas_trabajadas,
      };
    });

    res.json(tabla);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener la tabla de horas trabajadas" });
  }
};

const getTableWithTotal = async (req, res) => {
  // Ruta para obtener la tabla de horas trabajadas y libres por día

  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    const activities = await Activity.aggregate([
      {
        $match: {
          fecha: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: {
            fecha: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$fecha",
              },
            },
          },
          horas_trabajadas: {
            $sum: {
              $cond: [
                { $eq: ["$tipo", "trabajo"] },
                {
                  $divide: [
                    {
                      $subtract: [
                        { $toDate: "$hora_fin" },
                        { $toDate: "$hora_inicio" },
                      ],
                    },
                    1000 * 60 * 60,
                  ],
                },
                0,
              ],
            },
          },
          horas_libres: {
            $sum: {
              $cond: [
                { $eq: ["$tipo", "libre"] },
                {
                  $divide: [
                    {
                      $subtract: [
                        { $toDate: "$hora_fin" },
                        { $toDate: "$hora_inicio" },
                      ],
                    },
                    1000 * 60 * 60,
                  ],
                },
                0,
              ],
            },
          },
        },
      },
      {
        $sort: { "_id.fecha": 1 },
      },
    ]);

    const tabla = [];
    let totalHorasTrabajadasMes = 0;
    let totalHorasLibresMes = 0;
    activities.forEach((activity) => {
      const fecha = activity._id.fecha;
      const total_horas_trabajadas =
        activity.horas_trabajadas - activity.horas_libres;
      tabla.push({
        fecha,
        horas_trabajadas: activity.horas_trabajadas,
        horas_libres: activity.horas_libres,
        total_horas_trabajadas,
      });
      totalHorasTrabajadasMes += activity.horas_trabajadas;
      totalHorasLibresMes += activity.horas_libres;
    });

    const totalMes = {
      horas_trabajadas: totalHorasTrabajadasMes,
      horas_libres: totalHorasLibresMes,
      total_horas_trabajadas: totalHorasTrabajadasMes - totalHorasLibresMes,
    };

    res.json({ tabla, totalMes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener la tabla de horas trabajadas" });
  }
};

export { getTotalHoras, getHorasPorTipo, getTable, getTableWithTotal };
