import express from 'express';

import { sendSingleDevice, sendToGroup, sendMultiDevice } from '../controllers/notification.js';

const router = express.Router();

router.post('/sendSingleDevice', sendSingleDevice);

router.post('/sendToGroup', sendToGroup);

router.post('/sendMultiDevice', sendMultiDevice);

export default router;
