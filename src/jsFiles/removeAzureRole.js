/*import axios from 'axios';
import { azureManagementRequest } from '../configFiles/msalConfig';

const getAccessToken = async (instance) => {
    const account = instance.getActiveAccount();
    if (!account) {
        await instance.loginPopup(azureManagementRequest);
    }
    const response = await instance.acquireTokenSilent({
        ...azureManagementRequest,
        account: account || instance.getActiveAccount(),
    });
    return response.accessToken;
};

export const removeAzureRole = async (instance, assignmentId) => {
    const accessToken = await getAccessToken(instance);

    const subscriptionId = '8a6336b9-e533-4dbc-b94f-95a719ce31fd';
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Authorization/roleAssignments/${assignmentId}?api-version=2020-04-01-preview`;

    try {
        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Role removed successfully:', response.data);
        return { success: true, message: 'Role removed successfully' };
    } catch (error) {
        console.error('Error removing role:', error.response ? error.response.data : error.message);
        return { success: false, message: 'Error removing role' };
    }
};*/

import axios from 'axios';
import getAppToken2 from './getAppToken2';

// Function to get the application access token from your backend
/*const getAppToken = async () => {
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
};*/

export const removeAzureRole = async (instance, assignmentId) => {
    const accessToken = await getAppToken2();

    const subscriptionId = process.env.REACT_APP_SUBSCRIPTION_ID;
    const resourceGroupName = 'AppDeployment';
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Authorization/roleAssignments/${assignmentId}?api-version=2020-04-01-preview`;

    try {
        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Role removed successfully:', response.data);
        return { success: true, message: 'Role removed successfully' };
    } catch (error) {
        console.error('Error removing role:', error.response ? error.response.data : error.message);
        return { success: false, message: 'Error removing role' };
    }
};



