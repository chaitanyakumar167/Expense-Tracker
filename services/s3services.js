const AWS = require("aws-sdk");

const uploadToS3 = (data, filename) => {
  const BUCKET_NAME = "expensetrackerapp2";
  const IAM_USER_KEY = "AKIARDEE7ORPNKO33H57";
  const IAM_USER_SECRET = "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";

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  let params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };
  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        reject(err);
      } else {
        resolve(s3response.Location);
      }
    });
  });
};

module.exports = { uploadToS3 };
