

import axios from 'axios';
import getAppToken2 from './getAppToken2';

export const removeAzureRole = async (instance, assignmentId) => {
    const accessToken = await getAppToken2();

    const subscriptionId = process.env.REACT_APP_SUBSCRIPTION_ID;
    const resourceGroupName = 'AppDeployment';
    const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Authorization/roleAssignments/${assignmentId}?api-version=2020-04-01-preview`;
    //const url = `https://management.azure.com/subscriptions/${subscriptionId}/providers/Microsoft.Authorization/roleAssignments/${assignmentId}?api-version=2020-04-01-preview`;


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



