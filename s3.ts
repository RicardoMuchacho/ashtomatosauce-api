var AWS = require("aws-sdk");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const bucket_name = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const access_key = process.env.AWS_ACCESS_KEY;
const secret_key = process.env.AWS_SECRET_KEY;

AWS.config.update({ region: region });

var s3 = new AWS.S3({
  accessKeyId: access_key,
  secretAccessKey: secret_key,
});

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucket_name,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucket_name,
  };

  return s3.getObject(downloadParams).createReadStream();
}

export = { uploadFile, getFileStream };
