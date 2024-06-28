
import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { uploadWithToken } from './uploadWithToken'; // Assuming you have this function for uploading
import '../Styling/UploadFilePage.css';
import { useTasks } from '../jsFiles/TaskContext';

function UploadFilePage() {
    const { instance } = useMsal();
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [success, setSuccess] = useState(false);
    const { completeTask } = useTasks();

    useEffect(() => {
        document.title = 'Create Artifact';
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleUpload = async () => {
        if (!file || !description) {
            alert('Please select a file and enter a description.');
            return;
        }

        try {
            const accounts = instance.getAllAccounts();
            if (accounts.length === 0) {
                await instance.loginPopup({
                    scopes: ['user.read'] // Adjust scopes here
                });
            }

            const silentRequest = {
                scopes: ['user.read'], // Adjust scopes here
                account: accounts[0]
            };

            const response = await instance.acquireTokenSilent(silentRequest);
            const accessToken = response.accessToken;

            await uploadWithToken(file, accessToken, description);
            completeTask(2);

            setSuccess(true);

        } catch (error) {
            console.error('Error during upload:', error);
        }
    };

    return (
        <div className="upload-container">
            <h1>Create Post</h1>
            {!success && (
                <div className="file-description-wrapper">
                    <input type="file" onChange={handleFileChange} />
                    <textarea
                        placeholder="Enter file description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <button onClick={handleUpload}>create</button>
                </div>
            )}
            {success && <div className="success-message">Post created successfully!</div>}
        </div>
    );
}

export default UploadFilePage;




