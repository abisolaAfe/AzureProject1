

import axios from 'axios';
import getAppToken2 from './getAppToken2';

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

