//este es el schema que se arma luedo de levantar el servidor en este caso en index.js puerto 8080
import mongoose from "mongoose";

const userCollection = "users" //acá el nombre de la colección, debe ser igual al de mongoose 

/*el indice se hace dentro del schema en principio el schema se ve así:
const userSchema = mongoose.Schema({ //acá el esquema, como va ordenado nuestra información en formato json
    first_name: String, 
    last_name: String,
    email: String,
    gender: String
}) pero se modificará para agregar el índice*/

const userSchema = mongoose.Schema({ //acá el esquema, como va ordenado nuestra información en formato json
    first_name: {type:String, index:true}, //schema con index
    last_name: {type:String},
    email: {type:String},
    gender:{type:String},
})

const userModel = mongoose.model(userCollection, userSchema);

export default userModel