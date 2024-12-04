const AWS = require('aws-sdk');
const uuid = require('uuid');
const s3 = new AWS.S3();

const bucketName = process.env.S3_BUCKET_NAME

exports.handler = async (event) => {

    try {
        const uuidArray = Array.from({length : 10}, () => uuid.v4())
    
        const timestamp = new Date().toISOString();
        const fileName = `${timestamp}`;

        const s3Obj = { ids: uuidArray}
   
   
        const s3Parameters = {
           Bucket: bucketName,
           Key:fileName,
           Body: JSON.stringify(s3Obj),
           ContentType:'application/json'
        };

        const s3BResponse = await s3.putObject(s3Parameters).promise();

        return {
            statusCode:20,
            body:JSON.stringify({
                message: 'uuids successfully generated and uploaded to S3',
                fileName:fileName,
                s3BResponse:s3BResponse

            })
        };
        } catch (error) {
         console.log("Eror generating and uploading to S3:", error)
         return {
            statusCode:500,
            body:JSON.stringify({
                message: 'Failed to  generate and upload to S3:',
                error:error.message
            })
         }
        }
       

    }





