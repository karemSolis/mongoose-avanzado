import mongoose from "mongoose";

const coursesCollection = "courses"

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    topics:{
        type: Array,
        default:[]
        },
        professor: String
})

const courseModel = mongoose.model(coursesCollection, courseSchema)

export default courseModel



