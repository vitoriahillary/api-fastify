import { FastifyInstance } from "fastify";
import { createUserController, deleteUserController, editUserController, getAllUsersController, getUserByIdController } from "./controller/user";
import { createCourseController, deleteCourseController, editCourseController, getAllCoursesController, getCourseByIdController } from "./controller/course";
import { createStaffController, deleteStaffController, editStaffController, getAllStaffsController, getStaffByIdController } from "./controller/staff";
import { createModuleController, editModuleController, getModuleByIdController } from "./controller/module";

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/user', createUserController)
    app.get('/user/:id', getUserByIdController)
    app.get('/users', getAllUsersController)
    app.put('/user/:id', editUserController)
    app.delete('/user/:id', deleteUserController)
    
    app.post('/course', createCourseController)
    app.get('/course/:id', getCourseByIdController)
    app.get('/courses', getAllCoursesController)
    app.put('/course/:id', editCourseController)
    app.delete('/course/:id', deleteCourseController)

    app.post('/staff', createStaffController)
    app.get('/staff/:id', getStaffByIdController)
    app.get('/staffs', getAllStaffsController)
    app.put('/staff/:id', editStaffController)
    app.delete('/staff/:id', deleteStaffController)

    app.post('/module/:id_course', createModuleController)
    app.get('/module/:id', getModuleByIdController)
    app.put('/module/:id', editModuleController)

}