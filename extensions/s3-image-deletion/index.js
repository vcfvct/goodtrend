const AWS = require('aws-sdk');
const { on } = require('events');

const s3 = new AWS.S3();

async function deleteImageFromS3(imageKey) {
  const params = {
    Bucket: 'goodtrendpromote',
    Key: imageKey
  };
  return s3.deleteObject(params).promise();
}

async function handleImageDeletion(event) {
  const { images } = event.data;
  const deletionPromises = images.map(image => deleteImageFromS3(image));
  await Promise.all(deletionPromises);
}

// Listen to the product image deletion event
on('productImage.delete', handleImageDeletion);

module.exports = {
  deleteImageFromS3,
  handleImageDeletion
};