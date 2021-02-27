import admin from 'firebase-admin';
import { GetDeviceToken, GetDeviceTokenOfGroup, GetDeviceTokenByLstParent } from '../service/parentService.js';



export const sendToGroup = (req, res) => {
    let notiData = req.body;

    let lstToken = GetDeviceTokenOfGroup(notiData.receiverInfo.idGroup)

    if (lstToken !== null && lstToken.length != 0) {
        // console.log(lstToken.length)

        const registrationTokens = lstToken

        const message = {
            notification: {
                title: notiData.NotiMes.title,
                body: notiData.NotiMes.body
            },
            tokens: registrationTokens,
        }
        admin.messaging().sendMulticast(message)
            .then((response) => {
                if (response.failureCount > 0) {
                    const failedTokens = [];
                    response.responses.forEach((resp, idx) => {
                        if (!resp.success) {
                            failedTokens.push(registrationTokens[idx]);
                        }
                    });
                    console.log('List of tokens that caused failures: ' + failedTokens);
                    res.status(400).send('can\'t send notification for some device ')
                }
                else {
                    console.log('Successfully sent message:', response);
                    res.status(200).send('Notification sent successfully')
                }
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                res.status(400).send(error)

            });
    }
    else {
        res.status(400).send('can\'t send notification to group ')
    }

};



export const sendSinglelDevice = (req, res) => {
    let notiData = req.body;

    var deviceToken = GetDeviceToken(notiData.receiverInfo.idParent)

    var registrationToken = deviceToken;

    var message = {
        notification: {
            title: notiData.NotiMes.title,
            body: notiData.NotiMes.body
        },
        token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            res.status(200).send('Notification sent successfully')
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            res.status(400).send(error)

        });

};

export const sendMultilDevice = (req, res) => {
   
    let notiData = req.body;

    let lstToken = GetDeviceTokenByLstParent(notiData.receiverInfo.idParents)

    if (lstToken !== null && lstToken.length != 0) {
        console.log(lstToken.length)

        const registrationTokens = lstToken

        const message = {
            notification: {
                title: notiData.NotiMes.title,
                body: notiData.NotiMes.body
            },
            tokens: registrationTokens,
        }
        admin.messaging().sendMulticast(message)
            .then((response) => {
                if (response.failureCount > 0) {
                    const failedTokens = [];
                    response.responses.forEach((resp, idx) => {
                        if (!resp.success) {
                            failedTokens.push(registrationTokens[idx]);
                        }
                    });
                    console.log('List of tokens that caused failures: ' + failedTokens);
                    res.status(400).send('can\'t send notification for some device ')
                }
                else {
                    console.log('Successfully sent message:', response);
                    res.status(200).send('Notification sent successfully')
                }
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                res.status(400).send(error)

            });
    }
    else {
        res.status(400).send('can\'t send notification to group ')
    }

};