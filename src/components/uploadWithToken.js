


// upload to azure blob container using blobserviceclient
import { BlobServiceClient } from '@azure/storage-blob';


export const uploadWithToken = async (file, accessToken, description) => {

    const storageAccountKey = process.env.REACT_APP_SAS_TOKEN;
        const containerName = 'mydemoappupload';
        const blobName = file.name;
        const url = `https://firststoragebezo.blob.core.windows.net/${containerName}/${blobName}?${storageAccountKey}`;
        const blobServiceClient = new BlobServiceClient(url, accessToken);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        try {
            await blockBlobClient.uploadBrowserData(file);

           
            await blockBlobClient.setMetadata({ description });

            console.log('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
}






