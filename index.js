import express from 'express';

import admin from 'firebase-admin';
import fs from 'fs';
import usersRoutes from './routes/notification.js';

const app = express();
const PORT = 5000;

// setup firebase for node js
function init() {
    const data = fs.readFileSync('./key/demonotification-d673f-firebase-adminsdk-y2ibg-8a314fabe5.json');
    const serviceAccount = JSON.parse(data);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

app.use(express.json());

app.use('/notification', usersRoutes);
app.get('/', (req, res) => res.send('Welcome to the Push Notification API!'));
app.all('*', (req, res) => res.send("You've tried reaching a route that doesn't exist."));
app.get('/', (req, res) => res.send('Welcome to the Users API!'));

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
    init();
});
