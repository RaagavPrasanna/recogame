import { BlobServiceClient } from '@azure/storage-blob';
// Documentation
// eslint-disable-next-line no-unused-vars
import fileUpload from 'express-fileupload';

const BLOB_URL = (name) =>
  `https://${process.env.AZURE_ACCOUNT}.blob.core.windows.net/${process.env.AZURE_CONTAINER}/${name}`;
const BLOB_SAS = `https://${process.env.AZURE_ACCOUNT}.blob.core.windows.net/?${process.env.AZURE_SAS}`;


/**
 * Wrapper around Azure blob storage.
 *
 * @example
 * // Import necessary Azure modules
 * const azure = require('./path/to/azure.cjs');
 *
 * // Upload a file
 * await azure.uploadFile(file);
 */
class Azure {
  constructor() {
    this.containerClient =
      new BlobServiceClient(BLOB_SAS)
        .getContainerClient(process.env.AZURE_CONTAINER);
  }

  /**
   * Upload a blob file to Azure.
   * @param {fileUpload.UploadedFile} file File to upload.
    * @returns {string} URL to uploaded file.
   */
  async uploadFile(file) {
    const name = file.name;
    const blobClient = this.containerClient.getBlockBlobClient(name);
    await blobClient.uploadData(
      file.data,
      { blobHTTPHeaders: { blobContentType: file.mimetype } }
    );
    return BLOB_URL(name);
  }
}

// Because modules are cached, this line will run only once so it behaves like a singleton
const azure = new Azure();


export default azure;

