import mongoose from "mongoose";

const studentsCollection = "students" //colección 
const studentsSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    gerder: String,
    /*en courses agregamos population para relacionar  */
    courses: {
        type:[
            {
                course:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"courses"
                }
            }
        ],
        default:[]
    }
})

//ESTE MIDDLEWARE PRE ES OTRA FORMA DE USAR POPULATE PERO EN VEZ DE HACERLO EN INDEX.JS SE REALIZA DENTRO DEL MISMO SCHEMA Y SE DEBE LLAMAR POR INDEX.JS
/*studentsSchema.pre('find', function(){
    this.populate('courses.course');
})
*/

const studentModel = mongoose.model(studentsCollection, studentsSchema)

export default studentModel