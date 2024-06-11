require('dotenv').config();
import ses from "node-ses";

export const initSesClient = () => {
    return ses.createClient({
        key: process.env.AWS_ACCESS_KEY || '', // IAM user access key for AWS SES
        secret: process.env.AWS_SECRET_KEY || '', // IAM user secret key for AWS SES
        amazon: process.env.AWS_ENDPOINT_URI || 'https://email.us-east-1.amazonaws.com', // AWS SES endpoint
    });
}
