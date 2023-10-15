//EJEMPLO EN VIVO: SE DESEA GESTIONAR UNA BASE DE DATOS PARA UNA PIZZERÍA. DADO UN CONJUNTO DE ORDENES: 
//DEFINIR LAS VENTAS TOTALES DE LOS DIFERENTES SABORES PARA LAS PIZZAS MEDIANAS 
//1RA PETICIÓN: DEFINIR LAS VENTAS DE LOS DIFERENTES SABORES DE LAS PIZZAS MEDIANAS:
//1 HACER UN STAGE PARA FILTRAR LAS PIZZAS POR SU TAMAÑO
//2 AGRUPAR LAS PIZZAS POR SABOR Y CORROBORAR CUANTAS SE VENDIERON DE CADA SABOR 
/*---------------------------------------------------------------------- */
//ÚLTIMA ACTIVIDAD PAGINATION

import mongoose from "mongoose";
import orderModel from "./models/order.js"; //corresponde a order que ahora está comentado.
import usersModel from "./models/users.js";

const environment = async()=>{
    await mongoose.connect("mongodb+srv://proyectointegrador:q9sHiS6YE5R6NJ0Q@coderhouse.y9dsp4s.mongodb.net/?retryWrites=true&w=majority")
    console.log("Atlas conectado")

    //LUEGO DE HACER LOS SCHEMAS EN ORDER.JS NECESITO PONER ACÁ SON LOS DOCUMENTOS QUE A TRAVÉS DE ESTAS LINEAS INSERTARÉ EN MI BASE DE DATOS, OSEA LOS PRODUCTOS CON LOS QUE VOY A TRABAJAR
    /*
    let result = await orderModel.insertMany(//recordar que el inserMany es un array de objetos
        [
            {name: "Pizza A", size: "medium", price: 2000 , quantity: 5 ,  date:"2023-03-09" },
            {name: "Pizza B", size: "large",  price: 1800, quantity: 10 ,  date:"2023-03-08" },
            {name: "Pizza C", size: "large",  price: 1800, quantity: 20 ,  date:"2023-02-08" },
            {name: "Pizza D", size: "small",  price: 1000, quantity: 100 , date:"2023-02-09" },
            {name: "Pizza E", size: "small",  price: 1000, quantity: 100 , date:"2023-01-11" },
            {name: "Pizza F", size: "medium",  price:2000, quantity: 20 ,  date:"2023-02-12" },
            {name: "Pizza G", size: "medium",  price: 2000, quantity: 25 , date:"2023-03-09" },
            {name: "Pizza H", size: "medium",  price: 2000, quantity: 10 , date:"2023-04-10" },
        ]
    ) 
    console.log(result) //este console.log me muestra los elementos por la terminal 
    */

    /*
    
    */

    // let orders = await orderModel.aggregate([
    //     {
    //         $match: {size:"medium"} //necesito traerme todas las pizzas que tengan tamaño medium para eso se usa $match, filtro por tamaño
    //     },{
    //         $group: { _id:"$name", totalQuantity: { $sum:"$quantity" }} /*el stage dos group es para agrupar las cantidades 
    //         vendias, necesito el id con el nombre y las cantidades vendidas en ese grupo y el stage $sum sumará a este grupo todas las cantidades*/
    //     },{ //NOS PIDEN AHORA NUEVOS REQUERIMIENTOS QUE AGREGAMOS DESDE ACÁ CON LOS SIGUIENTES STAGE:
    //         $sort: { totalQuantity: -1 } //ordenarpa de manera descendente 
    //     },{
    //         $group:{ _id: 1,  orders: { $push:"$$ROOT" } } /*agrupamos nuevamente en este caso para crear una nueva colección y después pushearla
    //         EL ROOT es la raíz de la colección sin importar donde estemos parados*/
    //     },{
    //         $project: { //crea un documento nuevo a partir del arreglo de resultados de nuestra aggregation y le asigna un nuevo _id
    //                 "_id": 0,
    //                 orders: "$orders" //ordenamos 
    //             }
    //     },{
    //         $merge: {
    //             into:"reports" //creamos nueva colección
    //         }
    //     }
    // ])

    // console.log(orders) //este resultado lo veré por consola

    //PAGINATION: SE CREA EL MODELO USERS.JS EN LA CARPETA MODELS Y SE EMPIEZA A TRABAJAR DESDE ACÁ 
    let users = await usersModel.paginate({gender:"Female"},{limit:20, page:1}) //filtra por genero femenino y limita los resultados a 20 y le pone la pagina 1, NO OLVIDAR EL AWAIT
    console.log(users) //mostrará la respuesta por consola 

    //RESUMEN QUE ME MUESTRA LA TERMINAL LUEGO DE ENTREGAR EL RESULTADO DE USERS QUE SE PIDE CON EL CONSOLE.LOG
    /*
        totalDocs: 2221, : ESTE ES EL TOTAL DE LOS DOCUMENTOS QUE TIENEN GÉNERO FEMENINO
        limit: 20, : ES LA CANTIDAD DE DOCUMENTO QUE ME VA A MOSTRAR EN LA TERMINAL O CONSOLA, ESTO ES ALGO QUE PUSIMOS DE PARÁMETRO ({limit:20, page:1})
        totalPages: 112, : LOS PUEDO DIVIDIR EN 112 PÁGINAS
        page: 1, : ESTOY VIENDO SOLO LA PÁGINA 1 
        pagingCounter: 1,: SI ES CON CONTADOR
        hasPrevPage: false, :ESTE ES SI HAY PÁGINA ANTERIOR Y ME MUESTRA CON FALSE QUE NO HAY (EN UNA TABLA POR LO GENERAL SE USA < > PARA MOVER DE PÁG EN PÁG, ESO QUE SE MUESTRA EN EL FRONT EN REALIDAD VIENE DESDE EL BACK)
        hasNextPage: true, :ESTE MUESTRA SI HAY SIGUIENTES PÁGINAS Y CON EL TRUE ME MUESTRA QUE SI LAS HAY 
        prevPage: null,
        nextPage: 2
    */
    
}

environment ()