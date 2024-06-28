/*import React, { useState, useEffect } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { msalConfig, loginRequest } from 'C:/Users/User/react Application/blob-app/src/configFiles/msalConfig.js';

const storageAccountName = 'firststoragebezo';
const containerName = 'mydemoappupload';
const sasToken = 'sp=r&st=2024-05-07T04:45:41Z&se=2024-05-07T12:45:41Z&sv=2022-11-02&sr=c&sig=WS2HDimWCOoBp23%2FbmvlXcRWkbh0cGERMADbEeaVLtE%3D'; // Shared Access Signature token

const blobServiceClient = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net${sasToken}`
);

function FileApp() {
    const { instance } = useMsal();
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blobClient = containerClient.getBlockBlobClient(file.name);

        try {
            await blobClient.uploadBrowserData(file);
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file.');
        }
    };

    useEffect(() => {
        instance.loginPopup(loginRequest).catch((error) => {
            console.error('Login failed:', error);
        });
    }, [instance]);

    return (
        <div>
            <h1>Upload File to Azure Blob Storage</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}



export default FileApp;*/


