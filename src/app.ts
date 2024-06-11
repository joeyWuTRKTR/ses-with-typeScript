import express from 'express';
import { Response } from "request";
import bodyParser from "body-parser";
import { SendEmailError, SendEmailData } from "node-ses";
import { ATTACHMENT_CONTENT_TYPE, getMailContent } from './domain/emailService';
import { initSesClient } from './domain/ses';
import { transformRawDataToExcelBuffer } from './utils/transfer';

const app = express();
const port = 3000;

const client = initSesClient();

app.use(bodyParser.urlencoded({ extended: true, limit: '300mb' }));
app.use(bodyParser.json({ limit: '300mb' }));

function sendRawEmailCallback(err: SendEmailError, data: SendEmailData, res: Response) {
    if (err) {
        console.error(`sendRawEmail error: `, err);
    }
    else {
        console.log(`sendRawEmail data: `, data);
    }
}

app.post('/sendEmail', async (req, res) => {
    const {emailSender, emailRecipient, subject, body, data } = req.body;
    console.log(`sendEmail request: ${JSON.stringify(req.body)}`);


    const excelBuffer = await transformRawDataToExcelBuffer(data);
    const mailContent = await getMailContent(emailSender, emailRecipient, subject, body, ATTACHMENT_CONTENT_TYPE.XLSX, excelBuffer);

    const senderAndRawMessage = {
        from: emailSender,
        rawMessage: mailContent.toString(),
    }

    client.sendRawEmail(senderAndRawMessage, sendRawEmailCallback);
    res.send('Email sent!');
});

app.listen(port, () => {
    console.log(`server is listening on ${port} !!!`);
});
