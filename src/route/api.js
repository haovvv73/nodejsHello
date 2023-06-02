import express from 'express'
import { createNewUser, deleteUser, getAllUser, updateUser } from '../controller/APIController';

const router = express.Router();

const initApiRoute = (app) => {

    router.get('/users', getAllUser) // METHOD : GET => read

    router.post('/create-user', createNewUser) // METHOD : POST => create

    router.put('/update-user', updateUser) // METHOD : PUT => update

    router.delete('/delete-user/:id', deleteUser) // METHOD : DELETE => delete

    return app.use('/api/v1/', router);
}

export default initApiRoute