"use strict";
const AWS = require('aws-sdk');
const fs = require('fs');
let path = require('path');
const CurrentENV = process.env.APP_ENV || 'local';
const BucketName = 'tesco-apibucket-' + CurrentENV;
const FileName = 'slm-ftp-ui-secrets-' + CurrentENV + '.json';
const targetFilename = FileName;

let saveConfigPath = path.join(__dirname, "secrets");

console.log("PATH : ", saveConfigPath);

if (!fs.existsSync(saveConfigPath)) {
    try {
        fs.mkdirSync(saveConfigPath);
    } catch (error) {
        console.log("Error while creating secrets folder: ", error);
    }
}

const s3 = new AWS.S3();
const params = {
    Bucket: BucketName,
    Key: FileName,
};

const fetch = () => {
    console.log('Fetching secrets from S3 bucket... ');
    return s3.getObject(params).promise()
        .then((data) => {
            let writeStream = fs.createWriteStream(path.join(saveConfigPath, targetFilename));
            writeStream.on('open', function (err) {
                writeStream.write(data.Body);
                writeStream.end();
            });
            writeStream.on('close', function (err) {
                console.log("Successfully retrived Secrets data from S3 bucket");
            });
            writeStream.on('error', function (err) {
                console.log("Failed to write config from S3 bucket");
            });
        }).catch((err) => {
            console.log("Failed to load config from S3 bucket: ", err);
        });
};

fetch();