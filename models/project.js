
const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },

    categoria:{
        type: String,
        required: true
    },

    description: {
        type: String,
        required:true
    }
},{timestamps:true});

const Proyecto = mongoose.model('proyecto', projectSchema)
module.exports = Proyecto 