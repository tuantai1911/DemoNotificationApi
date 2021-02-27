import express from 'express';

import { sendSinglelDevice, sendToGroup,sendMultilDevice } from '../controllers/notification.js';

const router = express.Router();
 

router.post('/sendSinglelDevice', sendSinglelDevice);

router.post('/sendToGroup', sendToGroup);

router.post('/sendMultiDevice', sendMultilDevice);

export default router;