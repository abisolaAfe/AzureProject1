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

export const getRoleAssignmentId = async (instance, userId, azureRoleId) => {
    const accessToken = await getAccessToken(instance);

    const subscriptionId = '8a6336b9-e533-4dbc-b94f-95a719ce31fd';
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Authorization/roleAssignments?api-version=2020-04-01-preview&$filter=assignedTo('${userId}')`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        const roleAssignments = response.data.value;
        const roleAssignment = roleAssignments.find(
            (assignment) => assignment.properties.roleDefinitionId.endsWith(azureRoleId)
        );

        if (roleAssignment) {
            return roleAssignment.id.split('/').pop(); // Extract the assignment ID from the full ID
        } else {
            console.error('Role assignment not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching role assignments:', error.response ? error.response.data : error.message);
        return null;
    }
};
*/

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

export const getRoleAssignmentId = async (instance, userId, azureRoleId) => {
    const accessToken = await getAppToken2(); // Use the application token

    const subscriptionId = process.env.REACT_APP_SUBSCRIPTION_ID;
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Authorization/roleAssignments?api-version=2020-04-01-preview&$filter=assignedTo('${userId}')`;

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        const roleAssignments = response.data.value;
        const roleAssignment = roleAssignments.find(
            (assignment) => assignment.properties.roleDefinitionId.endsWith(azureRoleId)
        );

        if (roleAssignment) {
            return roleAssignment.id.split('/').pop(); // Extract the assignment ID from the full ID
        } else {
            console.error('Role assignment not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching role assignments:', error.response ? error.response.data : error.message);
        return null;
    }
};

