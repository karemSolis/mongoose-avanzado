//CREANDO EL ESQUEMA O ESTRUCTUR DE LOS DATOS QUE SE GUARDARÁN EN ATLAS
import mongoose from "mongoose";

const orderCollection = "orders" //la colección para atlas 

//el schema
const orderSchema = mongoose.Schema({
    name:String,
    size:{
        type:String,
        enum:["small", "medium", "large"], //propiedad enum para enumerar 
        default: "medium"//por defecto voy a tener el tamaño medium
    },
    price: Number, //voy a tener precio
    quantity: Number, //voy a tener cantidad de producto que se vende 
    date: Date //y tb debo tener una fecha de tipo Date 
})

//se crea la constante para exportar orderModel
const orderModel = mongoose.model(orderCollection, orderSchema) 

export default orderModel
