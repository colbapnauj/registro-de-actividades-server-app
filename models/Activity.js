import mongoose from 'mongoose'

// Definir el esquema del documento
const ActivitySchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  },
  // date string with format yyyy-mm-dd
  fecha: {
    type: Date,
    required: true
  },
  hora_inicio: {
    type: Date,
    required: true
  },
  hora_fin: {
    type: Date,
    required: true
  },
  descripcion: {
    type: String,
    required: false,
    default: ''
  }
})

// Crear el modelo basado en el esquema
export default mongoose.model('Activity', ActivitySchema)
