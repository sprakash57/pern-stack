import AWS from 'aws-sdk';
import validateOrigins from './libs/validate-origin';
const S3 = new AWS.S3();

export const main = async (event, context) => {
    const origin = event.headers.Origin || event.headers.origin;
    if (!validateOrigins(origin)) return;
    try {
        const data = await S3.getSignedUrl('getObject', { Bucket: process.env.Bucket, Key: process.env.Key, Expires: 60 });
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": origin
            },
            //Content-Disposition: attachment; filename="resume.pdf" if you want to download it forcefully
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: error.statusCode || 400,
            body: error.message || JSON.stringify(error.message)
        };
    }
};
