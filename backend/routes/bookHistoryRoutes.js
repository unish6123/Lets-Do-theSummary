import express from 'express';
import {getHistory, addHistory} from '../controller/historyController.js';
import userAuth from '../middleware/userAuth.js';

const bookHistoryRouter = express.Router();

bookHistoryRouter.get('/getHistory',userAuth, getHistory);
bookHistoryRouter.post('/addHistory',userAuth, addHistory);
export default bookHistoryRouter;