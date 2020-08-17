import express from 'express';
import Classescontroller from './controllers/ClassesController';
import Connectionscontroller from './controllers/ConnectionsControllers';
const routes=express.Router();
const classesControllers =new Classescontroller();
const connectionsControllers= new Connectionscontroller;

routes.post('/classes',classesControllers.create);
routes.get('/classes',classesControllers.index);
routes.post('/connections',connectionsControllers.create);
routes.get('/connections',connectionsControllers.index);
 export default routes;