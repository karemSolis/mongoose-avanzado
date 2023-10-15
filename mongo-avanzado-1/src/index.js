//en esta clase vamos a armar un schema de users para mongoose, para conectar a la base de datos.
import express from "express"

//luego de armar el schema será necesario importarlo (userModel) y también mongoose.
import userModel from "./models/users.js"
import mongoose from "mongoose"
import studentModel from "./models/students.js"
import courseModel from "./models/courses.js"

const app = express()

const PORT = 8080

//ENVIROMENT EJERCICIO 1, USERSMODEL, 5000 USUARIOS, TIEMPO DE RESPUESTA Y EL INDICE (INDEX)
/*se comenta todo el código para dejar el ejemplo completo para que no se pierda al modificarlo, de realizará un nuevo enviroment para realizar el sgte ejercico*/
//const enviroment = async()=> {
    //await mongoose.connect('mongodb+srv://proyectointegrador:q9sHiS6YE5R6NJ0Q@coderhouse.y9dsp4s.mongodb.net/?retryWrites=true&w=majority')

   //let response = await userModel.find().explain("executionStats") 

    /*con esta línia me muestra por consola todo el contenido que tengo en users en mongoosedb atlas, pero teniendo 
    index en find puedo buscar por el parámetro que le indique por ejemplo:*/

    //let response = await userModel.find({fist_name: "orly"}).explain("executionStats")
    //console.log(response)
//}
/*cabe mencionar que por la terminal muestra el tiempo que se demora en el tiempo de ejecución de búsqueda de 5000 usuarios(executionTimeMillisEstimate: 2,), 
se debe tener en cuenta que ahora no se demoró tanto porque solo son 5000 users y no se está filtrando algo en específico, pero si fueran 100.000 users y dependiendo 
que se esté filtrando el tiempo de respuesta puede ser muy largo, además el tiempo de respuesta aumenta de acuerdo a la cantidad de registro que tenga y no de acuerdo
a la cantidad de documentos que tenga, para mejorar el tiempo de respues a es que se usa índice y se realiza en los modelos, en este caso en el archivo users.js 
donde existe userModel */
//enviroment()

/*------------SEGUNDO EJERCICIO DE LA CLASE POPULATION------------*/
//se agregan dos modelos más: students.js y courses.js

const enviroment = async () => {
    await mongoose.connect('mongodb+srv://proyectointegrador:q9sHiS6YE5R6NJ0Q@coderhouse.y9dsp4s.mongodb.net/?retryWrites=true&w=majority')

    //STUDENTS.JS
    /* await studentModel.create({
        first_name: "Miguel",
        last_name: "Perez",
        email:"miguel_p@poputation.com",
        gender: "male"
    })*/
/*al ejecutarse studentModel se agrega a miguel a la base de datos con todos los campos que se escribieron acá, pero además se le agrega la referencia courses (ref:"courses")
que hicimos en students.js al mongoose db atlas con el array vacío que el profe le puso*/

    //COURSES.JS
    /*await courseModel.create({
        title: "Curso de backend",
        description: "Backend de ecommerce",
        topics:["Express", "MongoDB", "Mongoose", "WebSocket"]
    })*/
/*al ejecutarse courses se agrega el curso de backend con todos los datos escritos acá a la base de datos y el array de topics*/

    //VOLVEMOS A STUDENTS PARA HACER LA RELACIÓN PARTE 1

    /*let student = await studentModel.findOne({_id:"652b2255f939e7c39d68824f"}) //id de estudiante en este caso miguel //es findOne
    console.log(student)
    student.courses.push({course: "652b335aab9bb83766c9d4aa"})//id de courses en este caso de back

    let result = await studentModel.updateOne({_id:"652b2255f939e7c39d68824f"}, student) //id de estudiante miguel //updateOne es para actualizar
    console.log(result)*/

    /*aL ejecutar let student y let result en mongoose atlas, en la colección student donde está miguel, se agregaron dentro el array en courses que al inicio estaba vacío
    el course un objetId de course que era del modelo de course y un objetId nuevo. */

    //SEGUIMOS EN EL PROCESO DE LA RELACIÓN PARTE 2 USANDO POPULATE

    let student = await studentModel.findOne({ _id:"652b2255f939e7c39d68824f" }).populate('courses.course')
    console.log(student)

    /*al ejecutar let student en este proceso de relación parte dos con populate me devuelve el id nuevo que mencioné anteriormente */
}
enviroment()


//MIDDLEWARE PRE / otra forma de usar populate es usando un middleware pre en el schema students y llamarlo desde acá de la sgte manera 
/*
---se realiza la misma operación find pero sin el populate 

const enviroment = async () => {
    await mongoose.connect('mongodb+srv://proyectointegrador:q9sHiS6YE5R6NJ0Q@coderhouse.y9dsp4s.mongodb.net/?retryWrites=true&w=majority')
    let student = await studentModel.findOne({ _id:"652b2255f939e7c39d68824f" })
    console.log(JSON.stringify(student, null,'\t'))
}
enviroment()
 */



app.listen(PORT, () => {
    console.log(`servidor conectado al puerto ${PORT}`)
})

