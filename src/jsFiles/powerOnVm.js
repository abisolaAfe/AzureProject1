/*import React, { useState } from 'react';
import { pca, azureManagementRequest } from '../configFiles/msalConfig'; // Adjust the import path as necessary

const PowerOnVM = () => {
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const powerOnVM = async () => {
        setIsLoading(true);
        setStatus(''); // Reset status message

        try {
            const account = pca.getAllAccounts()[0];
            if (!account) {
                throw new Error('User not logged in');
            }

            const tokenResponse = await pca.acquireTokenSilent({
                scopes: azureManagementRequest.scopes,
                account: account
            });

            const subscriptionId = '8a6336b9-e533-4dbc-b94f-95a719ce31fd';
            const resourceGroupName = 'AppDeployment';
            const vmName = 'beezola';

            const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}/start?api-version=2024-03-01`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 202) {
                setStatus('VM start request accepted.');
            } else {
                const errorData = await response.json();
                setStatus(`Failed to start VM: ${errorData.error.message}`);
            }
        } catch (error) {
            console.error('Error:', error); // Debugging: log the error

            if (error.response) {
                setStatus(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                setStatus('Error: No response from server. Check if the backend is running.');
            } else {
                setStatus(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={powerOnVM} disabled={isLoading}>
                {isLoading ? 'Powering On...' : 'Power On VM'}
            </button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default PowerOnVM;*/


import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const PowerOnVM = () => {
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getAppToken = async () => {
        try {
            const response = await axios.get('http://localhost:7071/api/GetTokenFunction');
            if (response.status === 200) {
                return response.data.accessToken;
            } else {
                throw new Error('Failed to get app token');
            }
        } catch (error) {
            console.error('Error getting app token:', error);
            throw error;
        }
    };

    const powerOnVM = async () => {
        setIsLoading(true);
        setStatus(''); // Reset status message

        try {
            const appToken = await getAppToken(); // Get the app token from the backend

            const subscriptionId = process.env.SUBSCRIPTION_ID;
            const resourceGroupName = 'AppDeployment';
            const vmName = 'beezola';

            const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}/start?api-version=2024-03-01`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${appToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 202) {
                setStatus('VM start request accepted.');
            } else {
                const errorData = await response.json();
                setStatus(`Failed to start VM: ${errorData.error.message}`);
            }
        } catch (error) {
            console.error('Error:', error); // Debugging: log the error

            if (error.response) {
                setStatus(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                setStatus('Error: No response from server. Check if the backend is running.');
            } else {
                setStatus(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={powerOnVM} disabled={isLoading}>
                {isLoading ? 'Powering On...' : 'Power On VM'}
            </button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default PowerOnVM;









