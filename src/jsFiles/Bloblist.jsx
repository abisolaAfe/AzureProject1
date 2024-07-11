
import React, { useEffect, useState } from 'react';
import { BlobServiceClient, AnonymousCredential, newPipeline } from '@azure/storage-blob';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../configFiles/msalConfig';
import '../Styling/BlobList.css';
import { useTasks } from '../jsFiles/TaskContext';

const containerName = 'mydemoappupload';
const storageAccountName = 'firststoragebezo';
const storageAccountKey = process.env.REACT_APP_SAS_TOKEN;

const updateBlobDescription = async (blobName, newDescription, accessToken) => {
    console.log(storageAccountKey)
    const url = `https://${storageAccountName}.blob.core.windows.net/?${storageAccountKey}`;
    const blobServiceClient = new BlobServiceClient(url, newPipeline(new AnonymousCredential(), {
        retryOptions: { maxTries: 4 },
        userAgentOptions: { userAgentPrefix: 'AdvancedSample V1.0.0' },
        keepAliveOptions: { keepAliveMsecs: 120 * 1000 }
    }));
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    try {
        const properties = await blobClient.getProperties();
        const metadata = { ...properties.metadata, description: newDescription };
        await blobClient.setMetadata(metadata);
        console.log('Blob description updated successfully!');
    } catch (error) {
        console.error('Error updating blob description:', error);
    }
};

const BlobList = () => {
    const { instance, accounts } = useMsal();
    const [blobs, setBlobs] = useState([]);
    const [accessToken, setAccessToken] = useState('');
    const [userRoles, setUserRoles] = useState([]);

    const fetchAccessToken = async () => {
        if (accounts.length > 0) {
            try {
                const silentRequest = {
                    ...loginRequest,
                    account: accounts[0]
                };
                const response = await instance.acquireTokenSilent(silentRequest);
                const roles = response.idTokenClaims.roles || [];
                setUserRoles(roles);
                setAccessToken(response.accessToken);
                fetchBlobs(response.accessToken);
            } catch (error) {
                console.error('Error acquiring token silently:', error);
                try {
                    const response = await instance.acquireTokenPopup(loginRequest);
                    setAccessToken(response.accessToken);
                    fetchBlobs(response.accessToken);
                } catch (popupError) {
                    console.error('Error acquiring token via popup:', popupError);
                }
            }
        }
    };

    const fetchBlobs = async (token) => {
        try {
            const pipeline = newPipeline(new AnonymousCredential(), {
                retryOptions: { maxTries: 4 },
                userAgentOptions: { userAgentPrefix: 'AdvancedSample V1.0.0' },
                keepAliveOptions: { keepAliveMsecs: 120 * 1000 }
            });
            const blobServiceClient = new BlobServiceClient(
                `https://${storageAccountName}.blob.core.windows.net`,
                pipeline
            );
            const containerClient = blobServiceClient.getContainerClient(containerName);

            let blobsArray = [];
            for await (const blob of containerClient.listBlobsFlat()) {
                const url = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}?${storageAccountKey}`;
                const properties = await containerClient.getBlobClient(blob.name).getProperties();
                blobsArray.push({ ...blob, url, description: properties.metadata.description });
            }
            setBlobs(blobsArray);
        } catch (error) {
            console.error('Error fetching blobs:', error);
        }
    };

    useEffect(() => {
        fetchAccessToken();
    }, [accounts]);
    const { completeTask } = useTasks();
    const handleUpdateDescription = async (blobName, newDescription) => {
       
        try {
            await updateBlobDescription(blobName, newDescription, accessToken);
            setBlobs(blobs.map(blob => blob.name === blobName ? { ...blob, description: newDescription } : blob));
            completeTask(4);
        } catch (error) {
            console.error('Error updating blob description:', error);
        }
    };

    return (
        <div className="blob-list-container">
            <h2>Browse Catalogue</h2>
            <div className="blob-grid">
                {blobs.map((blob) => (
                    <div key={blob.name} className="blob-item">
                        {blob.name.match(/\.(jpeg|jpg|gif|png)$/) ? (
                            <img src={blob.url} alt={blob.name} className="blob-image" />
                        ) : (
                            <a href={blob.url} target="_blank" rel="noopener noreferrer">{blob.name}</a>
                        )}
                        <p className="blob-description">{blob.description}</p>
                        <div className="blob-buttons">
                            <button onClick={() => window.open(blob.url)}>Download</button>
                            {userRoles.includes('user.write') && (
                                <>
                                    <button onClick={() => handleUpdateDescription(blob.name, prompt('Enter new description:'))}>Update Description</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlobList;





