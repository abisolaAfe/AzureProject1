import React from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../jsFiles/TaskContext';
import { removeUserRole } from '../jsFiles/deleteRoles'; // Adjust the import path as necessary
import { removeAzureRole } from '../jsFiles/removeAzureRole'; // Adjust the import path as necessary
import '../Styling/LogoutModal.css'
import { getRoleAssignmentId } from '../jsFiles/getAzureRoleAssignmentById'; // Adjust the import path as necessary

const LogoutModal = ({ show, handleClose }) => {
    const { instance } = useMsal();
    const navigate = useNavigate();
    const { resetTasks } = useTasks();

    const handleLogout = async () => {
        try {
            const accounts = instance.getAllAccounts();
            if (accounts.length > 0) {
                const userId = accounts[0].idTokenClaims.oid;
                const appRoleId = '2bc1a9d7-26e5-41d3-82a4-608ba5801d60';
                const resourceReader = 'acdd72a7-3385-48ef-bd42-f606fba81ae7';
                const vaultSecretsUser = '4633458b-17de-408a-b874-0445c86b69e6'; // Virtual Machine Contributor role ID

                console.log(`Attempting to remove roles for user ${userId}`);

                // Remove App Role
                const appRoleResult = await removeUserRole(userId, appRoleId);
                console.log(appRoleResult.message);

                // Remove Azure Role
                const assignmentId1 = await getRoleAssignmentId(instance, userId, resourceReader);
                const assignmentId2 = await getRoleAssignmentId(instance, userId, vaultSecretsUser);
                if (assignmentId1 && assignmentId2) {
                    const azureRoleResult1 = await removeAzureRole(instance, assignmentId1);
                    const azureRoleResult2 = await removeAzureRole(instance, assignmentId2);
                    console.log(azureRoleResult1.message);
                    console.log(azureRoleResult2.message);
                } else {
                    console.log('Azure role assignment not found.');
                }

                resetTasks();
            } else {
                console.log('No accounts found for role removal.');
            }
        } catch (error) {
            console.error('Error during role removal', error);
        } finally {
            try {
                await instance.logoutRedirect();
                navigate('/');
            } catch (logoutError) {
                console.error('Logout failed', logoutError);
            }
            handleClose();
        }
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`} onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Confirm Logout</h4>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to log out?</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;





