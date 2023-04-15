import { Router, Request, Response } from 'express';
import { fetchPageController } from '../controller/scrappy.controller';

const scrappyRouter = Router();

scrappyRouter.get('/', fetchPageController);

export default scrappyRouter

