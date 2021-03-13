import admin from 'firebase-admin';
import { GetDeviceToken, GetDeviceTokenOfGroup, GetDeviceTokenByParentIds } from '../service/parentService.js';

export const sendToGroup = (req, res) => {
    const notificationData = req.body;

    const tokens = GetDeviceTokenOfGroup(notificationData.receiverInformation.groupId);

    if (tokens !== null && tokens.length !== 0) {
        const message = {
            notification: {
                title: notificationData.NotificationMessenge.title,
                body: notificationData.NotificationMessenge.body,
            },
            tokens,
        };
        admin.messaging().sendMulticast(message)
            .then((response) => {
                if (response.failureCount > 0) {
                    const failedTokens = [];
                    response.responses.forEach((resp, idx) => {
                        if (!resp.success) {
                            failedTokens.push(tokens[idx]);
                        }
                    });
                    console.log(`List of tokens that caused failures: ${failedTokens}`);
                    res.status(400).send('can\'t send notification for some device ');
                } else {
                    console.log('Successfully sent message:', response);
                    res.status(200).send('Notification sent successfully');
                }
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                res.status(400).send(error);
            });
    } else {
        res.status(400).send('can\'t send notification to group ');
    }
};

export const sendSingleDevice = (req, res) => {
    const notificationData = req.body;

    const deviceToken = GetDeviceToken(notificationData.receiverInformation.parentId);

    const message = {
        notification: {
            title: notificationData.NotificationMessenge.title,
            body: notificationData.NotificationMessenge.body,
        },
        token: deviceToken,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            res.status(200).send('Notification sent successfully');
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            res.status(400).send(error);
        });
};

export const sendMultiDevice = (req, res) => {
    const notificationData = req.body;

    const tokens = GetDeviceTokenByParentIds(notificationData.receiverInformation.parentIds);

    if (tokens !== null && tokens.length !== 0) {
        console.log(tokens.length);

        const message = {
            notification: {
                title: notificationData.NotificationMessenge.title,
                body: notificationData.NotificationMessenge.body,
            },
            tokens,
        };
        admin.messaging().sendMulticast(message)
            .then((response) => {
                if (response.failureCount > 0) {
                    const failedTokens = [];
                    response.responses.forEach((resp, idx) => {
                        if (!resp.success) {
                            failedTokens.push(tokens[idx]);
                        }
                    });
                    console.log(`List of tokens that caused failures: ${failedTokens}`);
                    res.status(400).send('can\'t send notification for some device ');
                } else {
                    console.log('Successfully sent message:', response);
                    res.status(200).send('Notification sent successfully');
                }
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                res.status(400).send(error);
            });
    } else {
        res.status(400).send('can\'t send notification to group ');
    }
};
