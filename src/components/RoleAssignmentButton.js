

/*import React, { useState } from 'react';
import assignUserRole from '../jsFiles/assignRole';
import { useMsal } from '@azure/msal-react';
import '../Styling/AssignRoleButton.css';
import { useTasks } from '../jsFiles/TaskContext';
import { azureManagementRequest } from '../configFiles/msalConfig';

const RoleAssignmentButton = () => {
    const { instance } = useMsal();
    const [feedback, setFeedback] = useState('');
    const { completeTask } = useTasks();

    const handleAssignRole = async () => {
        setFeedback('Assigning roles...');

        const accounts = instance.getAllAccounts();
        if (accounts.length === 0) {
            await instance.loginPopup({
                scopes: ['User.Read', ...azureManagementRequest.scopes],
            });
        }

        const userId = accounts[0].localAccountId; // Adjust according to your setup
        console.log('USERID2', userId);
        const roleDefinitionId = '2bc1a9d7-26e5-41d3-82a4-608ba5801d60'; // Replace with actual role definition ID

        const result = await assignUserRole(userId, roleDefinitionId);
        completeTask(3);
        setFeedback(result.message);
    };

    return (
        <div>
            <button onClick={handleAssignRole}>Upgrade Access</button>
            {feedback && <p>{feedback}</p>}
        </div>
    );
};

export default RoleAssignmentButton;
*/

import React, { useState } from 'react';
import assignUserRole from '../jsFiles/assignRole';
import { useMsal } from '@azure/msal-react';
import '../Styling/AssignRoleButton.css';
import { useTasks } from '../jsFiles/TaskContext';
import { azureManagementRequest } from '../configFiles/msalConfig';

const RoleAssignmentButton = () => {
    const { instance } = useMsal();
    const [feedback, setFeedback] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const { completeTask } = useTasks();

    const handleAssignRole = async () => {
        setFeedback('Assigning roles...');
        setShowPopup(true);

        const accounts = instance.getAllAccounts();
        if (accounts.length === 0) {
            await instance.loginPopup({
                scopes: ['User.Read', ...azureManagementRequest.scopes],
            });
        }

        const userId = accounts[0].localAccountId; // Adjust according to your setup
        console.log('USERID2', userId);
        const roleDefinitionId = '2bc1a9d7-26e5-41d3-82a4-608ba5801d60'; // Replace with actual role definition ID

        const result = await assignUserRole(userId, roleDefinitionId);
        completeTask(3);
        setFeedback(result.message);

        if (result.success) {
            setFeedback('Requested roles were added successfully, click on post in the header to edit any of the posts.');
        } else {
            setFeedback(result.message);
        }

        // Hide the popup after 5 seconds
        setTimeout(() => {
            setShowPopup(false);
        }, 8000);
    };

    return (
        <div>
            <button onClick={handleAssignRole}>Upgrade Access</button>
            {showPopup && <div className="popup">{feedback}</div>}
        </div>
    );
};

export default RoleAssignmentButton;


