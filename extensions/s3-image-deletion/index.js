import AWS from 'aws-sdk';
import { on } from 'events';

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

export {
  deleteImageFromS3,
  handleImageDeletion
};